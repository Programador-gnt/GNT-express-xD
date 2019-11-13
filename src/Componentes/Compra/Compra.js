import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';
import SpeedDial from '@material-ui/lab/SpeedDial';
import MenuIcon from '@material-ui/icons/Menu';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import SearchIcon from '@material-ui/icons/Search';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PrintIcon from '@material-ui/icons/Print';
import Backdrop from '@material-ui/core/Backdrop';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import ModalPanel from '../Layout/Modal';
import consumeWS from '../Config/WebService';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@material-ui/core/Modal';
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
	texto: {
		marginTop: theme.spacing(5),
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(2)
	},
	back: {
		transform: 'translateZ(0px)',
		position: 'fixed',
		zIndex: 100
	},
	speedDial: {
		position: 'fixed',
		bottom: theme.spacing(8),
		right: theme.spacing(2)
	},
	campo: {
		marginTop: theme.spacing(2)
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(8),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 'auto',
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
		},
	},
	root: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	formControl: {
		marginLeft: theme.spacing(2)
	},
	nombreProveedor: {
		marginTop: theme.spacing(4),
		marginLeft: theme.spacing(1)
	},
	fab: {
		marginLeft: theme.spacing(1),
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	},
	tableWrapper: {
		maxHeight: '78%',
		overflow: 'auto',
		position: 'fixed',
		width: '100%',
	},
	paper: {
		width: '45%',
		zIndex: 1,
		position: 'relative',
		alignContent: 'center',
	},
	check: {
		left: theme.spacing(1)
	},
	pestaña: {
		backgroundColor: theme.palette.background.paper,
		width: '100%',
		position: 'fixed',
	},
	boton: {
		marginLeft: theme.spacing(30),
		marginBottom: theme.spacing(4)
	},
	back2: {
		transform: 'translateZ(0px)',
		position: 'fixed'
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
	}
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<Typography
			component="div"
			role="tabpanel"
			hidden={value !== index}
			id={`full-width-tabpanel-${index}`}
			aria-labelledby={`full-width-tab-${index}`}
			{...other}
		>
			<Box>{children}</Box>
		</Typography>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `full-width-tab-${index}`,
		'aria-controls': `full-width-tabpanel-${index}`,
	};
}

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


function formatDateFinal(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return [day, month, year].join('/');
}

function formatDateInicial(date) {
	var d = new Date(date),
		month = '' + (d.getMonth() + 1),
		day = '' + d.getDate(),
		year = d.getFullYear();

	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;

	return ['01', month, year].join('/');
}

