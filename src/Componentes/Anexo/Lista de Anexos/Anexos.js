import React from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import consumeWS from '../../Config/WebService';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom'

const variantIcon = {
	success: ErrorIcon
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(10),
	},
	paper: {
		zIndex: 1,
		position: 'relative',
		margin: theme.spacing(10)
	},
	tableWrapper: {
		height: '100%',
		overflow: 'auto'
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	estiloModal: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
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
	}
}));

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

const columns = [
	{ id: 'id_anexo', label: 'ID', minWidth: 170 },
	{ id: 'nm_anexo', label: 'Nombre', minWidth: 100 },
	{
		id: 'nm_alias',
		label: 'Alias',
		minWidth: 170,
		align: 'right',
		format: value => value.toLocaleString(),
	},
	{
		id: 'tdocumento',
		label: 'Tipo de Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toLocaleString(),
	},
	{
		id: 'ruc',
		label: 'N° Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'nomestado',
		label: 'Estado',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
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


export default function Anexos() {
	const classes = useStyles();
	const page = 0
	const rowsPerPage = 50
	const [rows, setRows] = React.useState([])
	const [openNombre, setOpenNombre] = React.useState(false)
	const [openId, setOpenId] = React.useState(false)
	const [openAlias, setOpenAlias] = React.useState(false)
	const [opentdocumento, setOpentdocumento] = React.useState(false)
	const [openNDocumento, setOpenNDocumento] = React.useState(false)
	const [total, setTotal] = React.useState(0)
	const [filtro, setFiltro] = React.useState({
		page: 1,
		rows: 50,
		id_empresa: 1,
		id_anexo: 0,
		nm_anexo: "",
		nm_alias: "",
		tdocumento: "",
		ruc: "",
		nomestado: "",
		sortcolumn: "",
		sortorder: "desc"
	})
	const [openMensaje, setOpenMensaje] = React.useState(false);
	const [mensaje, setMensaje] = React.useState([])

	React.useEffect(() => {
		consultaAnexo()
		conteo()
	}, []);

	const consultaAnexo = async () => {
		consumeWS('POST', 'api/anexo/examinar', filtro, '')
			.then(result => {
				setRows(result)
			});
	}

	const conteo = async () => {
		consumeWS('POST', 'api/anexo/examinarcontador', filtro, '')
			.then(result => {
				setTotal(result)
			});
	}

	const handleChangeRowsPerPage = event => {
		filtro.rows = event.target.value
		consultaAnexo()
	};

	const handleChangePage = (event, newPage) => {
		filtro.page = newPage + 1
		consultaAnexo()
	}

	const handleNombre = () => {
		setOpenNombre(true)
	}

	const handleCloseNombre = () => {
		setOpenNombre(false)
	}

	const onChange = (e) => {
		setFiltro({
			...filtro,
			[e.target.name]: e.target.value
		})
	}

	const Enter = (e) => {
		if (e.keyCode === 13) {
			consultaAnexo()
			conteo()
			setOpenNombre(false)
			setOpenId(false)
			setOpenAlias(false)
			setOpenNDocumento(false)
			setOpentdocumento(false)
		}
	}

	const handleId = () => {
		setOpenId(true)
	}

	const handleCloseId = () => {
		setOpenId(false)
	}

	const handleAlias = () => {
		setOpenAlias(true)
	}

	const handleCloseAlias = () => {
		setOpenAlias(false)
	}

	const handleNDocumento = () => {
		setOpenNDocumento(true)
	}

	const handleCloseNDocumento = () => {
		setOpenNDocumento(false)
	}

	const handletdocumento = () => {
		setOpentdocumento(true)
	}

	const handleClosetdocumento = () => {
		setOpentdocumento(false)
	}

	const eliminarAnexo = (id_anexo) => {
		consumeWS('POST', 'api/anexo/eliminar', '', `?id_anexo=${id_anexo}`)
			.then(result => {
				setMensaje(result);
				if (mensaje.hasOwnProperty('message')) {
					setOpenMensaje(true)
				} else {
					if (mensaje.error === "") {
						setOpenMensaje(false)
					} else {
						setOpenMensaje(true)
					}
				}
				conteo()
				consultaAnexo()
			});
	};

	const handleCloseMensaje = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenMensaje(false);
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
				<Paper elevation={4} className={classes.root}>
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
					<Modal
						aria-labelledby='transition-modal-title'
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={openNombre}
						onClose={handleCloseNombre}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{ timeout: 500 }}>
						<Fade in={openNombre}>
							<div className={classes.estiloModal}>
								<Typography variant="h6">
									Buscar
								</Typography>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="nm_anexo"
									label="Nombre de Anexo"
									name="nm_anexo"
									autoComplete="nm_anexo"
									autoFocus
									onChange={onChange.bind()}
									onKeyDown={Enter.bind()}
									value={filtro.nm_anexo}
								/>
							</div>
						</Fade>
					</Modal>
					<Modal
						aria-labelledby='transition-modal-title'
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={openId}
						onClose={handleCloseId}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{ timeout: 500 }}>
						<Fade in={openId}>
							<div className={classes.estiloModal}>
								<Typography variant="h6">
									Buscar
								</Typography>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="id_anexo"
									label="Id de Anexo"
									name="id_anexo"
									autoComplete="id_anexo"
									autoFocus
									onChange={onChange.bind()}
									onKeyDown={Enter.bind()}
									value={filtro.id_anexo}
								/>
							</div>
						</Fade>
					</Modal>
					<Modal
						aria-labelledby='transition-modal-title'
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={openAlias}
						onClose={handleCloseAlias}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{ timeout: 500 }}>
						<Fade in={openAlias}>
							<div className={classes.estiloModal}>
								<Typography variant="h6">
									Buscar
								</Typography>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="nm_alias"
									label="Alias de Anexo"
									name="nm_alias"
									autoComplete="nm_alias"
									autoFocus
									onChange={onChange.bind()}
									onKeyDown={Enter.bind()}
									value={filtro.nm_alias}
								/>
							</div>
						</Fade>
					</Modal>
					<Modal
						aria-labelledby='transition-modal-title'
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={openNDocumento}
						onClose={handleCloseNDocumento}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{ timeout: 500 }}>
						<Fade in={openNDocumento}>
							<div className={classes.estiloModal}>
								<Typography variant="h6">
									Buscar
								</Typography>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="ruc"
									label="N° Documento"
									name="ruc"
									autoComplete="ruc"
									autoFocus
									onChange={onChange.bind()}
									onKeyDown={Enter.bind()}
									value={filtro.ruc}
								/>
							</div>
						</Fade>
					</Modal>
					<Modal
						aria-labelledby='transition-modal-title'
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={opentdocumento}
						onClose={handleClosetdocumento}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{ timeout: 500 }}>
						<Fade in={opentdocumento}>
							<div className={classes.estiloModal}>
								<Typography variant="h6">
									Buscar
								</Typography>
								<TextField
									variant="outlined"
									margin="normal"
									required
									fullWidth
									id="tdocumento"
									label="Tipo de Documento"
									name="tdocumento"
									autoComplete="tdocumento"
									autoFocus
									onChange={onChange.bind()}
									onKeyDown={Enter.bind()}
									value={filtro.tdocumento}
								/>
							</div>
						</Fade>
					</Modal>
					<div className={classes.tableWrapper}>
						<Table stickyHeader aria-label="sticky table" size="small">
							<TableHead>
								<TableRow>
									<StyledTableCell key='1' onClick={handleId}>ID</StyledTableCell>
									<StyledTableCell key='2' onClick={handleNombre}>Nombre</StyledTableCell>
									<StyledTableCell key='3' align='right' onClick={handleAlias}>Alias</StyledTableCell>
									<StyledTableCell key='4' align='right' onClick={handletdocumento}>Tipo de Documento</StyledTableCell>
									<StyledTableCell key='5' align='right' onClick={handleNDocumento}>N° Documento</StyledTableCell>
									<StyledTableCell key='6' align='right'>Estado</StyledTableCell>
									<StyledTableCell key='7' align='center'>Editar</StyledTableCell>
									<StyledTableCell key='8' align='center'>Eliminar</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
									return (
										<TableRow hover tabIndex={-1} key={row.code}>
											{columns.map(column => {
												const value = row[column.id];
												return (
													<TableCell key={column.id} align={column.align}>
														{column.format && typeof value === 'number' ? column.format(value) : value}
													</TableCell>
												);
											})}
											<TableCell align='center'>
												<Link to={`/smnuAnexo/editar?id_anexo=${row.id_anexo}`}>
													<IconButton>
														<EditIcon />
													</IconButton>
												</Link>
											</TableCell>
											<TableCell align='center'>
												<IconButton onClick={() => eliminarAnexo(row.id_anexo)}>
													<DeleteForeverIcon />
												</IconButton>
											</TableCell>
										</TableRow>
									);
								})}
								<TableRow>
									<TablePagination
										rowsPerPageOptions={[10, 25, 50]}
										count={total}
										rowsPerPage={filtro.rows}
										page={filtro.page - 1}
										onChangePage={handleChangePage}
										onChangeRowsPerPage={handleChangeRowsPerPage}
										labelRowsPerPage={'Items por página'}
										labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
									/>
								</TableRow>
							</TableBody>
						</Table>
					</div>
				</Paper>
			</Slide>
		</React.Fragment>
	);
}