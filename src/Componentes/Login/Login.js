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
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import 'react-s-alert/dist/s-alert-css-effects/scale.css';
import 'react-s-alert/dist/s-alert-css-effects/flip.css';
import 'react-s-alert/dist/s-alert-css-effects/jelly.css';
import 'react-s-alert/dist/s-alert-css-effects/stackslide.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';
import 'react-s-alert/dist/s-alert-css-effects/bouncyflip.css';
import { Redirect } from 'react-router-dom'

function Login() {
	const [login, setLogin] = React.useState({})
	const [redireccionar, setRedireccionar] = React.useState(false)

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
					Alert.error('Nickname o contraseña incorrectas', {
						position: 'top-right',
						effect: 'stackslide'
					})
				});
		}
	}

	const onChange = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value
		})
	}

	const Enter =(e)=>{
		if (e.keyCode === 13) {
			Ingresar()
		}
	}

	const Copyright = () => {
		return (
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="https://newtransport.net/">
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
			backgroundColor: theme.palette.secondary.main,
		},
		form: {
			width: '100%',
			marginTop: theme.spacing(1),
		},
		submit: {
			margin: theme.spacing(3, 0, 2),
		},
	}));

	const classes = useStyles();

	if (redireccionar === true) {
		return (<Redirect to='/inicio'/>)
	}

	if (localStorage.getItem('Token')) {
		return (<Redirect to='/inicio'/>)
	}

	return (
		<Container component="main" maxWidth="xs">
			<Alert stack={true} timeout={3500} />
			<CssBaseline />
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
					onChange={onChange.bind()}
				/>
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
					onKeyDown={Enter.bind()}
				/>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={() => Ingresar()}
				>
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