export default function Compra() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [cuerpo, setCuerpo] = React.useState({
		estado: '01',
		codigoProveedor: '',
		nombreProveedor: ''
	})
	const [estado, setEstado] = React.useState([
		{ id_tdocumento: '0', alias: 'Todos los documentos' },
		{ id_tdocumento: '1', alias: 'Documentos pendientes' },
		{ id_tdocumento: '2', alias: 'Documentos cerrados' }
	])
	const [showModal, setShowModal] = React.useState(false)
	const [listaBotones, setListaBotones] = React.useState([])
	const [selectedDateInicio, setSelectedDateInicio] = React.useState(new Date());
	const [selectedDateFiltro, setSelectedDateFiltro] = React.useState(selectedDateInicio);
	const [selectedDateFinal, setSelectedDateFinal] = React.useState(new Date());
	const [filtro, setFiltro] = React.useState(
		{
			"btipo": "1",
			// "b1fecha_inicial": "01/01/2018",
			// "b1fecha_final": "10/01/2018",
			"b1fecha_inicial": formatDateInicial(new Date()),
			"b1fecha_final": formatDateFinal(new Date()),
			"b1id_proveedor": "0",
			"b1numliquidacion": "",
			"b1estado": "0",
			"b2anho": "0",
			"b2mes": "0",
			"b2numoperacion": "0",
			"b3id_proveedor": "0",
			"b3id_tdocumento": "0",
			"b3electronico": "",
			"b3serie": "0",
			"b3numero": "0",
			"b4anho": "0",
			"b4mes": "0",
			"b4num_asiento": "0",
			"b5id_operacion": "0",
			"page": "1",
			"rows": "20",
			"id_operacion": "0",
			"numoperacion": "0",
			"num_asiento": "0",
			"fecha": "",
			"id_tdocumento": "0",
			"electronico": "",
			"serie": "0",
			"numero": "0",
			"numliquidacion": "",
			"id_ocompra": "0",
			"nm_anexo": "",
			"moneda": "",
			"v_neto": "0",
			"nomestado": "",
			"glosa": "",
			"chkcd": "0",
			"sortcolumn": "fecha",
			"sortorder": "desc"
		}
	)
	const [panelBusqueda, setPanelBusqueda] = React.useState(false)
	const page = 0
	const rowsPerPage = 50
	const theme = useTheme();
	const [valor, setValor] = React.useState(0);
	const [rows, setRows] = React.useState([])
	const [total, setTotal] = React.useState(0)
	const [openOPE, setOpenOPE] = React.useState(false)
	const [openVOU, setOpenVOU] = React.useState(false)
	const [openFecha, setOpenFecha] = React.useState(false)
	const [openTD, setOpenTD] = React.useState(false)
	const [openElectronico, setOpenElectronico] = React.useState(false)
	const [openSerie, setOpenSerie] = React.useState(false)
	const [openNumero, setOpenNumero] = React.useState(false)
	const [openLiquidacion, setOpenLiquidacion] = React.useState(false)
	const [openOC, setOpenOC] = React.useState(false)
	const [openProveedor, setOpenProveedor] = React.useState(false)
	const [openMoneda, setOpenMoneda] = React.useState(false)
	const [openNeto, setOpenNeto] = React.useState(false)
	const [openEstado, setOpenEstado] = React.useState(false)
	const [openGlosa, setOpenGlosa] = React.useState(false)

	React.useEffect(() => {
		consultarListaBotones()
		consultarFiltro()
		conteo()
	}, []);

	const handleChange = () => {
		setPanelBusqueda(!panelBusqueda)
	};

	const handleCambio = (event, newValue) => {
		setValor(newValue);
	};

	const handleChangeIndex = index => {
		setValor(index);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleCloseButton = () => {
		setOpen(false);
	};

	const tecla = (e) => {
		if (e.keyCode === 113) {
			setShowModal(!showModal)
		}
	}

	const handleModal = () => {
		setShowModal(!showModal)
	}

	const onChange = (e) => {
		setFiltro({
			...filtro,
			[e.target.name]: e.target.value
		})
	}

	const recibirProveedor = (id_proveedor, nm_anexo) => {
		setCuerpo({
			...cuerpo,
			nombreProveedor: nm_anexo
		})
		setFiltro({
			...filtro,
			b1id_proveedor: id_proveedor
		})
		setShowModal(!showModal)
	}

	const consultarListaBotones = () => {
		consumeWS('GET', 'api/general/accesolistar', '', `?codigoformulario=ctbregistro_compras_lista`)
			.then(result => {
				setListaBotones(result)
			});
	}

	const handleChangeRowsPerPage = event => {
		filtro.rows = event.target.value
		consultarFiltro()
	};

	const handleChangePage = (event, newPage) => {
		filtro.page = newPage + 1
		consultarFiltro()
	}

	const consultarFiltro = () => {
		consumeWS('POST', 'api/comdocumento/examinar', filtro, '')
			.then(result => {
				setRows(result)
			})
	}

	const buscarDatos = () => {
		consultarFiltro()
		conteo()
		setPanelBusqueda(!panelBusqueda)
	}

	const conteo = async () => {
		consumeWS('POST', 'api/comdocumento/examinarcontador', filtro, '')
			.then(result => {
				setTotal(result)
			});
	}
	const handleFechaInicio = date => {
		setSelectedDateInicio(date);
		setFiltro({
			...filtro,
			b1fecha_inicial: formatDateFinal(date)
		})
	};

	const handleFechaFinal = date => {
		setSelectedDateFinal(date);
		setFiltro({
			...filtro,
			b1fecha_final: formatDateFinal(date)
		})
	};

	const Enter = (e) => {
		if (e.keyCode === 13) {
			consultarFiltro()
			conteo()
			setOpenOPE(false)
			setOpenVOU(false)
			setOpenFecha(false)
			setOpenTD(false)
			setOpenElectronico(false)
			setOpenSerie(false)
			setOpenNumero(false)
			setOpenLiquidacion(false)
			setOpenOC(false)
			setOpenProveedor(false)
			setOpenMoneda(false)
			setOpenNeto(false)
			setOpenEstado(false)
			setOpenGlosa(false)
		}
	}

	const handleCloseOPE = () => {
		setOpenOPE(false)
	}

	const handleOPE = () => {
		setOpenOPE(true)
	}

	const handleCloseVOU = () => {
		setOpenVOU(false)
	}

	const handleVOU = () => {
		setOpenVOU(true)
	}

	const handleCloseFecha = () => {
		setOpenFecha(false)
	}

	const handleFecha = () => {
		setOpenFecha(true)
	}

	const handleFechaFiltro = date => {
		setSelectedDateFiltro(date);
		setFiltro({
			...filtro,
			fecha: formatDateFinal(date)
		})
	}

	const handleCloseTD = () => {
		setOpenTD(false)
	}

	const handleTD = () => {
		setOpenTD(true)
	}

	const handleCloseElectronico = () => {
		setOpenElectronico(false)
	}

	const handleElectronico = () => {
		setOpenElectronico(true)
	}

	const handleCloseSerie = () => {
		setOpenSerie(false)
	}

	const handleSerie = () => {
		setOpenSerie(true)
	}

	const handleCloseNumero = () => {
		setOpenNumero(false)
	}

	const handleNumero = () => {
		setOpenNumero(true)
	}

	const handleCloseLiquidacion = () => {
		setOpenLiquidacion(false)
	}

	const handleLiquidacion = () => {
		setOpenLiquidacion(true)
	}

	const handleCloseOC = () => {
		setOpenOC(false)
	}

	const handleOC = () => {
		setOpenOC(true)
	}

	const handleCloseProveedor = () => {
		setOpenProveedor(false)
	}

	const handleProveedor = () => {
		setOpenProveedor(true)
	}

	const handleCloseMoneda = () => {
		setOpenMoneda(false)
	}

	const handleMoneda = () => {
		setOpenMoneda(true)
	}

	const handleCloseNeto = () => {
		setOpenNeto(false)
	}

	const handleNeto = () => {
		setOpenNeto(true)
	}

	const handleCloseEstado = () => {
		setOpenEstado(false)
	}

	const handleEstado = () => {
		setOpenEstado(true)
	}

	const handleCloseGlosa = () => {
		setOpenGlosa(false)
	}

	const handleGlosa = () => {
		setOpenGlosa(true)
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Backdrop open={panelBusqueda} className={classes.back2} />
			<Backdrop open={open} className={classes.back} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				className={classes.speedDial}
				icon={<MenuIcon />}
				onClose={handleCloseButton}
				onOpen={handleOpen}
				open={open}>

				{listaBotones.map(botones => (
					botones.nombre === 'Editar' ?
						null :
						botones.nombre === 'Eliminar' ?
							null :
							<SpeedDialAction
								key={botones.nombre}
								icon={botones.nombre === 'Nuevo' ? <AddCircleIcon /> : botones.nombre === 'Buscar' ? <SearchIcon /> : botones.nombre === 'Imprimir' ? <PrintIcon /> : botones.nombre === 'Excel' ? <InsertDriveFileIcon /> : ''}
								tooltipTitle={botones.nombre}
								onClick={botones.nombre === 'Nuevo' ? () => alert('nuevo') : botones.nombre === 'Buscar' ? () => handleChange() : botones.nombre === 'Imprimir' ? () => alert('Imprimir') : botones.nombre === 'Excel' ? () => alert('XLS') : ''}
							/>
				))}
			</SpeedDial>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openOPE}
				onClose={handleCloseOPE}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openOPE}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="id_operacion"
							label="ID de operación"
							name="id_operacion"
							autoComplete="id_operacion"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.id_operacion}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openVOU}
				onClose={handleCloseVOU}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openVOU}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="numoperacion"
							label="Número de voucher"
							name="numoperacion"
							autoComplete="numoperacion"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.numoperacion}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openFecha}
				onClose={handleCloseFecha}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openFecha}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<MuiPickersUtilsProvider utils={DateFnsUtils}>
							<Grid item xs={12}>
								<KeyboardDatePicker
									disableToolbar
									margin='normal'
									variant="inline"
									format="dd/MM/yyyy"
									id="date-picker-inline"
									label="Fecha"
									value={selectedDateFiltro}
									onChange={handleFechaFiltro}
									onKeyDown={Enter.bind()}
									KeyboardButtonProps={{
										"aria-label": "change date"
									}}
								/>
							</Grid>
						</MuiPickersUtilsProvider>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openTD}
				onClose={handleCloseTD}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openTD}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="id_tdocumento"
							label="Tipo de documento"
							name="id_tdocumento"
							autoComplete="id_tdocumento"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.id_tdocumento}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openElectronico}
				onClose={handleCloseElectronico}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openElectronico}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="electronico"
							label="Electrónico"
							name="electronico"
							autoComplete="electronico"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.electronico}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openSerie}
				onClose={handleCloseSerie}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openSerie}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="serie"
							label="Serie"
							name="serie"
							autoComplete="serie"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.serie}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openNumero}
				onClose={handleCloseNumero}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openNumero}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="numero"
							label="Número de documento"
							name="numero"
							autoComplete="numero"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.numero}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openLiquidacion}
				onClose={handleCloseLiquidacion}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openLiquidacion}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="numliquidacion"
							label="Número de liquidación"
							name="numliquidacion"
							autoComplete="numliquidacion"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.numliquidacion}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openOC}
				onClose={handleCloseOC}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openOC}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="id_ocompra"
							label="Órden de compra"
							name="id_ocompra"
							autoComplete="id_ocompra"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.id_ocompra}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openProveedor}
				onClose={handleCloseProveedor}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openProveedor}>
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
							label="Proveedor"
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
				open={openMoneda}
				onClose={handleCloseMoneda}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openMoneda}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="moneda"
							label="Moneda"
							name="moneda"
							autoComplete="moneda"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.moneda}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openNeto}
				onClose={handleCloseNeto}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openNeto}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="v_neto"
							label="Neto"
							name="v_neto"
							autoComplete="v_neto"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.v_neto}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openEstado}
				onClose={handleCloseEstado}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openEstado}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="nomestado"
							label="Estado"
							name="nomestado"
							autoComplete="nomestado"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.nomestado}
						/>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={openGlosa}
				onClose={handleCloseGlosa}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={openGlosa}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Buscar
						</Typography>
						<TextField
							variant="outlined"
							margin="normal"
							required
							fullWidth
							id="glosa"
							label="Glosa"
							name="glosa"
							autoComplete="glosa"
							autoFocus
							onChange={onChange.bind()}
							onKeyDown={Enter.bind()}
							value={filtro.glosa}
						/>
					</div>
				</Fade>
			</Modal>
			{listaBotones.map(botones => (
				botones.nombre === 'Editar' ?
					null :
					botones.nombre === 'Eliminar' ?
						null :
						<Fab className={classes.fab} color='primary' size="small">
							{botones.nombre === 'Nuevo' ? <AddCircleIcon /> :
								botones.nombre === 'Buscar' ? <SearchIcon /> :
									botones.nombre === 'Imprimir' ? <PrintIcon /> :
										botones.nombre === 'Excel' ? <InsertDriveFileIcon /> : ''}
						</Fab>
			))}
			<Paper elevation={4} className={classes.root}>
				<div className={classes.tableWrapper}>
					<Table stickyHeader aria-label="sticky table" size="small" className={classes.table}>
						<TableHead >
							<TableRow>
								<StyledTableCell onClick={rows.length < 1 ? '' : handleOPE}>OPE</StyledTableCell>
								<StyledTableCell onClick={rows.length < 1 ? '' : handleVOU}>VOU</StyledTableCell>
								<StyledTableCell align='left' style={{ minWidth: 170 }} onClick={rows.length < 1 ? '' : handleFecha}>Fecha</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleTD}>TD</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleElectronico}>Electrónico</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleSerie}>Serie</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleNumero}>Documento</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleLiquidacion}>LiqGastos</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleOC}>O.C.</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleProveedor}>Proveedor</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleMoneda}>Moneda</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleNeto}>Neto</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleEstado}>Estado</StyledTableCell>
								<StyledTableCell align='left' onClick={rows.length < 1 ? '' : handleGlosa}>Glosa</StyledTableCell>
								<StyledTableCell align='left'>CD</StyledTableCell>
								{listaBotones.map(botones => (
									botones.nombre === 'Editar' ?
										<StyledTableCell align='center'>Visualizar</StyledTableCell> :
										botones.nombre === 'Eliminar' ?
											null :
											null
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
								return (
									<TableRow hover tabIndex={-1} key={row.code}>
										<TableCell key={index}>{row.id_operacion}</TableCell>
										<TableCell key={index}>{row.numoperacion}</TableCell>
										<TableCell key={index}>{formatDateFinal(row.fecha)}</TableCell>
										<TableCell key={index}>{row.id_tdocumento}</TableCell>
										<TableCell key={index}>{row.electronico}</TableCell>
										<TableCell key={index}>{row.serie}</TableCell>
										<TableCell key={index}>{row.numero}</TableCell>
										<TableCell key={index}>{row.numliquidacion}</TableCell>
										<TableCell key={index}>{row.id_ocompra}</TableCell>
										<TableCell key={index}>{row.nm_anexo}</TableCell>
										<TableCell key={index}>{row.moneda}</TableCell>
										<TableCell key={index}>{row.v_neto}</TableCell>
										<TableCell key={index}>{row.nomestado}</TableCell>
										<TableCell key={index}>{row.glosa}</TableCell>
										<TableCell key={index}>{row.chkcd}</TableCell>
										{listaBotones.map(botones => (
											botones.nombre === 'Editar' ?
												<TableCell align='center' className={classes.celdas}>
													<Link to='/sssmnuCTBCompra/editar'><Fab size="small" color='primary'>
														<SearchIcon />
													</Fab></Link>
												</TableCell> :
												botones.nombre === 'Eliminar' ?
													null :
													null
										))}
									</TableRow>
								);
							})}
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[10, 20, 50]}
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
				<Fade in={panelBusqueda} mountOnEnter unmountOnExit timeout={1000}>
					<div className={classes.pestaña}>
						<AppBar position="static" color="default">
							<Tabs
								value={valor}
								onChange={handleCambio}
								indicatorColor="primary"
								textColor="primary"
								variant="fullWidth"
								aria-label="full width tabs example"
							>
								<Tab label={<Typography variant='caption'>Fechas</Typography>} {...a11yProps(0)} />
								<Tab label={<Typography variant='caption'>Operación</Typography>} {...a11yProps(1)} />
								<Tab label={<Typography variant='caption'>Documento</Typography>} {...a11yProps(2)} />
								<Tab label={<Typography variant='caption'>Voucher</Typography>} {...a11yProps(3)} />
								<Tab label={<Typography variant='caption'>Transacción</Typography>} {...a11yProps(4)} />
							</Tabs>
						</AppBar>
						<SwipeableViews
							axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
							index={valor}
							onChangeIndex={handleChangeIndex}
						>
							<TabPanel value={valor} index={0} dir={theme.direction}>
								<FormControl component="fieldset" className={classes.formControl}>
									<ModalPanel abrir={showModal} funcion={handleModal.bind()} capturarProveedor={recibirProveedor.bind()} tipo='PRV' />
									<Grid container>
										<MuiPickersUtilsProvider utils={DateFnsUtils}>
											<Grid item xs={12} sm={5}>
												<KeyboardDatePicker
													disableToolbar
													margin='normal'
													variant="inline"
													format="dd/MM/yyyy"
													id="date-picker-inline"
													label="Inicio"
													value={selectedDateInicio}
													onChange={handleFechaInicio}
													KeyboardButtonProps={{
														"aria-label": "change date"
													}}
												/>
											</Grid>
											<Grid item xs={12} sm={2}>
												<Typography variant="body1" gutterBottom className={classes.texto}>Al</Typography>
											</Grid>
											<Grid item xs={12} sm={5}>
												<KeyboardDatePicker
													disableToolbar
													margin='normal'
													variant="inline"
													format="dd/MM/yyyy"
													id="date-picker-inline"
													label="Fin"
													value={selectedDateFinal}
													onChange={handleFechaFinal}
													KeyboardButtonProps={{
														"aria-label": "change date"
													}}
												/>
											</Grid>
										</MuiPickersUtilsProvider>
									</Grid>
									<Grid container>
										<Grid item xs={12} sm={2}>
											<TextField
												id="proveedor"
												name="b1id_proveedor"
												autoComplete="proveedor"
												value={filtro.b1id_proveedor}
												helperText="Presiona F2"
												label='Proveedor'
												onKeyDown={tecla.bind()}
												onChange={onChange.bind()}
											/>
										</Grid>
										<Grid item xs={12} sm={7} className={classes.nombreProveedor}>
											<Typography variant="body2" gutterBottom>{cuerpo.nombreProveedor}</Typography>
										</Grid>
									</Grid>
									<Grid item xs={12} sm={4}>
										<TextField
											required
											id="estado"
											select
											value={filtro.b1estado}
											name='b1estado'
											onChange={onChange.bind()}
											helperText="Seleccione el tipo de estado"
											margin="normal">
											{estado.map(documento => (
												<MenuItem key={documento.id_tdocumento} value={documento.id_tdocumento}>
													{documento.alias}
												</MenuItem>
											))}
										</TextField>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											id="liquidacion"
											name="b1numliquidacion"
											autoComplete="liquidacion"
											value={filtro.b1numliquidacion}
											label='Liquidación de gastos'
											onChange={onChange.bind()}
										/>
									</Grid>
									<div>
										<Fab className={classes.fab} color='primary' size="small" onClick={() => buscarDatos()}>
											<SearchIcon />
										</Fab>
										<Fab className={classes.fab} color='secondary' size="small" onClick={() => handleChange()} >
											<CancelIcon />
										</Fab>
									</div>
								</FormControl>
							</TabPanel>
							<TabPanel value={valor} index={1} dir={theme.direction}>
								Item 2
        				</TabPanel>
							<TabPanel value={valor} index={2} dir={theme.direction}>
								Item 3
        				</TabPanel>
							<TabPanel value={valor} index={3} dir={theme.direction}>
								Item 4
        				</TabPanel>
							<TabPanel value={valor} index={4} dir={theme.direction}>
								Item 5
        				</TabPanel>
						</SwipeableViews>
					</div>

				</Fade>
			</Paper>
		</React.Fragment>
	);
}