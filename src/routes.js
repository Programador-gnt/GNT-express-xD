import React from 'react';

const Inicio = React.lazy(() => import('./Componentes/Inicio/Inicio'));
const Anexo = React.lazy(() => import('./Componentes/Anexo/Lista de Anexos/Anexos'));

const routes = [
	{ path: '/', exact: true, name: 'Inicio' },
	{ path: '/inicio', name: 'Inicio', component: Inicio },
	{ path: '/smnuAnexo', exact: true, name: 'Lista de Anexos', component: Anexo },
];

export default routes;