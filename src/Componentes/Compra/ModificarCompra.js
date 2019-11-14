import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import SpeedDial from '@material-ui/lab/SpeedDial';
import MenuIcon from '@material-ui/icons/Menu';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import CancelIcon from '@material-ui/icons/Cancel';
import Backdrop from '@material-ui/core/Backdrop';
import { red } from '@material-ui/core/colors';
import { Redirect } from 'react-router-dom';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import LockIcon from '@material-ui/icons/Lock';
import HistoryIcon from '@material-ui/icons/History';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';

const useStyles = makeStyles(theme => ({
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(12),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 1000,
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
	campoPaper: {
		margin: theme.spacing(2)
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
	},
	texto: {
		marginTop: theme.spacing(4)
	}
}));

const actions = [
	{ name: 'Nuevo' },
	{ name: 'Guardar' },
	{ name: 'Cancelar' },
	{ name: 'Finalizar' },
	{ name: 'Historial' }
];

export default function ModificarCompra() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [cancel, setCancel] = React.useState(false)
	const [selectedDateInicio, setSelectedDateInicio] = React.useState(new Date());
	const [abrir, setAbrir] = React.useState(false)
	const [abrirPeriodo, setAbrirPeriodo] = React.useState(false)
	const [abrirProvision, setAbrirProvision] = React.useState(false)
	const [abrirRecepcion, setAbrirRecepcion] = React.useState(false)

	const handleCloseButton = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const irAtras = () => {
		setCancel(true)
	}

	const handleFechaInicio = date => {
		setSelectedDateInicio(date);
	};

	const abrirModal = () => {
		setAbrir(true)
	}

	const handleClose = () => {
		setAbrir(false)
	}

	const abrirModalPeriodo = () => {
		setAbrirPeriodo(true)
	}

	const handleClosePeriodo = () => {
		setAbrirPeriodo(false)
	}

	const abrirModalProvision = () => {
		setAbrirProvision(true)
	}

	const handleCloseProvision = () => {
		setAbrirProvision(false)
	}

	const abrirModalRecepcion = () => {
		setAbrirRecepcion(true)
	}

	const handleCloseRecepcion = () => {
		setAbrirRecepcion(false)
	}

	if (cancel === true) {
		return (<Redirect to='/sssmnuCTBCompra' />)
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
						icon={action.name === 'Historial' ? <HistoryIcon /> : action.name === 'Finalizar' ? <LockIcon /> : action.name === 'Guardar' ? <SaveIcon /> : action.name === 'Cancelar' ? <CancelIcon /> : action.name === 'Nuevo' ? <AddCircleIcon /> : ''}
						tooltipTitle={action.name}
						onClick={action.name === 'Guardar' ? () => alert('guardar') : action.name === 'Cancelar' ? () => irAtras() : ''}
					/>
				))}
			</SpeedDial>
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
							Liquidación
						</Typography>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								autoComplete="proveedor"
								helperText="Proveedor"
								className={classes.campo}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								autoComplete="liquidación"
								helperText="Liquidación de gastos"
								className={classes.campo}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="moneda"
								fullWidth
								select
								helperText="Moneda"
								value='soles'
								className={classes.campo}
								margin='normal'>
								<MenuItem key={1} value='soles'>Soles</MenuItem>
								<MenuItem key={2} value='dolares'>Dólares</MenuItem>
							</TextField>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								autoComplete="TC"
								helperText="T.C."
								className={classes.campo}
							/>
							<TextField
								required
								fullWidth
								autoComplete="monto"
								helperText="Monto total"
								className={classes.campo}
							/>
						</Grid>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => setAbrir(false)}
								className={classes.button}>
								Guardar
										</Button>
							<Button
								variant="contained"
								onClick={() => setAbrir(false)}
								color="secondary"
								className={classes.button}>
								Salir
										</Button>
						</div>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={abrirPeriodo}
				onClose={handleClosePeriodo}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={abrirPeriodo}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Cambio de periodo contable
						</Typography>
						<Grid item xs={12}>
							<TextField
								required
								fullWidth
								autoComplete="operacion"
								helperText="Operación Nro."
								className={classes.campo}
							/>
						</Grid>
						<Grid item xs={12}>
							<MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.campo}>
								<KeyboardDatePicker
									disableToolbar
									margin='normal'
									variant="inline"
									format="dd/MM/yyyy"
									id="date-picker-inline"
									helperText="Fecha donde desea cambiar la operación"
									value={selectedDateInicio}
									onChange={handleFechaInicio}
									KeyboardButtonProps={{
										"aria-label": "change date"
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => setAbrirPeriodo(false)}
								className={classes.button}>
								Cambiar periodo
								</Button>
							<Button
								variant="contained"
								onClick={() => setAbrirPeriodo(false)}
								color="secondary"
								className={classes.button}>
								Salir
								</Button>
						</div>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={abrirProvision}
				onClose={handleCloseProvision}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={abrirProvision}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Provisión y cambio de periodo
						</Typography>
						<Grid container spacing={1}>
							<Grid item xs={6} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="periodo"
									helperText="Periodo de la provisión"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={6} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="periodo"
									className={classes.campo}
								/>
							</Grid>
						</Grid>
						<Grid container spacing={1}>
							<Grid item xs={6} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="periodo"
									helperText="Periodo de la compra"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={6} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="periodo"
									className={classes.campo}
								/>
							</Grid>
						</Grid>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => setAbrirProvision(false)}
								className={classes.button}>
								Ejecutar
								</Button>
							<Button
								variant="contained"
								onClick={() => setAbrirProvision(false)}
								color="secondary"
								className={classes.button}>
								Salir
								</Button>
						</div>
					</div>
				</Fade>
			</Modal>
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={abrirRecepcion}
				onClose={handleCloseRecepcion}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={abrirRecepcion}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							Rcepción de documentos
						</Typography>
						<Grid item xs={12}>
							<MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.campo}>
								<KeyboardDatePicker
									disableToolbar
									margin='normal'
									variant="inline"
									format="dd/MM/yyyy"
									id="date-picker-inline"
									helperText="Fecha de recepción"
									value={selectedDateInicio}
									onChange={handleFechaInicio}
									KeyboardButtonProps={{
										"aria-label": "change date"
									}}
								/>
								<KeyboardDatePicker
									disableToolbar
									margin='normal'
									variant="inline"
									format="dd/MM/yyyy"
									id="date-picker-inline"
									helperText="Fecha de devolución"
									value={selectedDateInicio}
									onChange={handleFechaInicio}
									KeyboardButtonProps={{
										"aria-label": "change date"
									}}
								/>
							</MuiPickersUtilsProvider>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								multiline
								rows={4}
								fullWidth
								helperText='Notas'
								className={classes.campo}
							/>
						</Grid>
						<div className={classes.buttons}>
							<Button
								variant="contained"
								color="primary"
								onClick={() => setAbrirRecepcion(false)}
								className={classes.button}>
								Aceptar
								</Button>
							<Button
								variant="contained"
								onClick={() => setAbrirRecepcion(false)}
								color="secondary"
								className={classes.button}>
								Salir
								</Button>
						</div>
					</div>
				</Fade>
			</Modal>
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Modificar registro de compras
          			</Typography>
					<React.Fragment>
						<Grid container spacing={3}>
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="transacción"
									helperText="Número de transacción"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={9} />
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="número de operación"
									helperText="Número de operación"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6} />
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="voucher"
									helperText="Voucher"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={1}>
								<TextField
									required
									fullWidth
									autoComplete="voucher"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="voucher"
									helperText='Fecha Contable'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={1}>
								<TextField
									required
									fullWidth
									autoComplete="voucher"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={1}>
								<TextField
									required
									fullWidth
									autoComplete="voucher"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={8} />
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="sucursal"
									helperText="Sucursal"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<Typography variant='body1' align="left" className={classes.texto}>
									Lima
          						</Typography>
							</Grid>
							<Grid item xs={12} sm={8} />
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="proveedor"
									helperText="Proveedor"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={4}>
								<Typography variant='body1' align="left" className={classes.texto}>
									Nombre de proveedor
          						</Typography>
							</Grid>
							<Grid item xs={12} sm={6} />
							<Grid item xs={12} sm={1}>
								<TextField
									required
									fullWidth
									autoComplete="documento"
									helperText="Documento"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={1}>
								<TextField
									required
									fullWidth
									autoComplete="documento"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={1}>
								<TextField
									required
									fullWidth
									autoComplete="documento"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="documento"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={2} />
							<Grid item xs={12} sm={1}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Aplica"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={1}>
								<TextField
									required
									fullWidth
									autoComplete="documento"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={1}>
								<TextField
									required
									fullWidth
									autoComplete="documento"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="documento"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.campo}>
									<KeyboardDatePicker
										disableToolbar
										margin='normal'
										variant="inline"
										format="dd/MM/yyyy"
										id="date-picker-inline"
										helperText="Emisión"
										value={selectedDateInicio}
										onChange={handleFechaInicio}
										KeyboardButtonProps={{
											"aria-label": "change date"
										}}
									/>
								</MuiPickersUtilsProvider>
							</Grid>
							<Grid item xs={12} sm={6} />
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Compra afecta"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="T.C."
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={6} />
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Compra no afecta"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.campo}>
									<KeyboardDatePicker
										disableToolbar
										margin='normal'
										variant="inline"
										format="dd/MM/yyyy"
										id="date-picker-inline"
										helperText="Vencimiento"
										value={selectedDateInicio}
										onChange={handleFechaInicio}
										KeyboardButtonProps={{
											"aria-label": "change date"
										}}
									/>
								</MuiPickersUtilsProvider>
							</Grid>
							<Grid item xs={12} sm={6} />
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="I.S.C. 0.00%"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<MuiPickersUtilsProvider utils={DateFnsUtils} className={classes.campo}>
									<KeyboardDatePicker
										disableToolbar
										margin='normal'
										variant="inline"
										format="dd/MM/yyyy"
										id="date-picker-inline"
										helperText="Pago"
										value={selectedDateInicio}
										onChange={handleFechaInicio}
										KeyboardButtonProps={{
											"aria-label": "change date"
										}}
									/>
								</MuiPickersUtilsProvider>
							</Grid>
							<Grid item xs={12} sm={4} />
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="I.G.V."
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="I.G.V."
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									required
									id="moneda"
									fullWidth
									select
									helperText="Moneda"
									value='soles'
									className={classes.campo}
									margin='normal'>
									<MenuItem key={1} value='soles'>Soles</MenuItem>
									<MenuItem key={2} value='dolares'>Dólares</MenuItem>
								</TextField>
							</Grid>
							<Grid item xs={12} sm={6} />
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Neto"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={12}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Glosa"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Liquidación de gastos"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={7}>
								<Paper elevation={2}>
									<Grid container spacing={1}>
										<Grid item xs={7} sm={3}>
											<TextField
												required
												id="moneda"
												fullWidth
												select
												helperText="Moneda"
												value='soles'
												className={classes.campoPaper}
												margin='normal'>
												<MenuItem key={1} value='soles'>Soles</MenuItem>
												<MenuItem key={2} value='dolares'>Dólares</MenuItem>
											</TextField>
										</Grid>
										<Grid item xs={7} sm={2}>
											<TextField
												required
												fullWidth
												autoComplete="123"
												helperText="T.C."
												className={classes.campoPaper}
											/>
										</Grid>
										<Grid item xs={7} sm={2}>
											<TextField
												required
												fullWidth
												autoComplete="123"
												helperText="Monto total"
												className={classes.campoPaper}
											/>
										</Grid>
									</Grid>
								</Paper>
							</Grid>
							<Grid item xs={12} sm={3}>
								<FormControlLabel
									control={<Checkbox />}
									label='CD'
									className={classes.campo}
								/>
								<Button
									variant="contained"
									color="primary"
									onClick={() => abrirModal()}>
									Datos de liquidación
										</Button>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Tipo operación"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography variant='body1' className={classes.texto}>
									Ninguno
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6} />
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Tipo bien"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography variant='body1' className={classes.texto}>
									Ninguno
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6} />
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Tipo servicio"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Typography variant='body1' className={classes.texto}>
									Ninguno
								</Typography>
							</Grid>
							<Grid item xs={12} sm={6} />
							<Grid item xs={12} sm={3}>
								<FormControlLabel
									control={<Checkbox />}
									label='Spot'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3} />
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Valor referencial"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Detracción S/"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<FormControlLabel
									control={<Checkbox />}
									label='Autodetracción'
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3} />
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="% Detracción"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText="Detracción US$"
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Button
									variant="contained"
									color="primary"
									onClick={() => abrirModalPeriodo()}>
									Cambio periodo
								</Button>
							</Grid>
							<Grid item xs={12} sm={3} />
							<Grid item xs={12} sm={3}>
								<Button
									variant="contained"
									color="primary"
									onClick={() => alert('XML')}>
									XML
								</Button>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Button
									variant="contained"
									color="primary"
									onClick={() => alert('PDF')}>
									PDF
								</Button>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Button
									variant="contained"
									color="primary"
									className={classes.campo}
									onClick={() => abrirModalProvision()}>
									Provisión
								</Button>
							</Grid>
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText=" "
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText=" "
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={2}>
								<TextField
									required
									fullWidth
									autoComplete="123"
									helperText=" "
									className={classes.campo}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<Button
									variant="contained"
									color="primary"
									className={classes.campo}
									onClick={() => abrirModalRecepcion()}>
									Recepción
								</Button>
							</Grid>
						</Grid>
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}