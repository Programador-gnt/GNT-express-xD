import React from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import consumeWS from '../../Config/WebService';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { fileURLToPath } from 'url';

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
		overflow: 'auto'
	},
	modal: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
	},
	estiloModal: {
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
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

const StyledTableCell = withStyles(theme => ({
	head: {
		backgroundColor: '#4a48b2',
		color: theme.palette.common.white,
		cursor: 'pointer'
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);


export default function Anexos() {
	const classes = useStyles();
	const page = 0
	const rowsPerPage = 50
	const [rows, setRows] = React.useState([])
	const [openNombre, setOpenNombre] = React.useState(false)
	const [total, setTotal] = React.useState(0)
	const [filtro, setFiltro] = React.useState({
		page: 1,
		rows: 50,
		id_empresa: 1,
		id_anexo: 0,
		nm_anexo: "",
		nm_alias: "",
		tdocumento: "",
		ruc: "",
		nomestado: "",
		sortcolumn: "",
		sortorder: "desc"
	})

	React.useEffect(() => {
		consultaAnexo()
		conteo()
	}, []);

	const consultaAnexo = async () => {
		consumeWS('POST', 'api/anexo/examinar', filtro, '')
			.then(result => {
				setRows(result)
			});
	}

	const conteo = async () => {
		consumeWS('POST', 'api/anexo/examinarcontador', filtro, '')
			.then(result => {
				setTotal(result)
			});
	}

	const handleChangeRowsPerPage = event => {
		filtro.rows = event.target.value
		consultaAnexo()
	};

	const handleChangePage = (event, newPage) => {
		filtro.page = newPage + 1
		consultaAnexo()
	}

	const handleNombre = () => {
		setOpenNombre(!openNombre)
	}

	const handleClose=()=>{
		setOpenNombre(false)
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}>
				<Paper elevation={4} className={classes.root}>
					<Modal
						aria-labelledby='transition-modal-title'
						aria-describedby="transition-modal-description"
						className={classes.modal}
						open={openNombre}
						onClose={handleClose}
						closeAfterTransition
						BackdropComponent={Backdrop}
						BackdropProps={{ timeout: 500 }}>
						<Fade in={openNombre}>
							<div className={classes.estiloModal}>
								<h2 id="transition-modal-title">Buscar</h2>
								<p id="transition-modal-description">por nombre</p>
							</div>
						</Fade>
					</Modal>
					<div className={classes.tableWrapper}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									{/* {columns.map(column => (
										<StyledTableCell
											key={column.id}
											align={column.align}
											style={{ minWidth: column.minWidth }}
											onClick={handleModal}>
											{column.label}
										</StyledTableCell>
									))} */}
									<StyledTableCell key={1}>ID</StyledTableCell>
									<StyledTableCell key={2} onClick={handleNombre}>Nombre</StyledTableCell>
									<StyledTableCell key={3} align='right'>Alias</StyledTableCell>
									<StyledTableCell key={4} align='right'>Tipo de Documento</StyledTableCell>
									<StyledTableCell key={5} align='right'>N° Documento</StyledTableCell>
									<StyledTableCell key={6} align='right'>Estado</StyledTableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
									return (
										<TableRow hover tabIndex={-1} key={row.code}>
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
						rowsPerPageOptions={[10, 25, 50]}
						component="TableCell"
						count={total}
						rowsPerPage={filtro.rows}
						page={0}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						labelRowsPerPage={'Items por página'}
						labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
					/>
				</Paper>
			</Slide>
		</React.Fragment>
	);
}