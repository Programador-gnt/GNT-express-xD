import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';

const loading = () => {
	return (
		<Box position="absolute" top="50%" left="50%">
			<CircularProgress />
		</Box>
	);
}

function App() {

	const Login = React.lazy(() => import('./Componentes/Login/Login'));
	const Layout = React.lazy(() => import('./Componentes/Layout/Layout'));
	const Page401 = React.lazy(() => import('./Componentes/401/401'))

	return (
		<HashRouter>
			<React.Suspense fallback={loading()}>
				<Switch>
					<Route exact path='/login' name='Login' render={props => <Login {...props} />} />
					<Route exact path='/401' name='401' render={props => <Page401 {...props} />} />
					<Route path='/' name='Inicio' render={props => <Layout {...props} />} />
				</Switch>
			</React.Suspense>
		</HashRouter>
	);
}
export default App;
