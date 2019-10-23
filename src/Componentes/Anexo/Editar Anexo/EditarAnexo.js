import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Form from './Form';

const useStyles = makeStyles(theme => ({
	appBar: {
		position: 'relative',
	},
	layout: {
		width: 'auto',
		marginLeft: theme.spacing(2),
		marginRight: theme.spacing(2),
		marginTop: theme.spacing(12),
		[theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
			width: 600,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing(3),
		marginBottom: theme.spacing(3),
		padding: theme.spacing(2),
		[theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
			marginTop: theme.spacing(6),
			marginBottom: theme.spacing(6),
			padding: theme.spacing(3),
		},
	},
	stepper: {
		padding: theme.spacing(3, 0, 5),
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-end',
	},
	button: {
		marginTop: theme.spacing(3),
		marginLeft: theme.spacing(1),
	},
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <Form id={0}/>;
		case 1:
			return '';
		case 2:
			return '';
		default:
			throw new Error('Unknown step');
	}
}

export default function Checkout() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = React.useState(0);

	return (
		<React.Fragment>
			<CssBaseline />
			<main className={classes.layout}>
				<Paper className={classes.paper}>
					<Typography component="h1" variant="h4" align="center">
						Editar Anexo
          			</Typography>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>

							</React.Fragment>
						) : (
								<React.Fragment>
									{getStepContent(activeStep)}
									<div className={classes.buttons}>
										<Button
											variant="contained"
											color="primary"
											className={classes.button}
										>
											Guardar
										</Button>
									</div>
								</React.Fragment>
							)}
					</React.Fragment>
				</Paper>
			</main>
		</React.Fragment>
	);
}