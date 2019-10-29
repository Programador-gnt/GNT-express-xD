import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { Redirect } from 'react-router-dom';
import MenuMobile from './MenuMobile';
import Opacidad from './FondoOpacidad';
import HamburgerMenu from './Hamburg';
import consumeWS from '../Config/WebService';

const useStyles = makeStyles(theme => ({
	root: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		flexGrow: 1
	}
}));

export default function MenuAppBar() {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [salir, setSalir] = React.useState(false)
	const [showMenu, setShowMenu] = React.useState(false)
	const [abrir, setAbrir] = React.useState(false)
	const [perfil, setPerfil] = React.useState({})
	const open = Boolean(anchorEl);

	React.useEffect(() => {
		if (localStorage.getItem('Token') === null) {

		} else {
			consultarPerfil()
		}
	}, []);

	const consultarPerfil = () => {
		consumeWS('GET', 'api/usuario/obtener', '', '')
			.then(result => {
				setPerfil(result)
			});
	}

	const handleMenu = event => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
		setSalir(true)
		localStorage.clear()
	};

	const Abrir = () => {
		setShowMenu(!showMenu)
		setAbrir(!abrir)
	}

	if (salir === true) {
		return (<Redirect to='/login' />)
	}

	if (localStorage.getItem('Token') === null) {
		return (<Redirect to='/login' />)
	}

	var opacidad;
	if (showMenu) {
		opacidad = <Opacidad onClick={() => setShowMenu(false)} />;
	}

	return (
		<div className={classes.root}>
			<AppBar>
				<Toolbar>
					<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
						<HamburgerMenu
							isOpen={abrir}
							menuClicked={() => Abrir()}
							width={18}
							height={15}
							strokeWidth={1}
							rotate={0}
							color='white'
							borderRadius={0}
							animationDuration={0.5} />
					</IconButton>
					<Typography variant="h6" noWrap>
						NEW TRANSPORT S.A.
          			</Typography>
					<Typography variant="h6" className={classes.title}>

					</Typography>
					<div>
						<IconButton
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<Avatar alt="..." src={perfil.nombre === 'Samuel Bustamante' ? 'https://i.imgur.com/qSZaqys.jpg' : perfil.foto} />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={open}
							onClose={() => setAnchorEl(null)}>
							<MenuItem disabled><em>{perfil.nombre}</em></MenuItem>
							<MenuItem onClick={handleClose}>Cerrar Sesión</MenuItem>
						</Menu>
					</div>
				</Toolbar>
			</AppBar>
			<MenuMobile mostrar={showMenu} />
			{opacidad}
		</div>
	);
}