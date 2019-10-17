import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './App.css';

const loading = () => <div className="animated fadeIn pt-3 text-center">Cargando...</div>;

const SignIn = React.lazy(() => import('./Componentes/SignIn'));

class App extends Component {

	render() {
		return (
			<HashRouter>
				<React.Suspense fallback={loading()}>
					<Switch>
						<Route path="/" name="SignIn" render={props => <SignIn {...props} />} />
					</Switch>
				</React.Suspense>
			</HashRouter>
		);
	}
}

export default App;
