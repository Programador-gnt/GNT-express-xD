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
import ListItemText from '@material-ui/core/ListItemText'

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
	const [listaProveedores, setListaProveedores] = React.useState([
		{ id: 1, codigo: 10741, nombre: 'Samuel' },
		{ id: 2, codigo: 20852, nombre: 'Enmanuel' },
		{ id: 3, codigo: 30963, nombre: 'Luis' },
		{ id: 4, codigo: 40147, nombre: 'Xiomara' },
		{ id: 5, codigo: 50259, nombre: 'Juan' },
		{ id: 6, codigo: 60987, nombre: 'Alex' },
		{ id: 7, codigo: 70123, nombre: 'Jorge' },
		{ id: 8, codigo: 80852, nombre: 'Wilder' }
	])
	var numero = 1

	const onChange = (e) => {
		setProveedor({
			...proveedor,
			[e.target.name]: e.target.value
		})
	}

	const tecla = (e) => {
		if (e.keyCode === 40) {
			document.getElementById(numero === listaProveedores.length ? listaProveedores.length : numero = numero + 1).focus()
		}

		if (e.keyCode === 38) {
			document.getElementById(numero === 1 ? 1 : numero = numero - 1).focus()
		}
	}

	const enterSelect = (e) => {
		if (e.keyCode === 13) {
			document.getElementById('campobusqueda').focus()
		}
	}

	const arrowDownCampo = (e) => {
		if (e.keyCode === 40) {
			document.getElementById(1).focus()
		}
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Modal
				// onKeyDown={tecla.bind()}
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
								<Grid item xs={12} sm={4}>
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
								<Grid item xs={12} sm={6}>
									<TextField
										required
										id="texto"
										fullWidth
										onKeyDown={arrowDownCampo.bind()}
										onChange={onChange.bind()}
										name='texto'
										label={proveedor.campo === 1 ? 'Ruc' : proveedor.campo === 2 ? 'Nombre' : proveedor.campo === 3 ? 'Alias' : ''} />
								</Grid>
								<Grid item xs={12} sm={2}>
									<Fab size="small" color='primary' className={classes.boton}>
										<SearchIcon />
									</Fab>
								</Grid>
								<Grid item xs={12}>
									<List className={classes.lista} onKeyDown={tecla.bind()}>
										{listaProveedores.map(item => (
											<ListItem button className={classes.item} id={item.id} key={item.id} onClick={() => props.capturarProveedor(item.codigo, item.nombre)}>
												<ListItemText primary={`${item.codigo}  ${item.nombre}`} />
											</ListItem>
										))}
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