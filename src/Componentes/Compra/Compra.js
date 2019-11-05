import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
	formControl: {
		marginTop: theme.spacing(10),
		marginLeft: theme.spacing(10)
	},
	texto: {
		marginTop: theme.spacing(5),
		marginLeft: theme.spacing(3),
		marginRight: theme.spacing(2)
	}
}));

export default function Compra() {
	const classes = useStyles();
	const [value, setValue] = React.useState('rangofechas');
	const [selectedDate, setSelectedDate] = React.useState(new Date());

	const handleChange = event => {
		setValue(event.target.value);
	};

	const handleDateChange = date => {
		setSelectedDate(date);
	};

	return (
		<React.Fragment>
			<CssBaseline />
			<FormControl component="fieldset" className={classes.formControl}>
				<RadioGroup aria-label="gender" name="gender" value={value} onChange={handleChange}>
					<FormControlLabel value="rangofechas" control={<Radio color='primary' />} label="Rango de fechas" />
					<FormControlLabel value="noperacion" control={<Radio color='primary' />} label="Nro. Operación" />
					<FormControlLabel value="ndocumento" control={<Radio color='primary' />} label="Nro. Documento" />
					<FormControlLabel value="nvoucher" control={<Radio color='primary' />} label="Nro. Voucher" />
					<FormControlLabel value="ntransaccion" control={<Radio color='primary' />} label="Nro. Transacción" />
				</RadioGroup>
			</FormControl>
			{value === 'rangofechas' ?
				<FormControl component="fieldset" className={classes.formControl}>
					<MuiPickersUtilsProvider utils={DateFnsUtils}>
						<Grid container justify="space-around">
							<KeyboardDatePicker
								margin="normal"
								id="date-picker-dialog"
								label="Date picker dialog"
								format="MM/dd/yyyy"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
							<Typography variant="subtitle1" gutterBottom className={classes.texto}>
								Al
      						</Typography>
							<KeyboardDatePicker
								margin="normal"
								id="date-picker-dialog"
								label="Date picker dialog"
								format="MM/dd/yyyy"
								value={selectedDate}
								onChange={handleDateChange}
								KeyboardButtonProps={{
									'aria-label': 'change date',
								}}
							/>
						</Grid>
					</MuiPickersUtilsProvider>
				</FormControl> :
				value === 'noperacion' ?
					<FormControl component="fieldset" className={classes.formControl}>
						<p>Nro operación</p>
					</FormControl> :
					value === 'ndocumento' ?
						<FormControl component="fieldset" className={classes.formControl}>
							<p>Nro Documento</p>
						</FormControl> :
						value === 'nvoucher' ?
							<FormControl component="fieldset" className={classes.formControl}>
								<p>Nro Voucher</p>
							</FormControl> :
							value === 'ntransaccion' ?
								<FormControl component="fieldset" className={classes.formControl}>
									<p>Nro Transacción</p>
								</FormControl> :
								null
			}
		</React.Fragment>
	);
}