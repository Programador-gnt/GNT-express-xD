import React from 'react';

const Inicio = React.lazy(() => import('./Componentes/Inicio/Inicio'));
const Anexo = React.lazy(() => import('./Componentes/Anexo/Lista de Anexos/Anexos'));

const routes = [
	{ id: '0', path: '/', exact: true, name: 'Inicio' },
	{ id: '1', path: '/inicio', name: 'Inicio', component: Inicio },
	{ id: '2', path: '/smnuAnexo', exact: true, name: 'Lista de Anexos', component: Anexo },
];

export default routes;