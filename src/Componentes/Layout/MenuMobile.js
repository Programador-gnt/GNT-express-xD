import React, { Fragment } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import MetisMenu from 'react-metismenu';
import './MenuMobile.css';
import Config from '../Config/Config';

function MenuMobile(props) {
	const [menu, setMenu] = React.useState([])

	const consultarapi = async (token) => {
		await fetch(`${Config.url}api/menu/treelistar`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`
			}
		})
			.then(response => {
				if (response.status === 401) {
					return props.history.push('/401')
				} else {
					return response.json();
				}
			})
			.then(json => {
				setMenu(obtenerMenus(json))
			})
	}

	function obtenerMenus(menu) {
		let menuLista = [];
		let icono
		if (menu) {
			menu.forEach(function (menuItem) {
				let menuItemChildren = [];


				if (menuItem.children.length > 0) {
					menuItemChildren = obtenerMenus(menuItem.children);
					icono = " fa fa-folder ";

				} if (menuItem.name === "Inicio") {
					icono = " fa fa-home ";
				}

				let menuNew = {
					"label": menuItem.name,
					"icon": icono,
					"to": "#" + menuItem.url,
					"content": menuItemChildren
				}
				menuLista.push(menuNew);
			});
			return menuLista;
		}
	}

	const iniciar = () => {
		if (localStorage.getItem('Token') === null) {

		} else {
			var datos = JSON.parse(localStorage.getItem("Token"));
			var token = datos.accessToken
			consultarapi(token)
		}
	}

	React.useEffect(iniciar, [])

	var menuclases = 'menumobile';
	if (props.mostrar) {
		menuclases = 'menumobile open';
	}

	return (
		<div className={menuclases}>
			<Fragment>
				<MetisMenu content={menu} activeLinkFromLocation classNameStateIcon="pe-7s-angle-down" />
			</Fragment>
		</div>
	);

}
export default withRouter(MenuMobile);