import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
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
	paper: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
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
		marginTop: theme.spacing(1)
	},
	table: {
		marginTop: theme.spacing(3)
	}
}));

const columns = [
	{ id: 'OPE', label: 'OPE', minWidth: 170 },
	{ id: 'VOU', label: 'VOU', minWidth: 100 },
	{
		id: 'fecha',
		label: 'Fecha',
		minWidth: 170,
		align: 'right',
		format: value => value.toLocaleString(),
	},
	{
		id: 'td',
		label: 'TD',
		minWidth: 170,
		align: 'right',
		format: value => value.toLocaleString(),
	},
	{
		id: 'serie',
		label: 'Serie',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'documento',
		label: 'Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'liqgastos',
		label: 'LiqGastos',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'oc',
		label: 'O.C.',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'documento',
		label: 'Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'documento',
		label: 'Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'documento',
		label: 'Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'documento',
		label: 'Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'documento',
		label: 'Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'documento',
		label: 'Documento',
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

export default function Compra() {
	const classes = useStyles();
	const [value, setValue] = React.useState('rangofechas');
	const [selectedDate, setSelectedDate] = React.useState(new Date());
	const [open, setOpen] = React.useState(false);
	const [cuerpo, setCuerpo] = React.useState({
		estado: '01',
		codigoProveedor: '',
		nombreProveedor: ''
	})
	const [estado, setEstado] = React.useState([
		{ id_tdocumento: '01', alias: 'Todos los documentos' },
		{ id_tdocumento: '02', alias: 'Documentos pendientes' },
		{ id_tdocumento: '03', alias: 'Documentos cerrados' }
	])
	const [showModal, setShowModal] = React.useState(false)
	const [listaBotones, setListaBotones] = React.useState([])
	const [filtro, setFiltro] = React.useState([])

	React.useEffect(() => {
		consultarListaBotones()
	}, []);

	const handleChange = event => {
		setValue(event.target.value);
	};

	const handleDateChange = date => {
		setSelectedDate(date);
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
		setCuerpo({
			...cuerpo,
			[e.target.name]: e.target.value
		})
	}

	const recibirProveedor = (id_anexo, nm_anexo) => {
		setCuerpo({
			...cuerpo,
			codigoProveedor: id_anexo,
			nombreProveedor: nm_anexo
		})
		setShowModal(!showModal)
	}

	const consultarListaBotones = () => {
		consumeWS('GET', 'api/general/accesolistar', '', `?codigoformulario=ctbregistro_compras_lista`)
			.then(result => {
				setListaBotones(result)
			});
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

				{listaBotones.map(botones => (
					botones.nombre === 'Editar' ?
						null :
						botones.nombre === 'Eliminar' ?
							null :
							<SpeedDialAction
								key={botones.nombre}
								icon={botones.nombre === 'Nuevo' ? <AddCircleIcon /> : botones.nombre === 'Buscar' ? <SearchIcon /> : botones.nombre === 'Imprimir' ? <PrintIcon /> : botones.nombre === 'Excel' ? <InsertDriveFileIcon /> : ''}
								tooltipTitle={botones.nombre}
								onClick={botones.nombre === 'Nuevo' ? () => alert('nuevo') : botones.nombre === 'Buscar' ? () => alert('Buscar') : botones.nombre === 'Imprimir' ? () => alert('Imprimir') : botones.nombre === 'Excel' ? () => alert('XLS') : ''}
							/>
				))}
			</SpeedDial>
			<main className={classes.layout}>
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
				<Paper className={classes.paper}>
					<FormControl component="fieldset">
						<RadioGroup aria-label="gender" name="gender" value={value} onChange={handleChange}>
							<FormControlLabel value="rangofechas" control={<Radio color='primary' />} label="Rango de fechas" />
							<FormControlLabel value="noperacion" control={<Radio color='primary' />} label="Nro. Operación" />
							<FormControlLabel value="ndocumento" control={<Radio color='primary' />} label="Nro. Documento" />
							<FormControlLabel value="nvoucher" control={<Radio color='primary' />} label="Nro. Voucher" />
							<FormControlLabel value="ntransaccion" control={<Radio color='primary' />} label="Nro. Transacción" />
						</RadioGroup>
					</FormControl>
					{value === 'rangofechas' ?
						<FormControl component="fieldset" className={classes.formControl}>
							<ModalPanel abrir={showModal} funcion={handleModal.bind()} capturarProveedor={recibirProveedor.bind()} tipo='PRV' />
							<Grid container>
								<MuiPickersUtilsProvider utils={DateFnsUtils}>
									<Grid item xs={12} sm={5}>
										<KeyboardDatePicker
											margin="normal"
											id="date-picker-dialog"
											label="Date picker dialog"
											format="MM/dd/yyyy"
											value={selectedDate}
											onChange={handleDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
									<Grid item xs={12} sm={2}>
										<Typography variant="body1" gutterBottom className={classes.texto}>Al</Typography>
									</Grid>
									<Grid item xs={12} sm={5}>
										<KeyboardDatePicker
											margin="normal"
											id="date-picker-dialog"
											label="Date picker dialog"
											format="MM/dd/yyyy"
											value={selectedDate}
											onChange={handleDateChange}
											KeyboardButtonProps={{
												'aria-label': 'change date',
											}}
										/>
									</Grid>
								</MuiPickersUtilsProvider>

							</Grid>
							<Grid container>
								<Grid item xs={12} sm={2}>
									<TextField
										id="proveedor"
										name="proveedor"
										autoComplete="proveedor"
										value={cuerpo.codigoProveedor}
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
									value={cuerpo.estado}
									name='estado'
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
									name="liquidaciondegastos"
									autoComplete="liquidacion"
									value={cuerpo.liquidaciondegastos}
									label='Liquidación de gastos'
									onChange={onChange.bind()}
								/>
							</Grid>
						</FormControl> :
						value === 'noperacion' ?
							<FormControl component="fieldset" className={classes.formControl}>
								<p>Nro operación</p>
							</FormControl> :
							value === 'ndocumento' ?
								<FormControl component="fieldset" className={classes.formControl}>
									<p>Nro Documento</p>
								</FormControl> :
								value === 'nvoucher' ?
									<FormControl component="fieldset" className={classes.formControl}>
										<p>Nro Voucher</p>
									</FormControl> :
									value === 'ntransaccion' ?
										<FormControl component="fieldset" className={classes.formControl}>
											<p>Nro Transacción</p>
										</FormControl> :
										null
					}
					<div>
						<Table stickyHeader aria-label="sticky table" size="small" className={classes.table}>
							<TableHead >
								<TableRow>
									<StyledTableCell key='1' >OPE</StyledTableCell>
									<StyledTableCell key='2' >VOU</StyledTableCell>
									<StyledTableCell key='3' align='right' >Fecha</StyledTableCell>
									<StyledTableCell key='4' align='right' >TD</StyledTableCell>
									<StyledTableCell key='5' align='right' >Serie</StyledTableCell>
									<StyledTableCell key='6' align='right'>Documento</StyledTableCell>
									<StyledTableCell key='7' align='right'>LiqGastos</StyledTableCell>
									<StyledTableCell key='8' align='right' >O.C.</StyledTableCell>
									<StyledTableCell key='9' align='right' >Proveedor</StyledTableCell>
									<StyledTableCell key='10' align='right' >Moneda</StyledTableCell>
									<StyledTableCell key='11' align='right' >Neto</StyledTableCell>
									<StyledTableCell key='12' align='right' >Glosa</StyledTableCell>
									<StyledTableCell key='13' align='right' >CD</StyledTableCell>
									<StyledTableCell key='14' align='right' >Estado</StyledTableCell>
									{listaBotones.map(botones => (
										botones.nombre === 'Editar' ?
											<StyledTableCell key='15' align='center'>Editar</StyledTableCell> :
											botones.nombre === 'Eliminar' ?
												<StyledTableCell key='16' align='center'>Eliminar</StyledTableCell> :
												null
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{/* {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
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
											{listaBotones.map(botones => (
												botones.nombre === 'Editar' ?
													<TableCell align='center' className={classes.celdas}>
														<Link to={`/smnuAnexo/editar?id_anexo=${row.id_anexo}`}>
															<Fab size="small" color='primary'>
																<EditIcon />
															</Fab>
														</Link>
													</TableCell> :
													botones.nombre === 'Eliminar' ?
														<TableCell align='center' className={classes.celdas}>
															<Fab color='secondary' onClick={() => eliminarAnexo(row.id_anexo)} size="small">
																<DeleteForeverIcon />
															</Fab>
														</TableCell> :
														null
											))}
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
								</TableRow> */}
							</TableBody>
						</Table>
					</div>
				</Paper>
			</main>
		</React.Fragment>
	);
}