import React from "react";
import TextField from "@material-ui/core/TextField";
import "date-fns";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import AddOrderTemplate from "../../template/AddOrderTemplate";

const AddBill = ({
  billNumber,
  billCompanyName,
  billPrice,
  handleBillNumberChange,
  handleBillCompanyNameChange,
  handleBillPriceChange,
  handleBillDateChange,
  handleAddBill,
  billDate,
  handleShowBillFormClose,
}) => {
  return (
    <>
      <div>
        <AddOrderTemplate>
          <TextField
            id="outlined-basic"
            label="bill number"
            variant="outlined"
            name="billNumber"
            value={billNumber}
            onChange={handleBillNumberChange}
          />
        </AddOrderTemplate>
        <AddOrderTemplate>
          <TextField
            id="outlined-basic"
            label="company name"
            variant="outlined"
            name="companyName"
            value={billCompanyName}
            onChange={handleBillCompanyNameChange}
          />
        </AddOrderTemplate>
        <AddOrderTemplate>
          <TextField
            id="outlined-basic"
            label="bill amount"
            variant="outlined"
            name="billPrice"
            type="number"
            value={billPrice}
            onChange={handleBillPriceChange}
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
          <Button variant="contained" color="primary" onClick={handleAddBill}>
            add
          </Button>
        </AddOrderTemplate>
      </div>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleShowBillFormClose}
      >
        cancel
      </Button>
    </>
  );
};

export default AddBill;
