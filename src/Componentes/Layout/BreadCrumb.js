import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(1, 2),
	},
	link: {
		display: 'flex',
	},
	icon: {
		marginRight: theme.spacing(0.5),
		width: 20,
		height: 20,
	},
}));

export default function BreadCrumbs() {
	const classes = useStyles();

	return (
		<Paper elevation={0} className={classes.root}>
			<Breadcrumbs aria-label="breadcrumb">
				<Link color="inherit" href="/" className={classes.link}>
					<HomeIcon className={classes.icon} />
					Inicio
        </Link>
			</Breadcrumbs>
		</Paper>
	);
}