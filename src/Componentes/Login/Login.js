import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { consumeWS } from '../Config/WebService';
import { Redirect } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import { red } from '@material-ui/core/colors';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';

const variantIcon = {
	success: ErrorIcon
}

function Login() {
	const [login, setLogin] = React.useState({})
	const [redireccionar, setRedireccionar] = React.useState(false)
	const [openMensaje, setOpenMensaje] = React.useState(false);

	React.useEffect(() => {
	}, []);

	const Ingresar = () => {
		if (login) {

			consumeWS('POST', 'token', login, '')
				.then(result => {
					if (result) {
						localStorage.setItem('Token', JSON.stringify(result));
						setRedireccionar(true);
					}
				})
				.catch(() => {
					setOpenMensaje(true)
				});
		}
	}

	const onChange = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value
		})
	}

	const Enter = (e) => {
		if (e.keyCode === 13) {
			Ingresar()
		}
	}

	const Copyright = () => {
		return (
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="http://newtransport.net" target='_blank'>
					GNT - T.I.
		  </Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	}

	const useStyles = makeStyles(theme => ({
		paper: {
			marginTop: theme.spacing(8),
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
		},
		avatar: {
			margin: theme.spacing(1),
			backgroundColor: theme.palette.primary.main,
		},
		form: {
			width: '100%',
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
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

	const classes = useStyles();

	const handleCloseMensaje = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpenMensaje(false);
	}

	if (redireccionar === true) {
		return (<Redirect to='/inicio' />)
	}

	if (localStorage.getItem('Token')) {
		return (<Redirect to='/inicio' />)
	}

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<Snackbar
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'left',
				}}
				open={openMensaje}
				autoHideDuration={6000}
				onClose={handleCloseMensaje}>
				<MySnackbarContentWrapper
					onClose={handleCloseMensaje}
					variant="success"
					message="Nickname o contraseña incorrectos!" />
			</Snackbar>
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Login
        		</Typography>

				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					id="nickname"
					label="Nickname"
					name="nickname"
					autoComplete="nickname"
					autoFocus
					onChange={onChange.bind()} />
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Password"
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={onChange.bind()}
					onKeyDown={Enter.bind()} />
				<Button
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={() => Ingresar()}>
					Ingresar
          		</Button>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default Login;