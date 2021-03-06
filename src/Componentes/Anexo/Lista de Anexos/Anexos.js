import React from 'react';
import Paper from '@material-ui/core/Paper';
// import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
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
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import ErrorIcon from '@material-ui/icons/Error';
import { red, green } from '@material-ui/core/colors';
import clsx from 'clsx';
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom';
import SpeedDial from '@material-ui/lab/SpeedDial';
import MenuIcon from '@material-ui/icons/Menu';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Redirect } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import PrintIcon from '@material-ui/icons/Print';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import { saveAs } from 'file-saver';
import Fab from '@material-ui/core/Fab';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';

const variantIcon = {
	error: ErrorIcon,
	success: CheckCircleIcon
}

const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(12),
	},
	paper: {
		zIndex: 1,
		position: 'relative',
		margin: theme.spacing(10)
	},
	tableWrapper: {
		maxHeight: '78%',
		overflow: 'auto',
		position: 'fixed',
		width: '100%',
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
	},
	error: {
		backgroundColor: red[600],
	},
	success: {
		backgroundColor: green[600],
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	icon: {
		fontSize: 20,
	},
	message: {
		display: 'flex',
		alignItems: 'center',
	},
	back: {
		transform: 'translateZ(0px)',
		position: 'fixed',
		zIndex: 100
	},
	speedDial: {
		position: 'fixed',
		bottom: theme.spacing(8),
		right: theme.spacing(2),
	},
	celdas: {
		width: '5px'
	},
	tablecell: {
		backgroundColor: '#4a48b2',
		color: theme.palette.common.white,
		cursor: 'pointer'
	}
}));

