import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Fade from '@material-ui/core/Fade';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import SearchIcon from '@material-ui/icons/Search';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import consumeWS from '../Config/WebService';

const useStyles = makeStyles(theme => ({
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
	boton: {
		marginTop: theme.spacing(1)
	},
	lista: {
		widht: '100%',
		position: 'relative',
		maxHeight: 300,
		overflow: 'auto'
	},
	item: {
		'&:focus': {
			background: "rgba(74, 78, 178, 0.914)",
			color: 'white',
			boxShadow: theme.shadows[8]
		}
	}
}));

export default function ModalPanel(props) {
	const classes = useStyles();
	const [tdocumento, setTdocumento] = React.useState([
		{ id_tdocumento: 1, alias: 'RUC' },
		{ id_tdocumento: 2, alias: 'Nombre' },
		{ id_tdocumento: 3, alias: 'Alias' }
	])
	const [proveedor, setProveedor] = React.useState({
		tipo: props.tipo === 'PRV' ? 'PRV' : '',
		campo: 1,
		categoria: '',
		texto: ''
	})
	const [listaProveedores, setListaProveedores] = React.useState([])
	var numero = 0

	React.useEffect(() => {
		buscarProveedor()
	}, []);

	const onChange = (e) => {
		setProveedor({
			...proveedor,
			[e.target.name]: e.target.value
		})
	}

	const tecla = (e) => {
		if (e.keyCode === 40) {
			document.getElementById(numero > listaProveedores.length ? numero = numero - 1 : numero === listaProveedores.length ? numero = listaProveedores.length : numero === 0 ? numero = numero + 1 : numero = numero + 1).focus()
		}

		if (e.keyCode === 38) {
			document.getElementById(numero === 0 ? numero = 0 : numero === listaProveedores.length ? numero = numero - 1 : numero = numero - 1).focus()
		}
	}

	const enterSelect = (e) => {
		if (e.keyCode === 13) {
			document.getElementById('texto').focus()
		}
	}

	const arrowDownCampo = (e) => {
		setProveedor({
			...proveedor,
			[e.target.name]: e.target.value
		})
		buscarProveedor()
		if (e.keyCode === 40) {
			document.getElementById(0).focus()
		}

		if (e.keyCode === 13) {
			buscarProveedor()
		}
	}

	const buscarProveedor = () => {
		consumeWS('GET', 'api/ayudabusqueda/listar', '', `?tipo=${proveedor.tipo}&categoria=${proveedor.categoria}&campo=${proveedor.campo}&texto=${proveedor.texto}`)
			.then(result => {
				setListaProveedores(result)
			})
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Modal
				aria-labelledby='transition-modal-title'
				aria-describedby="transition-modal-description"
				className={classes.modal}
				open={props.abrir}
				onClose={props.funcion}
				closeAfterTransition
				BackdropComponent={Backdrop}
				BackdropProps={{ timeout: 500 }}>
				<Fade in={props.abrir}>
					<div className={classes.estiloModal}>
						<Typography variant="h6">
							{props.tipo === 'PRV' ? 'Busqueda de Proveedores' : ''}
						</Typography>
						{props.tipo === 'PRV' ?
							<Grid container spacing={3}>
								<Grid item xs={12} sm={2}>
									<TextField
										autoFocus
										required
										id="campo"
										fullWidth
										select
										value={proveedor.campo}
										onKeyDown={enterSelect.bind()}
										onChange={onChange.bind()}
										name='campo'
										margin="normal">
										{tdocumento.map(documento => (
											<MenuItem key={documento.id_tdocumento} value={documento.id_tdocumento}>{documento.alias}</MenuItem>
										))}
									</TextField>
								</Grid>
								<Grid item xs={12} sm={4}>
									<TextField
										required
										id="texto"
										fullWidth
										onKeyDown={arrowDownCampo.bind()}
										onChange={onChange.bind()}
										name='texto'
										label={proveedor.campo === 1 ? 'Ruc' : proveedor.campo === 2 ? 'Nombre' : proveedor.campo === 3 ? 'Alias' : ''} />
								</Grid>
								<Grid item xs={12} sm={6}>
									<Fab size="small" color='primary' className={classes.boton} onClick={() => buscarProveedor()}>
										<SearchIcon />
									</Fab>
								</Grid>
								<Grid item xs={12}>
									<List className={classes.lista} onKeyDown={tecla.bind()}>
										{listaProveedores.length ?
											listaProveedores.map((item, index) => (
												<ListItem button className={classes.item} id={index} key={index} onClick={() => props.capturarProveedor(item.id_anexo, item.nm_anexo)}>
													<ListItemText primary={`${item.id_anexo}  ${item.tipo_documento}  ${item.nm_anexo}`} />
												</ListItem>
											))
											: <ListItem id={0} key={0}>
												<ListItemText primary='No hay nada para mostrar' />
											</ListItem>
										}
									</List>
								</Grid>
							</Grid>
							: null}
					</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
}