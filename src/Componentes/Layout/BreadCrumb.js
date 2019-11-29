import React from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { Route } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	crumb: {
		marginLeft: theme.spacing(1)
	}
}));

export default function Breadcrumb() {
	const classes = useStyles()
	return <Route>
		{
			({ location }) => {
				const pathnames = location.pathname.split('/').filter(x => x);
				return (
					<Breadcrumbs aria-label="Breadcrumb" className={classes.crumb}>
						<RouterLink style={{ color: 'inherit' }} to="/inicio">
							<HomeIcon />
						</RouterLink>
						{pathnames.map((value, index) => {
							const last = index === pathnames.length - 1;
							const to = `/${pathnames.slice(0, index + 1).join('/')}`;

							return last ? (
								<Typography variant='body1' key={to}>
									{value === 'smnuAnexo' ? 'Lista de anexos' : value === 'sssmnuCTBCompra' ? 'Lista registro de compra' : value === 'editar' ? 'Anexo' : value === 'editarCompra' ? 'Registro de compra' : value}
								</Typography>
							) : (
									<RouterLink variant='body1' to={to} key={to}>
										{value === 'smnuAnexo' ? 'Lista de anexos' : value === 'sssmnuCTBCompra' ? 'Lista registro de compra' : value === 'editar' ? 'Anexo' : value === 'editarCompra' ? 'Registro de compra' : value}
									</RouterLink>
								);
						})}
					</Breadcrumbs>
				);
			}
		}
	</Route>

}