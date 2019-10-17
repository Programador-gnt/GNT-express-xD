import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function SignIn() {
	const [login, setLogin] = React.useState({});

	const Mensaje = () => {
		console.log(login)
	}

	const onChange = (e) => {
		setLogin({
			...login,
			[e.target.name]: e.target.value
		})
	}

	const Copyright = () => {
		return (
			<Typography variant="body2" color="textSecondary" align="center">
				{'Copyright © '}
				<Link color="inherit" href="https://google.com/">
					Metodo de Pago
		  </Link>{' '}
				{new Date().getFullYear()}
				{'.'}
			</Typography>
		);
	}

	const useStyles = makeStyles(theme => ({
		'@global': {
			body: {
				backgroundColor: theme.palette.common.white,
			},
		},
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

	React.useEffect(() => {
	}, []);

	return (
		<Container component="main" maxWidth="xs">
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
					id="email"
					label="Email"
					name="email"
					autoComplete="email"
					autoFocus
					onChange={onChange.bind()}
				/>
				<TextField
					variant="outlined"
					margin="normal"
					required
					fullWidth
					name="password"
					label="Contraseña"
					type="password"
					id="password"
					autoComplete="current-password"
					onChange={onChange.bind()}
				/>
				<Button
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={() => Mensaje()}
				>
					Ingresar
          </Button>
				<Grid container>
					<Grid item>
						<Link href="#" variant="body2">
							{"No posees cuenta? Registrate"}
						</Link>
					</Grid>
				</Grid>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
		</Container>
	);
}

export default SignIn;