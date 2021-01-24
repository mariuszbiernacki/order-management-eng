import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { Button } from "@material-ui/core";
import moment from "moment";
import AddOrderTemplate from "../../template/AddOrderTemplate";
import { connect } from "react-redux";
import {
  closeEditBillModal as closeEditBillModalAction,
  addBill as addBillAction,
} from "../../actions/actions";

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

const EditBillModal = ({ isEditBillOpen, closeEditBillModal, addBill }) => {
  const classes = useStyles();
  const [billDate, setBillDate] = useState();
  const formattedBillDate = moment(billDate).format("DD/MM/YYYY");

  const handleEditAddBillForm = (e) => {
    e.preventDefault();

    const billId = Math.floor(Math.random() * 10000);
    const billNumber = e.target.billNumber.value;
    const companyName = e.target.companyName.value;
    const billPrice = e.target.billPrice.value;

    const newBill = {
      billId,
      billNumber,
      companyName,
      billPrice,
      billDate: formattedBillDate,
    };

    addBill(newBill);

    e.target.reset();
  };

  const handleBillDateChange = (date) => {
    setBillDate(date);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isEditBillOpen}
      onClose={closeEditBillModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isEditBillOpen}>
        <div className={classes.paper}>
          <AddOrderTemplate>
            <h2 id="transition-modal-title">add bill</h2>
          </AddOrderTemplate>
          <form onSubmit={handleEditAddBillForm}>
            <AddOrderTemplate>
              <TextField
                id="outlined-basic"
                label="bill number"
                variant="outlined"
                name="billNumber"
                required
              />
            </AddOrderTemplate>
            <AddOrderTemplate>
              <TextField
                id="outlined-basic"
                label="company name"
                variant="outlined"
                name="companyName"
                required
              />
            </AddOrderTemplate>
            <AddOrderTemplate>
              <TextField
                id="outlined-basic"
                label="to be paid"
                variant="outlined"
                name="billPrice"
                type="number"
                required
              />
            </AddOrderTemplate>
            <AddOrderTemplate>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="bill date"
                  format="dd/MM/yyyy"
                  value={billDate}
                  onChange={handleBillDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </MuiPickersUtilsProvider>
            </AddOrderTemplate>
            <AddOrderTemplate>
              <Button variant="contained" color="primary" type="submit">
                add
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
    isEditBillOpen: state.isEditBillOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeEditBillModal: () => dispatch(closeEditBillModalAction()),
    addBill: (bill) => dispatch(addBillAction(bill)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditBillModal);
