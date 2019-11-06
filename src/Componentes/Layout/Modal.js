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
	}
}));

export default function ModalPanel(props) {
	const [tdocumento, setTdocumento] = React.useState([
		{ id_tdocumento: '01', alias: 'RUC' },
		{ id_tdocumento: '02', alias: 'Nombre' },
		{ id_tdocumento: '03', alias: 'Alias' }
	])
	const [proveedor, setProveedor] = React.useState({
		id_tdocumento: '01'
	})
	const classes = useStyles();

	const onChange = (e) => {
		setProveedor({
			...proveedor,
			[e.target.name]: e.target.value
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
							{props.titulo}
						</Typography>
						<Grid item xs={12}>
							<TextField
								required
								id="id_tdocumento"
								fullWidth
								select
								value={proveedor.id_tdocumento}
								onChange={onChange.bind()}
								name='id_tdocumento'
								margin="normal">
								{tdocumento.map(documento => (
									<MenuItem key={documento.id_tdocumento} value={documento.id_tdocumento}>{documento.alias}</MenuItem>
								))}
							</TextField>
						</Grid>
					</div>
				</Fade>
			</Modal>
		</React.Fragment>
	);
}