import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import consumeWS from '../../Config/WebService';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CancelIcon from '@material-ui/icons/Cancel';
import { Redirect } from 'react-router-dom'

const variantIcon = {
	success: ErrorIcon
}

const useStyles = makeStyles(theme => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(12),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
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
	success: {
		backgroundColor: red[600],
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
	{ name: 'Guardar' },
	{ name: 'Cancelar' }
];

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

export default function NuevoAnexo() {
	const classes = useStyles();
	const [anexo, setAnexo] = React.useState({
		estado: 1,
		id_empresa: 1,
		id_tdocumento: "00",
		id_pais: "24",
		id_anexo: 0
	})
	const [tdocumento, setTdocumento] = React.useState([])
	const [pais, setPais] = React.useState([])
	const [mensaje, setMensaje] = React.useState([])
	const [openMensaje, setOpenMensaje] = React.useState(false);
	const [open, setOpen] = React.useState(false);
	const [cancel, setCancel] = React.useState(false)

	React.useEffect(() => {
		consultarDocumento()
		consultarPais()
	}, []);

	const onChange = (e) => {
		setAnexo({
			...anexo,
			[e.target.name]: e.target.value
		})
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

	const guardar = () => {
		consumeWS('POST', 'api/anexo/insertar', anexo, '')
		.then(result => {
				setMensaje(result)
				if(mensaje.hasOwnProperty('error')){
				if(mensaje.salida > 0){
				alert('creado con ID ' +mensaje.salida)
				setAnexo({
					...anexo,
					id_anexo: mensaje.salida
				})
				
			}else{
				
			}
			}else{
				let mensajes = Object.keys(mensaje)
				if(mensajes.length>0){
					for (let i = 0; i < mensajes.length; i++) {
						// alert(mensaje[mensajes[i]][0])
					}
				}
			}
			})
	}

	const handleCloseMensaje = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenMensaje(false);
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
				icon={<SpeedDialIcon />}
				onClose={handleCloseButton}
				onOpen={handleOpen}
				open={open}>

				{actions.map(action => (
					<SpeedDialAction
						key={action.name}
						icon={action.name === 'Guardar' ? <SaveIcon /> : action.name === 'Cancelar' ? <CancelIcon /> :''}
						tooltipTitle={action.name}
						onClick={action.name === 'Guardar' ? () => guardar() : action.name === 'Cancelar' ? () => irAtras() :''}
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
							variant="success"
							message={mensaje.error}
						/>
					</Snackbar>
					<Typography component="h1" variant="h4" align="center">
						Crear Anexo
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
									className={classes.campo}
									margin='normal'>
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
									label='Ruc'
									onChange={onChange.bind()}
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
									label="Nombre o razón comercial"
									helperText='Ingrese el nombre del anexo'
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
									label="Nombre comercial o alias"
									helperText='Ingrese alias del anexo'
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
									label='Dirección'
									helperText="Ingrese la dirección"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="id_tdocumento"
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
									helperText='Ingrese el departamento'
									label='Departamento'
									onChange={onChange.bind()}
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
									helperText='Ingrese la provincia'
									label='Provincia'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									id="ciudad"
									name="ciudad"
									fullWidth
									autoComplete="billing address-level2"
									onChage={onChange.bind()}
									helperText='Ingrese la ciudad'
									label='Ciudad'
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
									helperText='Ingrese el distrito'
									label='Distrito'
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
									helperText='Ingrese número de fax'
									label='Fax'
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
									helperText='Ingrese teléfono 1'
									label='Teléfono 1'
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
									helperText='Ingrese teléfono 2'
									label='Teléfono 2'
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
									helperText='Ingrese teléfono 3'
									label='Teléfono 3'
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<FormControlLabel
									control={
										<Checkbox
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
									helperText='Ingrese una nota'
									label='Notas'
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
						</Grid>
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}