function MySnackbarContentWrapper(props) {
	const classes = useStyles();
	const { className, message, onClose, variant, ...other } = props;
	const Icon = variantIcon[variant];

	return (
		<SnackbarContent
			className={clsx(classes[variant], className)}
			aria-describedby="client-snackbar"
			message={
				<span id="client-snackbar" className={classes.message}>
					<Icon className={clsx(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
					<CloseIcon className={classes.icon} />
				</IconButton>,
			]}
			{...other}
		/>
	);
}

const columns = [
	{ id: 'id_anexo', label: 'ID', minWidth: 170 },
	{ id: 'nm_anexo', label: 'Nombre', minWidth: 100 },
	{
		id: 'nm_alias',
		label: 'Alias',
		minWidth: 170,
		align: 'left',
		format: value => value.toLocaleString(),
	},
	{
		id: 'tdocumento',
		label: 'Tipo de Documento',
		minWidth: 170,
		align: 'left',
		format: value => value.toLocaleString(),
	},
	{
		id: 'ruc',
		label: 'N° Documento',
		minWidth: 170,
		align: 'left',
		format: value => value.toFixed(2),
	},
	{
		id: 'nomestado',
		label: 'Estado',
		minWidth: 170,
		align: 'left',
		format: value => value.toFixed(2),
	},
];


export default function Anexos() {
	const classes = useStyles();
	const page = 0
	const rowsPerPage = 50
	const [rows, setRows] = React.useState([])
	const [openNombre, setOpenNombre] = React.useState(false)
	const [openId, setOpenId] = React.useState(false)
	const [openAlias, setOpenAlias] = React.useState(false)
	const [opentdocumento, setOpentdocumento] = React.useState(false)
	const [openNDocumento, setOpenNDocumento] = React.useState(false)
	const [total, setTotal] = React.useState(0)
	const [filtro, setFiltro] = React.useState({
		page: 1,
		rows: 50,
		id_empresa: 1,
		id_anexo: 0,
		nm_anexo: "",
		nm_anexo_tb: "0",
		nm_alias_tb: "0",
		nm_alias: "",
		tdocumento: "",
		tdocumento_tb: "0",
		ruc: "",
		ruc_tb: "0",
		nomestado: "",
		nomestado_tb: "0",
		sortcolumn: "",
		sortorder: "desc"
	})
	const [openMensajeError, setOpenMensajeError] = React.useState(false);
	const [mensaje, setMensaje] = React.useState({})
	const [open, setOpen] = React.useState(false);
	const [nuevo, setNuevo] = React.useState(false)
	const [listaBotones, setListaBotones] = React.useState([])
	const reporte = {
		page: "1",
		id_empresa: "1",
		id_anexo: "0",
		nm_anexo: "",
		nm_alias: "",
		tdocumento: "",
		ruc: "",
		nomestado: "",
		sortcolumn: "",
		sortorder: "desc",
		rows: 0
	}
	var timer = 0;
	var delay = 400;
	var prevent = false;
	const [pdfBody, setPdfBody] = React.useState([])
	const [totalGeneral, setTotalGeneral] = React.useState(0)
	const filtrar = [
		{ index: 1, nombre: 'Comienza con' },
		{ index: 2, nombre: 'Contiene' }
	]

	React.useEffect(() => {
		consultaAnexo()
		conteo()
		consultarListaBotones()
		consultaTotalGenetal()
	}, [])

	const consultaTotalGenetal = () => {
		consumeWS('POST', 'api/anexo/examinarcontador', filtro, '')
			.then(result => {
				setTotalGeneral(result)
			});
	}

	const consultaAnexo = () => {
		consumeWS('POST', 'api/anexo/examinar', filtro, '')
			.then(result => {
				setRows(result)
			});
	}

	const conteo = () => {
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
		setOpenNombre(true)
	}

	const handleCloseNombre = () => {
		setOpenNombre(false)
	}

	const onChange = (e) => {
		setFiltro({
			...filtro,
			[e.target.name]: e.target.value
		})
	}

	const Enter = (e) => {
		if (e.keyCode === 13) {
			consultaAnexo()
			conteo()
			setOpenNombre(false)
			setOpenId(false)
			setOpenAlias(false)
			setOpenNDocumento(false)
			setOpentdocumento(false)
		}
	}

	const handleId = () => {
		setOpenId(true)
	}

	const handleCloseId = () => {
		setOpenId(false)
	}

	const handleAlias = () => {
		setOpenAlias(true)
	}

	const handleCloseAlias = () => {
		setOpenAlias(false)
	}

	const handleNDocumento = () => {
		setOpenNDocumento(true)
	}

	const handleCloseNDocumento = () => {
		setOpenNDocumento(false)
	}

	const handletdocumento = () => {
		setOpentdocumento(true)
	}

	const handleClosetdocumento = () => {
		setOpentdocumento(false)
	}

	const eliminarAnexo = (id_anexo) => {
		consumeWS('POST', 'api/anexo/eliminar', '', `?id_anexo=${id_anexo}`)
			.then(result => {
				setMensaje(result);
				if (mensaje.hasOwnProperty('message')) {
					setOpenMensajeError(true)
				} else {
					if (mensaje.error !== "") {
						setOpenMensajeError(true)

					} else {
						setOpenMensajeError(true)
					}
				}
				conteo()
				consultaAnexo()
			});
	};

	const handleCloseMensaje = (event, reason) => {
		if (reason === 'timeout') {
			setOpenMensajeError(false)
		}
		if (reason === 'clickaway') {
			setOpenMensajeError(false)
		}
		if (typeof reason === 'undefined') {
			setOpenMensajeError(false)
		}

	}

	const handleOpen = () => {
		setOpen(true);
	};

	const handleCloseButton = () => {
		setOpen(false);
	};

	const irNuevo = () => {
		setNuevo(true)
	}

	const consultarListaBotones = () => {
		consumeWS('GET', 'api/general/accesolistar', '', `?codigoformulario=mant_anexo_lista`)
			.then(result => {
				setListaBotones(result)
			});
	}

	const pdf = () => {
		reporte.rows = totalGeneral
		consumeWS('POST', 'api/anexo/examinar', reporte, '')
			.then(result => {
				setPdfBody(result)
			});
		generarPDF()
	}

	const generarPDF = () => {
		const pdf = new jsPDF('landscape');
		pdf.setFontSize(15);
		pdf.setTextColor(40);
		pdf.setFontStyle('normal');
		pdf.text("Lista de Anexos", 140, 17, 'center');
		pdf.autoTable({
			tableWidth: 'wrap',
			margin: { top: 30, left: 20 },
			tableLineColor: [0, 0, 0],
			tableLineWidth: .5,
			styles: {
				lineColor: [0, 0, 0],
				lineWidth: .5,
				fontSize: 8
			},

			columnStyles: {
				nm_anexo: { cellWidth: 80 },
				nm_alias: { cellWidth: 80 },
				tdocumento: { cellWidth: 40, halign: 'center' }
			},

			headStyles: {
				fillColor: [126, 211, 238],
				fontSize: 9,
				textColor: [0, 0, 0]
			},

			bodyStyles: {
				fillColor: [222, 224, 225],
				fontSize: 8,
				textColor: [0, 0, 0]
			},
			alternateRowStyles: {
				fillColor: [240, 240, 240]
			},

			columns: [
				{ header: 'ID', dataKey: 'id_anexo' },
				{ header: 'Nombre', dataKey: 'nm_anexo' },
				{ header: 'Nombre Corto', dataKey: 'nm_alias' },
				{ header: 'TIpo de Documento', dataKey: 'tdocumento' },
				{ header: 'N° de Documento', dataKey: 'ruc' },
				{ header: 'Estado', dataKey: 'nomestado' }
			],
			body: pdfBody,
		});
		pdf.save("Lista de Anexos");
	};

	const excel = () => {
		reporte.rows = totalGeneral
		consumeWS('POST', 'api/anexo/examinar', reporte, '')
			.then(result => {
				setPdfBody(result)
			});
		generarExcel()
	}

	const generarExcel = () => {

		var Excel = require('exceljs');

		var workbook = new Excel.Workbook();
		var worksheet = workbook.addWorksheet('Lista de Anexos');

		worksheet.columns = [
			{ header: 'ID', key: 'id_anexo', width: 10 },
			{ header: 'Nombre', key: 'nm_anexo', width: 45 },
			{ header: 'Nombre Corto', key: 'nm_alias', width: 45 },
			{ header: 'Tipo de Documento', key: 'tdocumento', width: 25 },
			{ header: 'N° de Documento', key: 'ruc', width: 25 },
			{ header: 'Estado', key: 'nomestado', width: 25 }
		];

		worksheet.getCell('A1').alignment = { vertical: 'top', horizontal: 'center' };
		worksheet.getCell('B1').alignment = { vertical: 'middle', horizontal: 'center' };
		worksheet.getCell('C1').alignment = { vertical: 'bottom', horizontal: 'center' };
		worksheet.getCell('D1').alignment = { vertical: 'middle', horizontal: 'center' };
		worksheet.getCell('E1').alignment = { vertical: 'bottom', horizontal: 'center' };
		worksheet.getCell('F1').alignment = { vertical: 'middle', horizontal: 'center' };

		worksheet.getCell('A1').border = { top: { style: 'thick' }, left: { style: 'thick' }, bottom: { style: 'thick' }, right: { style: 'thick' } };
		worksheet.getCell('B1').border = { top: { style: 'thick' }, left: { style: 'thick' }, bottom: { style: 'thick' }, right: { style: 'thick' } };
		worksheet.getCell('C1').border = { top: { style: 'thick' }, left: { style: 'thick' }, bottom: { style: 'thick' }, right: { style: 'thick' } };
		worksheet.getCell('D1').border = { top: { style: 'thick' }, left: { style: 'thick' }, bottom: { style: 'thick' }, right: { style: 'thick' } };
		worksheet.getCell('E1').border = { top: { style: 'thick' }, left: { style: 'thick' }, bottom: { style: 'thick' }, right: { style: 'thick' } };
		worksheet.getCell('F1').border = { top: { style: 'thick' }, left: { style: 'thick' }, bottom: { style: 'thick' }, right: { style: 'thick' } };


		var rows = pdfBody
		for (let i = 0; i < rows.length; i++) {
			worksheet.addRow({
				id_anexo: rows[i].id_anexo,
				nm_anexo: rows[i].nm_anexo,
				nm_alias: rows[i].nm_alias,
				tdocumento: rows[i].tdocumento,
				ruc: rows[i].ruc,
				nomestado: rows[i].nomestado
			});
		}

		worksheet.getColumn('A').alignment = { vertical: 'top', horizontal: 'center' };
		worksheet.getColumn('D').alignment = { vertical: 'top', horizontal: 'center' };
		worksheet.getColumn('E').alignment = { vertical: 'top', horizontal: 'center' };
		worksheet.getColumn('F').alignment = { vertical: 'top', horizontal: 'center' };

		worksheet.getColumn('A').font = { name: 'Arial', size: 10 };
		worksheet.getColumn('B').font = { name: 'Arial', size: 10 };
		worksheet.getColumn('C').font = { name: 'Arial', size: 10 };
		worksheet.getColumn('D').font = { name: 'Arial', size: 10 };
		worksheet.getColumn('E').font = { name: 'Arial', size: 10 };
		worksheet.getColumn('F').font = { name: 'Arial', size: 10 };

		worksheet.getColumn('A').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
		worksheet.getColumn('B').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
		worksheet.getColumn('C').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
		worksheet.getColumn('D').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
		worksheet.getColumn('E').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
		worksheet.getColumn('F').border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };

		worksheet.getCell('A1').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF999999' }
		};

		worksheet.getCell('B1').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF999999' }
		};

		worksheet.getCell('C1').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF999999' }
		};

		worksheet.getCell('D1').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF999999' }
		}

		worksheet.getCell('E1').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF999999' }
		}

		worksheet.getCell('F1').fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: { argb: 'FF999999' }
		}

		workbook.xlsx.writeBuffer().then(function (data) {
			const blob = new Blob([data]);
			saveAs(blob, 'Anexos.xlsx');
		});

	}

	const ordenamientoId = () => {
		consultaAnexo()
		setFiltro({
			...filtro,
			sortcolumn: filtro.sortcolumn === 'id_anexo' ? '' : 'id_anexo'
		})
	}

	const handleClickId = () => {
		timer = setTimeout(function () {
			if (!prevent) {
				handleId()
			}
			prevent = false;
		}, delay);
	}

	const handleDoubleClickId = () => {
		clearTimeout(timer);
		prevent = true;
		ordenamientoId()
	}

	const ordenamientoNombre = () => {
		consultaAnexo()
		setFiltro({
			...filtro,
			sortcolumn: filtro.sortcolumn === 'nm_anexo' ? '' : 'nm_anexo'
		})
	}

	const handleClickNombre = () => {
		timer = setTimeout(function () {
			if (!prevent) {
				handleNombre()
			}
			prevent = false;
		}, delay);
	}

	const handleDoubleClickNombre = () => {
		clearTimeout(timer);
		prevent = true;
		ordenamientoNombre()
	}

	const ordenamientoAlias = () => {
		consultaAnexo()
		setFiltro({
			...filtro,
			sortcolumn: filtro.sortcolumn === 'nm_alias' ? '' : 'nm_alias'
		})
	}

	const handleClickAlias = () => {
		timer = setTimeout(function () {
			if (!prevent) {
				handleAlias()
			}
			prevent = false;
		}, delay);
	}

	const handleDoubleClickAlias = () => {
		clearTimeout(timer);
		prevent = true;
		ordenamientoAlias()
	}

	const ordenamientotdocumento = () => {
		consultaAnexo()
		setFiltro({
			...filtro,
			sortcolumn: filtro.sortcolumn === 'tdocumento' ? '' : 'tdocumento'
		})
	}

	const handleClicktdocumento = () => {
		timer = setTimeout(function () {
			if (!prevent) {
				handletdocumento()
			}
			prevent = false;
		}, delay);
	}

	const handleDoubleClicktdocumento = () => {
		clearTimeout(timer);
		prevent = true;
		ordenamientotdocumento()
	}

	const ordenamientoNDocumento = () => {
		consultaAnexo()
		setFiltro({
			...filtro,
			sortcolumn: filtro.sortcolumn === 'ruc' ? '' : 'ruc'
		})
	}

	const handleClickNDocumento = () => {
		timer = setTimeout(function () {
			if (!prevent) {
				handleNDocumento()
			}
			prevent = false;
		}, delay);
	}

	const handleDoubleClickNDocumento = () => {
		clearTimeout(timer);
		prevent = true;
		ordenamientoNDocumento()
	}

	const onChangeFiltrarNombre = (e) => {
		setFiltro({
			...filtro,
			nm_anexo_tb: e.target.value
		})
	}

	const onChangeFiltrarAlias = (e) => {
		setFiltro({
			...filtro,
			nm_alias_tb: e.target.value
		})
	}

	const onChangeFiltrartdocumento = (e) => {
		setFiltro({
			...filtro,
			tdocumento_tb: e.target.value
		})
	}

	const onChangeFiltrarruc = (e) => {
		setFiltro({
			...filtro,
			ruc_tb: e.target.value
		})
	}

	const limpiar = () => {
		var valores = {
			page: 1,
			rows: 50,
			id_empresa: 1,
			id_anexo: 0,
			nm_anexo: "",
			nm_anexo_tb: "0",
			nm_alias_tb: "0",
			nm_alias: "",
			tdocumento: "",
			tdocumento_tb: "0",
			ruc: "",
			ruc_tb: "0",
			nomestado: "",
			nomestado_tb: "0",
			sortcolumn: "",
			sortorder: "desc"
		}
		setFiltro({
			page: 1,
			rows: 50,
			id_empresa: 1,
			id_anexo: 0,
			nm_anexo: "",
			nm_anexo_tb: "0",
			nm_alias_tb: "0",
			nm_alias: "",
			tdocumento: "",
			tdocumento_tb: "0",
			ruc: "",
			ruc_tb: "0",
			nomestado: "",
			nomestado_tb: "0",
			sortcolumn: "",
			sortorder: "desc"
		})
		consumeWS('POST', 'api/anexo/examinar', valores, '')
			.then(result => {
				setRows(result)
			});

		consumeWS('POST', 'api/anexo/examinarcontador', filtro, '')
			.then(result => {
				setTotal(result)
			});
	}

	if (nuevo === true) {
		return (<Redirect to={`/smnuAnexo/nuevo`} />)
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<Backdrop open={open} className={classes.back} />
			<SpeedDial
				ariaLabel="SpeedDial tooltip example"
				className={classes.speedDial}
				icon={<MenuIcon />}
				onClose={handleCloseButton}
				onOpen={handleOpen}
				open={open}>

				{listaBotones.map(botones => (
					botones.nombre === 'Editar' ?
						null :
						botones.nombre === 'Eliminar' ?
							null :
							<SpeedDialAction
								key={botones.nombre}
								icon={botones.nombre === 'Buscar' ? <SearchIcon /> : botones.nombre === 'Excel' ? <InsertDriveFileIcon /> : botones.nombre === 'Imprimir' ? <PrintIcon /> : botones.nombre === 'Nuevo' ? <AddCircleIcon /> : ''}
								tooltipTitle={botones.nombre}
								onClick={botones.nombre === 'Buscar' ? () => limpiar() : botones.nombre === 'Excel' ? () => excel() : botones.nombre === 'Imprimir' ? () => pdf() : botones.nombre === 'Nuevo' ? () => irNuevo() : ''}
							/>
				))}
			</SpeedDial>
			{/* <Slide direction="left" in={true} mountOnEnter unmountOnExit timeout={1000}> */}
			<Paper elevation={4} className={classes.root}>
				<Snackbar
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'left',
					}}
					open={openMensajeError}
					autoHideDuration={6000}
					onClose={handleCloseMensaje}
				>
					<MySnackbarContentWrapper
						onClose={handleCloseMensaje}
						variant={mensaje.error === '' ? 'success' : 'error'}
						message={mensaje.error === '' ? 'eliminado' : mensaje.error}
					/>
				</Snackbar>
				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={openNombre}
					onClose={handleCloseNombre}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{ timeout: 500 }}>
					<Fade in={openNombre}>
						<div className={classes.estiloModal}>
							<Typography variant="h6">
								Buscar
								</Typography>
							<TextField
								required
								select
								fullWidth
								value={filtro.nm_anexo_tb}
								onChange={onChangeFiltrarNombre.bind()}
								label="Mostrar filas con valores que"
								className={classes.campo}
								margin='normal'>
								{filtrar.map(valores => (
									<MenuItem key={valores.index} value={valores.index}>{valores.nombre}</MenuItem>
								))}
							</TextField>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="nm_anexo"
								label="Nombre de Anexo"
								name="nm_anexo"
								autoComplete="nm_anexo"
								autoFocus
								onChange={onChange.bind()}
								onKeyDown={Enter.bind()}
								value={filtro.nm_anexo}
							/>
						</div>
					</Fade>
				</Modal>
				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={openId}
					onClose={handleCloseId}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{ timeout: 500 }}>
					<Fade in={openId}>
						<div className={classes.estiloModal}>
							<Typography variant="h6">
								Buscar
								</Typography>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="id_anexo"
								label="Id de Anexo"
								name="id_anexo"
								autoComplete="id_anexo"
								autoFocus
								onChange={onChange.bind()}
								onKeyDown={Enter.bind()}
								value={filtro.id_anexo}
							/>
						</div>
					</Fade>
				</Modal>
				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={openAlias}
					onClose={handleCloseAlias}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{ timeout: 500 }}>
					<Fade in={openAlias}>
						<div className={classes.estiloModal}>
							<Typography variant="h6">
								Buscar
								</Typography>
							<TextField
								required
								select
								fullWidth
								value={filtro.nm_alias_tb}
								onChange={onChangeFiltrarAlias.bind()}
								label="Mostrar filas con valores que"
								className={classes.campo}
								margin='normal'>
								{filtrar.map(valores => (
									<MenuItem key={valores.index} value={valores.index}>{valores.nombre}</MenuItem>
								))}
							</TextField>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="nm_alias"
								label="Alias de Anexo"
								name="nm_alias"
								autoComplete="nm_alias"
								autoFocus
								onChange={onChange.bind()}
								onKeyDown={Enter.bind()}
								value={filtro.nm_alias}
							/>
						</div>
					</Fade>
				</Modal>
				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={openNDocumento}
					onClose={handleCloseNDocumento}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{ timeout: 500 }}>
					<Fade in={openNDocumento}>
						<div className={classes.estiloModal}>
							<Typography variant="h6">
								Buscar
								</Typography>
							<TextField
								required
								select
								fullWidth
								value={filtro.ruc_tb}
								onChange={onChangeFiltrarruc.bind()}
								label="Mostrar filas con valores que"
								className={classes.campo}
								margin='normal'>
								{filtrar.map(valores => (
									<MenuItem key={valores.index} value={valores.index}>{valores.nombre}</MenuItem>
								))}
							</TextField>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="ruc"
								label="N° Documento"
								name="ruc"
								autoComplete="ruc"
								autoFocus
								onChange={onChange.bind()}
								onKeyDown={Enter.bind()}
								value={filtro.ruc}
							/>
						</div>
					</Fade>
				</Modal>
				<Modal
					aria-labelledby='transition-modal-title'
					aria-describedby="transition-modal-description"
					className={classes.modal}
					open={opentdocumento}
					onClose={handleClosetdocumento}
					closeAfterTransition
					BackdropComponent={Backdrop}
					BackdropProps={{ timeout: 500 }}>
					<Fade in={opentdocumento}>
						<div className={classes.estiloModal}>
							<Typography variant="h6">
								Buscar
								</Typography>
							<TextField
								required
								select
								fullWidth
								value={filtro.tdocumento_tb}
								onChange={onChangeFiltrartdocumento.bind()}
								label="Mostrar filas con valores que"
								className={classes.campo}
								margin='normal'>
								{filtrar.map(valores => (
									<MenuItem key={valores.index} value={valores.index}>{valores.nombre}</MenuItem>
								))}
							</TextField>
							<TextField
								variant="outlined"
								margin="normal"
								required
								fullWidth
								id="tdocumento"
								label="Tipo de Documento"
								name="tdocumento"
								autoComplete="tdocumento"
								autoFocus
								onChange={onChange.bind()}
								onKeyDown={Enter.bind()}
								value={filtro.tdocumento}
							/>
						</div>
					</Fade>
				</Modal>
				<div className={classes.tableWrapper}>
					<Table stickyHeader aria-label="sticky table" size="small">
						<TableHead >
							<TableRow>
								<TableCell key='1' onClick={handleClickId} onDoubleClick={handleDoubleClickId} className={classes.tablecell} style={{ cursor: 'pointer', backgroundColor: filtro.id_anexo === '' ? '#4a48b2' : filtro.id_anexo === 0 ? '#4a48b2' : '#1281FF' }}>Id</TableCell>
								<TableCell key='2' onClick={handleClickNombre} onDoubleClick={handleDoubleClickNombre} className={classes.tablecell} style={{ cursor: 'pointer', backgroundColor: filtro.nm_anexo === '' ? '#4a48b2' : '#1281FF' }}>Nombre</TableCell>
								<TableCell key='3' align='left' onClick={handleClickAlias} onDoubleClick={handleDoubleClickAlias} className={classes.tablecell} style={{ cursor: 'pointer', backgroundColor: filtro.nm_alias === '' ? '#4a48b2' : '#1281FF' }}>Alias</TableCell>
								<TableCell key='4' align='left' onClick={handleClicktdocumento} onDoubleClick={handleDoubleClicktdocumento} className={classes.tablecell} style={{ cursor: 'pointer', backgroundColor: filtro.tdocumento === '' ? '#4a48b2' : '#1281FF' }}>Tipo de Documento</TableCell>
								<TableCell key='5' align='left' onClick={handleClickNDocumento} onDoubleClick={handleDoubleClickNDocumento} className={classes.tablecell} style={{ cursor: 'pointer', backgroundColor: filtro.ruc === '' ? '#4a48b2' : '#1281FF' }}>N° Documento</TableCell>
								<TableCell key='6' align='left' className={classes.tablecell}>Estado</TableCell>
								{listaBotones.map(botones => (
									botones.nombre === 'Editar' ?
										<TableCell key='7' align='center' className={classes.tablecell}>Editar</TableCell> :
										botones.nombre === 'Eliminar' ?
											<TableCell key='8' align='center' className={classes.tablecell}>Eliminar</TableCell> :
											null
								))}
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
										{listaBotones.map(botones => (
											botones.nombre === 'Editar' ?
												<TableCell align='center' className={classes.celdas}>
													<Link to={`/smnuAnexo/editar?id_anexo=${row.id_anexo}`}>
														<Fab size="small" color='primary'>
															<EditIcon />
														</Fab>
													</Link>
												</TableCell> :
												botones.nombre === 'Eliminar' ?
													<TableCell align='center' className={classes.celdas}>
														<Fab color='secondary' onClick={() => eliminarAnexo(row.id_anexo)} size="small">
															<DeleteForeverIcon />
														</Fab>
													</TableCell> :
													null
										))}
									</TableRow>
								);
							})}
							<TableRow>
								<TablePagination
									rowsPerPageOptions={[10, 25, 50]}
									count={total}
									rowsPerPage={filtro.rows}
									page={filtro.page - 1}
									onChangePage={handleChangePage}
									onChangeRowsPerPage={handleChangeRowsPerPage}
									labelRowsPerPage={'Items por página'}
									labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
								/>
							</TableRow>
						</TableBody>
					</Table>
				</div>
			</Paper>
			{/* </Slide> */}
		</React.Fragment>
	);
}