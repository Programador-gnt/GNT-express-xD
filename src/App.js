import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const loading = () => <div>Cargando...</div>;

function App() {

	const Login = React.lazy(() => import('./Componentes/Login/Login'));
	const Layout = React.lazy(() => import('./Componentes/Layout/Layout'));

	return (
		<HashRouter>
			<React.Suspense fallback={loading()}>
				<Switch>
					<Route exact path='/login' name='Login' render={props => <Login {...props} />} />
					<Route path='/' name='Inicio' render={props => <Layout {...props} />} />
				</Switch>
			</React.Suspense>
		</HashRouter>
	);
}
export default App;
