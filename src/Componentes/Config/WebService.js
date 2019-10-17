import Config from './Config';

export function consumeWS(Metodo, Url, ParametrosPOST, parametrosGET) {
	let dato = ''
	let token = '';

	if (localStorage.getItem("Token")) {
		dato = JSON.parse(localStorage.getItem("Token"));
		token = dato.accessToken
	}

	let peticion = {}
	let url_ws = `${Config.url}${Url}${parametrosGET}`;

	if (Metodo === 'POST') {
		peticion = {
			method: Metodo,
			body: JSON.stringify(ParametrosPOST),
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${token}`
			}
		}
	}

	if (Metodo === 'GET') {
		peticion = {
			method: Metodo,
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${token}`
			}
		}
	}

	if (Url === 'api/anexo/eliminar') {
		peticion = {
			method: 'POST',
			headers: {
				"Content-type": "application/json; charset=UTF-8",
				Authorization: `Bearer ${token}`
			}
		}
	}

	return new Promise(async (resolve, reject) => {

		await fetch(url_ws, peticion)
			.then(response => response.json())
			.then(res => {
				resolve(res);
			})
			.catch(error => {
				reject(error);
			});
	});
};

export default consumeWS;