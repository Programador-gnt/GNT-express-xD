import React from 'react';
import Cabecera from './Cabecera';
import Paper from '@material-ui/core/Paper';
import { Redirect, Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import Footer from './Footer'

function Layout() {

	React.useEffect(() => {
	}, []);

	return (
		<div>
			<Paper elevation={4}>
				<Cabecera />
			</Paper>
			<main>
				<Switch>
					{routes.map((route, idx) => {
						return route.component ? (
							<Route
								key={idx}
								path={route.path}
								exact={route.exact}
								name={route.name}
								render={props => (
									<route.component {...props} />
								)} />
						) : (null);
					})}
					<Redirect to="/" />
				</Switch>
			</main>
			<Footer />
		</div>
	);
}
export default Layout;