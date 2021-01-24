import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import { connect } from "react-redux";
import { closeEditModal as closeEditModalAction } from "../../actions/actions";
import { Button } from "@material-ui/core";
import AddOrderTemplate from "../../template/AddOrderTemplate";
import { editOrder as editOrderAction } from "../../actions/actions";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "70vw",
    height: "80vh",
  },
}));

const EditModal = ({ isEditModalOpen, closeEditModal, editOrder }) => {
  const classes = useStyles();
  const [currency, setCurrency] = useState("PLN");
  const [deliveryDate, setDeliveryDate] = useState();
  const [paymentDate, setPaymentDate] = useState();

  const handleEditForm = (e) => {
    e.preventDefault();

    const formattedDeliveryDate = moment(deliveryDate).format("DD/MM/YYYY");
    const formattedPaymentDate = moment(paymentDate).format("DD/MM/YYYY");

    const editedOrder = {
      clientName: e.target.clientName.value,
      payment: e.target.payment.value,
      deliveryDate: formattedDeliveryDate,
      paymentDate: formattedPaymentDate,
      currency,
    };

    editOrder(editedOrder);

    e.target.reset();
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleDeliveryDateChange = (date) => {
    setDeliveryDate(date);
  };

  const handlePaymentDateChange = (date) => {
    setPaymentDate(date);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isEditModalOpen}
      onClose={closeEditModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isEditModalOpen}>
        <div className={classes.paper}>
          <AddOrderTemplate>
            <h2 id="transition-modal-title">edit order</h2>
          </AddOrderTemplate>
          <form onSubmit={handleEditForm}>
            <AddOrderTemplate>
              <TextField
                id="outlined-basic"
                label="company name"
                variant="outlined"
                name="clientName"
              />
            </AddOrderTemplate>
            <AddOrderTemplate>
              <FormControl component="fieldset">
                <FormLabel component="legend">currency</FormLabel>
                <RadioGroup
                  aria-label="currency"
                  name="currency"
                  value={currency}
                  onChange={handleCurrencyChange}
                >
                  <FormControlLabel
                    value="PLN"
                    control={<Radio />}
                    label="PLN"
                  />
                  <FormControlLabel
                    value="EUR"
                    control={<Radio />}
                    label="EUR"
                  />
                </RadioGroup>
              </FormControl>
            </AddOrderTemplate>
            <AddOrderTemplate>
              <TextField
                id="outlined-basic"
                label={`to be paid (${currency})`}
                variant="outlined"
                name="payment"
                type="number"
              />
            </AddOrderTemplate>
            <AddOrderTemplate>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="delivery date"
                  format="dd/MM/yyyy"
                  name="deliveryDate"
                  value={deliveryDate}
                  onChange={handleDeliveryDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </AddOrderTemplate>
            <AddOrderTemplate>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  name="paymentDate"
                  id="date-picker-dialog"
                  label="payment date"
                  format="dd/MM/yyyy"
                  value={paymentDate}
                  onChange={handlePaymentDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </AddOrderTemplate>
            <AddOrderTemplate>
              <Button variant="contained" color="primary" type="submit">
                save
              </Button>
            </AddOrderTemplate>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isEditModalOpen: state.isEditModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeEditModal: () => dispatch(closeEditModalAction()),
    editOrder: (editedOrder) => dispatch(editOrderAction(editedOrder)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
