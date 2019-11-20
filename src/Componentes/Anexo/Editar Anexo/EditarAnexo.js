import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import consumeWS from '../../Config/WebService';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import { red, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import SpeedDial from '@material-ui/lab/SpeedDial';
import MenuIcon from '@material-ui/icons/Menu';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CancelIcon from '@material-ui/icons/Cancel';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Redirect } from 'react-router-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const variantIcon = {
	error: ErrorIcon,
	success: CheckCircleIcon
}

const useStyles = makeStyles(theme => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(12),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 800,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end'
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1)
	},
	campo: {
		marginTop: theme.spacing(2)
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	estiloModal: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3)
	},
	error: {
		backgroundColor: red[600],
	},
	success: {
		backgroundColor: green[600],
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	icon: {
		fontSize: 20,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
	back: {
		transform: 'translateZ(0px)',
		position: 'fixed',
		zIndex: 100
	},
	speedDial: {
		position: 'fixed',
		bottom: theme.spacing(8),
		right: theme.spacing(2),
	}
}));

const actions = [
	{ name: 'Actualizar' },
	{ name: 'Cancelar' },
	{ name: 'Nuevo' }
];

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: '#4a48b2',
		color: theme.palette.common.white,
		cursor: 'pointer'
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

function MySnackbarContentWrapper(props) {
	const classes = useStyles();
	const { className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={clsx(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

export default function EditarAnexo(props) {
	const classes = useStyles();
	const [anexo, setAnexo] = React.useState({})
	const [tdocumento, setTdocumento] = React.useState([])
	const [pais, setPais] = React.useState([])
	const [examine, setExamine] = React.useState([])
	const [abrir, setAbrir] = React.useState(false)
	const [categoria, setCategoria] = React.useState({})
	const [listaAnexoMaestro, setListaAnexoMaestro] = React.useState([])
	const [mensaje, setMensaje] = React.useState([])
	const [openMensaje, setOpenMensaje] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [cancel, setCancel] = React.useState(false)
	const [nuevo, setNuevo] = React.useState(false)

	const recibirAnexo = () => {
		let hash = window.location.hash;
		let qString = hash.split('?')[1];
		let qStringArray = qString.split('&');
		let qStringObject = {};
		for (let i = 0; i < qStringArray.length; i++) {
			let ok = qStringArray[i].split('=');
			qStringObject[ok[0]] = ok[1]
		}
		return qStringObject;
	}

	var id = recibirAnexo().id_anexo

	const onChange = (e) => {
		setAnexo({
			...anexo,
			[e.target.name]: e.target.value
		})
	}

	const consultarApi = () => {
		consumeWS('GET', 'api/anexo/obtener', '', `?id_anexo=${id}`)
			.then(result => {
				setAnexo(result)
			});
	}

	const consultarDocumento = () => {
		consumeWS('GET', 'api/tipodocumentoidentidad/listar', '', '')
			.then(result => {
				setTdocumento(result)
			});
	}

	const consultarPais = () => {
		consumeWS('GET', 'api/pais/listar', '', '')
			.then(result => {
				setPais(result)
			});
	}

	const handleChange = e => {
		setAnexo({
			...anexo,
			[e.target.name]: e.target.checked
		})
	}

	const consultarExamine = () => {
		let id = recibirAnexo().id_anexo
		consumeWS('GET', 'api/anexomaestro/examinar', '', `?id_anexo=${id}`)
			.then(result => {
				setExamine(result)
			});
	}

	const abrirModal = () => {
		setAbrir(true)
		setCategoria({
			id_tanexo: 1,
			id_anexo: anexo.id_anexo
		})
	}

	const handleClose = () => {
		setAbrir(false)
	}

	const onChangeCategoria = (e) => {
		setCategoria({
			...categoria,
			[e.target.name]: e.target.value
		})
	}

	const consultarListaAnexoMaestro = () => {
		consumeWS('GET', 'api/anexotipo/listar', '', '')
			.then(result => {
				setListaAnexoMaestro(result)
			})
	}

	const guardarCategoria = () => {
		consumeWS('POST', 'api/anexomaestro/insertar', categoria, '')
			.then(result => {
				setMensaje(result)
				setAbrir(false)
				if (mensaje.error === "") {
					setOpenMensaje(true)
				} else {
					setOpenMensaje(true)
				}
				consultarExamine()
			});
	}

	const eliminar = (id_tanexo) => {
		let id = recibirAnexo().id_anexo
		consumeWS('POST', 'api/anexomaestro/eliminar', '', `?id_anexo=${id}&id_tanexo=${id_tanexo}`)
			.then(result => {
				setMensaje(result)
				if (mensaje.error === "") {
					setOpenMensaje(true)
				} else {
					setOpenMensaje(true)
				}
				consultarExamine()
			});
	}

	const guardar = () => {
		consumeWS('POST', 'api/anexo/modificar', anexo, '')
			.then(result => {
				setMensaje(result)
				if (mensaje.error === '') {
					setOpenMensaje(true)
				} else {
					setOpenMensaje(true)
					let mensajes = Object.keys(mensaje)
					if (mensajes.length > 0) {
						for (let i = 0; i < mensajes.length; i++) {
							console.log(mensaje[mensajes[i]][0])
						}
					}
				}
			})
	}

	const handleCloseMensaje = (event, reason) => {
		if (reason === 'timeout') {
			setOpenMensaje(false)
		}
		if (reason === 'clickaway') {
			setOpenMensaje(false)
		}
		if (typeof reason === 'undefined') {
			setOpenMensaje(false)
		}

	}

	const handleOpen = () => {
		setOpen(true);
	};

	const handleCloseButton = () => {
		setOpen(false);
	};

	const irAtras = () => {
		setCancel(true)
	}

	const irNuevo = () => {
		setNuevo(true)
	}

	React.useEffect(consultarApi, [])
	React.useEffect(consultarDocumento, [])
	React.useEffect(consultarPais, [])
	React.useEffect(consultarExamine, [])
	React.useEffect(consultarListaAnexoMaestro, [])

	if (nuevo === true) {
		return (<Redirect to={`/smnuAnexo/nuevo`} />)
	}

	if (cancel === true) {
		return (<Redirect to='/smnuAnexo' />)
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Backdrop open={open} className={classes.back} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				className={classes.speedDial}
				icon={<MenuIcon />}
				onClose={handleCloseButton}
				onOpen={handleOpen}
				open={open}>

				{actions.map(action => (
					<SpeedDialAction
						key={action.name}
						icon={action.name === 'Actualizar' ? <SaveIcon /> : action.name === 'Cancelar' ? <CancelIcon /> : action.name === 'Nuevo' ? <AddCircleIcon /> : ''}
						tooltipTitle={action.name}
						onClick={action.name === 'Actualizar' ? () => guardar() : action.name === 'Cancelar' ? () => irAtras() : action.name === 'Nuevo' ? () => irNuevo() : ''}
					/>
				))}
			</SpeedDial>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Snackbar
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'left',
						}}
						open={openMensaje}
						autoHideDuration={6000}
						onClose={handleCloseMensaje}
					>
						<MySnackbarContentWrapper
							onClose={handleCloseMensaje}
							variant={mensaje.error === '' ? 'success' : 'error'}
							message={mensaje.error === '' ? 'Operación se realizó correctamente' : mensaje.error}
						/>
					</Snackbar>
					<Typography component="h1" variant="h4" align="center">
						Editar Anexo
          			</Typography>
					<React.Fragment>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="id_anexo"
									name="id_anexo"
									fullWidth
									autoComplete="codigo"
									disabled
									onChange={onChange.bind()}
									value={anexo.id_anexo}
									helperText="Código"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="codold"
									name="codold"
									fullWidth
									autoComplete="codold"
									value={anexo.codold}
									disabled
									onChange={onChange.bind()}
									helperText='Código antiguo'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="id_tdocumento"
									fullWidth
									select
									value={anexo.id_tdocumento}
									onChange={onChange.bind()}
									name='id_tdocumento'
									helperText="Seleccione el tipo de documento"
									margin="normal">
									{tdocumento.map(documento => (
										<MenuItem key={documento.id_tdocumento} value={documento.id_tdocumento}>
											{documento.alias}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="ruc"
									name="ruc"
									fullWidth
									autoComplete="ruc"
									value={anexo.ruc}
									onChange={onChange.bind()}
									className={classes.campo}
									helperText='Número de documento'
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id="nm_anexo"
									name="nm_anexo"
									fullWidth
									autoComplete='nm_anexo'
									onChange={onChange.bind()}
									helperText="Nombre o razón comercial"
									value={anexo.nm_anexo}
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id="nm_alias"
									name="nm_alias"
									fullWidth
									autoComplete='nm_anlias'
									onChange={onChange.bind()}
									helperText="Nombre comercial o alias"
									value={anexo.nm_alias}
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									id="direccion"
									name="direccion"
									fullWidth
									autoComplete="billing address-line2"
									onChange={onChange.bind()}
									value={anexo.direccion}
									helperText="Dirección"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="id_pais"
									fullWidth
									select
									value={anexo.id_pais}
									onChange={onChange.bind()}
									name='id_pais'
									helperText="Seleccione el país"
									margin="normal">
									{pais.map(paises => (
										<MenuItem key={paises.id_pais} value={paises.id_pais}>
											{paises.nm_pais}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="departamento"
									name="departamento"
									fullWidth
									autoComplete="billing address-level2"
									helperText='Departamento'
									value={anexo.departamento}
									onChange={onChange.bind()}
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="provincia"
									name="provincia"
									fullWidth
									autoComplete="billing address-level2"
									onChange={onChange.bind()}
									value={anexo.provincia}
									helperText='Provincia'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="ciudad"
									name="ciudad"
									fullWidth
									onChange={onChange.bind()}
									value={anexo.ciudad}
									helperText='Ciudad'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="distrito"
									name="distrito"
									fullWidth
									autoComplete="billing address-level2"
									onChange={onChange.bind()}
									value={anexo.distrito}
									helperText='Distrito'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="fax"
									name="fax"
									fullWidth
									onChange={onChange.bind()}
									value={anexo.fax}
									helperText='Fax'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="telef_1"
									name="telef_1"
									fullWidth
									onChange={onChange.bind()}
									value={anexo.telef_1}
									helperText='Teléfono 1'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="telef_2"
									name="telef_2"
									fullWidth
									onChange={onChange.bind()}
									value={anexo.telef_2}
									helperText='Teléfono 2'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="telef_3"
									name="telef_3"
									fullWidth
									onChange={onChange.bind()}
									value={anexo.telef_3}
									helperText='Teléfono 3'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControlLabel
									control={
										<Checkbox
											checked={anexo.nodomiciliado === true ? true : false}
											name='nodomiciliado'
											onChange={handleChange.bind()}
											value="nodomiciliado" />
									}
									label='No domiciliado'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									multiline
									rows={4}
									id="notas"
									name="notas"
									fullWidth
									onChange={onChange.bind()}
									value={anexo.notas}
									helperText='Notas'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									id="estado"
									fullWidth
									select
									value={anexo.estado}
									onChange={onChange.bind()}
									name='estado'
									helperText="Seleccione el tipo de estado"
									className={classes.campo}>
									<MenuItem key={0} value={1}>Activo</MenuItem>
									<MenuItem key={1} value={0}>Inactivo</MenuItem>
								</TextField>
							</Grid>
							<Grid item xs={12} sm={10}>
								<Typography>
									Categoría Anexo
          						</Typography>
							</Grid>
							<Modal
								aria-labelledby='transition-modal-title'
								aria-describedby="transition-modal-description"
								className={classes.modal}
								open={abrir}
								onClose={handleClose}
								closeAfterTransition
								BackdropComponent={Backdrop}
								BackdropProps={{ timeout: 500 }}>
								<Fade in={abrir}>
									<div className={classes.estiloModal}>
										<Typography variant="h6">
											Maestro asociado
										</Typography>
										<Grid item xs={12}>
											<TextField
												required
												id="id_tanexo"
												fullWidth
												select
												value={categoria.id_tanexo}
												onChange={onChangeCategoria.bind()}
												name='id_tanexo'
												helperText="Seleccione el tipo de anexo"
												margin="normal">
												{listaAnexoMaestro.map(maestro => (
													<MenuItem key={maestro.id_tanexo} value={maestro.id_tanexo}>
														{maestro.nombre}
													</MenuItem>
												))}
											</TextField>
										</Grid>
										<div className={classes.buttons}>
											<Button
												variant="contained"
												color="primary"
												onClick={() => guardarCategoria()}
												className={classes.button}>
												Guardar
										</Button>
											<Button
												variant="contained"
												onClick={() => setAbrir(false)}
												color="secondary"
												className={classes.button}>
												Cancelar
										</Button>
										</div>
									</div>
								</Fade>
							</Modal>
							<Grid item xs={12} sm={2}>
								<Fab size="small" color="primary" aria-label="add" onClick={() => abrirModal()}>
									<AddIcon />
								</Fab>
							</Grid>
							<Grid item xs={12}>
								<Table stickyHeader size="small">
									<TableHead>
										<TableRow>
											<StyledTableCell key={0}>Código</StyledTableCell>
											<StyledTableCell key={1}>Nombre</StyledTableCell>
											<StyledTableCell key={2} align='center'>Eliminar</StyledTableCell>
										</TableRow>
									</TableHead>
									<TableBody>
										{examine.map(exam => (
											<TableRow hover key={exam.id_tanexo}>
												<TableCell>{exam.id_tanexo}</TableCell>
												<TableCell>{exam.nombre}</TableCell>
												<TableCell align='center'>
													<IconButton onClick={() => eliminar(exam.id_tanexo)}>
														<DeleteForeverIcon />
													</IconButton>
												</TableCell>
											</TableRow>
										))}
									</TableBody>
								</Table>
							</Grid>
						</Grid>
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}