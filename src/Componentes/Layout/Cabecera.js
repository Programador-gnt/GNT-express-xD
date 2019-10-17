import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import HamburgerMenu from './Hamburg';
import IconButton from '@material-ui/core/IconButton';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import { Redirect } from 'react-router-dom'

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
	},
	drawerPaper: {
		width: drawerWidth,
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
	},
	toolbar: theme.mixins.toolbar,
	margin: {
		margin: theme.spacing(2),
		color: 'white',
		position: 'absolute',
		top: -5,
		right: 0
	}
}));

export default function Cabecera() {
	const [open, setOpen] = React.useState(false)
	const classes = useStyles();

	const toggleMenu = () => {
		setOpen(!open)
	}

	const cerrarSesion = () => {
		localStorage.clear()
	}

	if (localStorage.getItem('Token') === null) {
		return (<Redirect to='/login' />)
	}

	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar>
					<HamburgerMenu
						isOpen={open}
						menuClicked={() => toggleMenu()}
						width={18}
						height={15}
						strokeWidth={1}
						rotate={0}
						color='white'
						borderRadius={0}
						animationDuration={0.5} />
					<IconButton aria-label="4 pending messages" className={classes.margin} onClick={() => cerrarSesion()}>
						<ExitToAppOutlinedIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
}