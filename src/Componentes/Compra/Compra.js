import React from 'react';
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
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

	const handleDateChange = date => {
		setFiltro({
			...filtro,
			b1fecha_inicial: formatDateFinal(date)
		})
	};

	const handleDateChangeFinal = date => {
		setFiltro({
			...filtro,
			b1fecha_final: formatDateFinal(date)
		})
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

	const buscarDatos=()=>{
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
								<StyledTableCell >OPE</StyledTableCell>
								<StyledTableCell >VOU</StyledTableCell>
								<StyledTableCell align='left' style={{minWidth: 170}}>Fecha</StyledTableCell>
								<StyledTableCell align='left'>TD</StyledTableCell>
								<StyledTableCell align='left'>Electrónico</StyledTableCell>
								<StyledTableCell align='left'>Serie</StyledTableCell>
								<StyledTableCell align='left'>Documento</StyledTableCell>
								<StyledTableCell align='left'>LiqGastos</StyledTableCell>
								<StyledTableCell align='left'>O.C.</StyledTableCell>
								<StyledTableCell align='left'>Proveedor</StyledTableCell>
								<StyledTableCell align='left'>Moneda</StyledTableCell>
								<StyledTableCell align='left'>Neto</StyledTableCell>
								<StyledTableCell align='left'>Estado</StyledTableCell>
								<StyledTableCell align='left'>Glosa</StyledTableCell>
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
													<Fab size="small" color='primary'>
														<SearchIcon />
													</Fab>
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