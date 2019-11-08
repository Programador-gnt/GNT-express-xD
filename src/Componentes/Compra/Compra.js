import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
		right: theme.spacing(2),
	},
	campo: {
		marginTop: theme.spacing(2)
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(12),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 'auto',
			marginLeft: theme.spacing(2),
			marginRight: theme.spacing(2),
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
	formControl: {
		marginLeft: theme.spacing(2)
	},
	nombreProveedor:{
		marginTop: theme.spacing(4),
		marginLeft: theme.spacing(1)
	}
}));

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

	const recibirProveedor = (codigo, nombre) => {
		setCuerpo({
			...cuerpo,
			codigoProveedor: codigo,
			nombreProveedor: nombre
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
							<ModalPanel abrir={showModal} titulo='Busqueda de proveedores' funcion={handleModal.bind()} capturarProveedor={recibirProveedor.bind()}/>
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
				</Paper>
			</main>
		</React.Fragment>
	);
}