import React from 'react';

const Inicio = React.lazy(() => import('./Componentes/Inicio/Inicio'));
const Anexo = React.lazy(() => import('./Componentes/Anexo/Lista de Anexos/Anexos'));
const EditarAnexo = React.lazy(() => import('./Componentes/Anexo/Editar Anexo/EditarAnexo'));
const NuevoAnexo = React.lazy(() => import('./Componentes/Anexo/Nuevo Anexo/NuevoAnexo'));
const Compra = React.lazy(() => import('./Componentes/Compra/Compra'));
const ModificarCompra = React.lazy(() => import('./Componentes/Compra/ModificarCompra'))

const routes = [
	{ id: '0', path: '/', exact: true, name: 'Inicio' },
	{ id: '1', path: '/inicio', name: 'Inicio', component: Inicio },
	{ id: '2', path: '/smnuAnexo', exact: true, name: 'Lista de Anexos', component: Anexo },
	{ id: '3', path: '/smnuAnexo/editar', name: 'Editar Anexo', component: EditarAnexo },
	{ id: '4', path: '/smnuAnexo/nuevo', name: 'Nuevo Anexo', component: NuevoAnexo },
	{ id: '5', path: '/sssmnuCTBCompra', exact: true, name: 'Registro de Compra', component: Compra },
	{ id: '6', path: '/sssmnuCTBCompra/editarCompra', name: 'Modificar', component: ModificarCompra },
];

export default routes;