import React from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow'

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(10),
	},
	paper: {
		zIndex: 1,
		position: 'relative',
		margin: theme.spacing(10)
	},
	tableWrapper: {
		height: '100%',
		overflow: 'auto',
	}
}));

const columns = [
	{ id: 'id_anexo', label: 'ID', minWidth: 170 },
	{ id: 'nm_anexo', label: 'Nombre', minWidth: 100 },
	{
		id: 'nm_alias',
		label: 'Alias',
		minWidth: 170,
		align: 'right',
		format: value => value.toLocaleString(),
	},
	{
		id: 'tdocumento',
		label: 'Tipo de Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toLocaleString(),
	},
	{
		id: 'ruc',
		label: 'N° Documento',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
	{
		id: 'nomestado',
		label: 'Estado',
		minWidth: 170,
		align: 'right',
		format: value => value.toFixed(2),
	},
];

function createData(id_anexo, nm_anexo, nm_alias, tdocumento, ruc, nomestado) {
	return { id_anexo, nm_anexo, nm_alias, tdocumento, ruc, nomestado };
}

const rows = [
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
	createData('0', 'Samuel Bustamante', 'Samuel Momoa', 'RUC', 15604401990, 'Activo'),
	createData('1', 'Alexander Rodriguez', 'ARodriguez', 'RUC', 12366601666, 'Activo'),
	createData('2', 'Jorge Sevillano', 'George', 'RUC', 15604401990, 'Inactivo'),
];

export default function Anexos() {
	const classes = useStyles();
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(50);
	const [lista, setLista] = React.useState([])
	const [filtro, setFiltro] = React.useState({
		page: 1,
		rows: 50,
		id_empresa: "1",
		id_anexo: 0,
		nm_anexo: "",
		nm_alias: "",
		tdocumento: "",
		ruc: "",
		nomestado: "",
		sortcolumn: "",
		sortorder: "desc"
	})

	const handleChangePage = (event, newPage) => {
		setFiltro({
			...filtro,
			page: newPage
		});
	};

	const handleChangeRowsPerPage = event => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
				<Paper elevation={4} className={classes.root}>
					<div className={classes.tableWrapper}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{columns.map(column => (
										<TableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
										>
											{column.label}
										</TableCell>
									))}
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
											{columns.map(column => {
												const value = row[column.id];
												return (
													<TableCell key={column.id} align={column.align}>
														{column.format && typeof value === 'number' ? column.format(value) : value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</div>
					<TablePagination
						rowsPerPageOptions={[5, 10, 20, 40, 50]}
						component="div"
						count={rows.length}
						rowsPerPage={filtro.rows}
						page={filtro.page}
						backIconButtonProps={{
							'aria-label': 'Página anterior',
						}}
						nextIconButtonProps={{
							'aria-label': 'Siguiente página',
						}}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Paper>
			</Slide>
		</React.Fragment>
	);
}