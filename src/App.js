import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Cargando...</div>;

const Login = React.lazy(() => import('./Componentes/Login/Login'));
const Layout = React.lazy(() => import('./Componentes/Layout/Layout'));

class App extends Component {

	render() {
		return (
			<HashRouter>
				<React.Suspense fallback={loading()}>
					<Switch>
						<Route exact path='/login' name='Login' render={props => <Login {...props} />} />
						<Route path='/' name='Inicio' render={props => <Layout {...props} />}/>
					</Switch>
				</React.Suspense>
			</HashRouter>
		);
	}
}

export default App;
