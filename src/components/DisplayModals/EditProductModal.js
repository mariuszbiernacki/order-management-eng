import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import TextField from "@material-ui/core/TextField";
import FormControl from "@material-ui/core/FormControl";
import "date-fns";
import { Button } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import AddOrderTemplate from "../../template/AddOrderTemplate";

import { connect } from "react-redux";
import {
  closeEditProductModal as closeEditProductModalAction,
  addProduct as addProductAction,
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

const EditProductModal = ({
  isEditProductOpen,
  closeEditProductModal,
  addProduct,
}) => {
  const classes = useStyles();
  const [productType, setProductType] = useState("sheets");

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  const handleEditAddProductForm = (e) => {
    e.preventDefault();

    const productId = Math.floor(Math.random() * 10000);
    const productName = e.target.productName.value;
    const productQuantity = e.target.productQuantity.value;
    const productPrice = e.target.productPrice.value;

    const newProduct = {
      productId,
      productName,
      productType,
      productQuantity,
      productPrice,
    };
    addProduct(newProduct);
    e.target.reset();
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isEditProductOpen}
      onClose={closeEditProductModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isEditProductOpen}>
        <div className={classes.paper}>
          <AddOrderTemplate>
            <h2 id="transition-modal-title">add product</h2>
          </AddOrderTemplate>
          <>
            <form onSubmit={handleEditAddProductForm}>
              <AddOrderTemplate>
                <TextField
                  id="outlined-basic"
                  label="product name"
                  variant="outlined"
                  name="productName"
                  required
                />
              </AddOrderTemplate>
              <AddOrderTemplate>
                <FormControl variant="outlined" className={classes.formControl}>
                  <InputLabel id="demo-simple-select-outlined-label">
                    product type
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={productType}
                    onChange={handleProductTypeChange}
                    label="product"
                  >
                    <MenuItem value={"sheets"}>sheets</MenuItem>
                    <MenuItem value={"papers"}>papers</MenuItem>
                    <MenuItem value={"rubber"}>rubber</MenuItem>
                    <MenuItem value={"sealants"}>sealants</MenuItem>
                    <MenuItem value={"other"}>other</MenuItem>
                  </Select>
                </FormControl>
              </AddOrderTemplate>
              <AddOrderTemplate>
                <TextField
                  id="outlined-basic"
                  label="quantity"
                  variant="outlined"
                  name="productQuantity"
                  type="number"
                  required
                />
              </AddOrderTemplate>
              <AddOrderTemplate>
                <TextField
                  id="outlined-basic"
                  label="product price"
                  variant="outlined"
                  name="productPrice"
                  type="number"
                  required
                />
              </AddOrderTemplate>
              <AddOrderTemplate>
                <Button variant="contained" color="primary" type="submit">
                  add
                </Button>
              </AddOrderTemplate>
            </form>
          </>
        </div>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isEditProductOpen: state.isEditProductOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeEditProductModal: () => dispatch(closeEditProductModalAction()),
    addProduct: (product) => dispatch(addProductAction(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProductModal);
