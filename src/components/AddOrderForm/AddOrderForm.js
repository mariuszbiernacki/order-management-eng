import React, { useState } from "react";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";
import { connect } from "react-redux";
import { addOrder as addOrderAction } from "../../actions/actions";
import AddProduct from "./AddProduct";
import AddBill from "./AddBill";
import AddOrderFormContent from "./AddOrderFormContent";
import { addOrderValidationSchema } from "./AddOrderFormValidation";

const AddOrderForm = ({ addOrder }) => {
  const [currency, setCurrency] = useState("EUR");
  const [deliveryDate, setDeliveryDate] = useState();
  const [paymentDate, setPaymentDate] = useState();
  const [deliveryDateError, setDeliveryDateError] = useState("");
  const [paymentDateError, setPaymentDateError] = useState("");

  const [bills, setBills] = useState([]);
  const [showBillForm, setShowBillForm] = useState(false);
  const [billDate, setBillDate] = useState(new Date());
  const [billNumber, setBillNumber] = useState("");
  const [billCompanyName, setBillCompanyName] = useState("");
  const [billPrice, setBillPrice] = useState(0);

  const [products, setProducts] = useState([]);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productType, setProductType] = useState("sheets");
  const [productName, setProductName] = useState("");
  const [productQuantity, setProductQuantity] = useState(1);
  const [productPrice, setProductPrice] = useState(0);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleDeliveryDateChange = (date) => {
    setDeliveryDate(date);
    setDeliveryDateError("");
  };

  const handlePaymentDateChange = (date) => {
    setPaymentDate(date);
    setPaymentDateError("");
  };

  const handleProductNameChange = (e) => {
    setProductName(e.target.value);
  };
  const handleProductQuantityChange = (e) => {
    setProductQuantity(e.target.value);
  };
  const handleProductPriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleShowProductFormClose = () => {
    setShowProductForm(false);
  };

  const handleShowBillFormClose = () => {
    setShowBillForm(false);
  };

  const handleBillNumberChange = (e) => {
    setBillNumber(e.target.value);
  };
  const handleBillCompanyNameChange = (e) => {
    setBillCompanyName(e.target.value);
  };
  const handleBillPriceChange = (e) => {
    setBillPrice(e.target.value);
  };

  const handleBillDateChange = (date) => {
    setBillDate(date);
  };

  const handleProductTypeChange = (e) => {
    setProductType(e.target.value);
  };

  const handleAddProduct = () => {
    const parsedProductQuantity = parseInt(productQuantity);
    const parsedProductPrice = parseFloat(productPrice);
    const productId = Math.floor(Math.random() * 10000);

    const newProduct = {
      productId,
      productName,
      productType,
      productQuantity: parsedProductQuantity,
      productPrice: parsedProductPrice,
      productCurrency: currency,
    };
    setProducts([...products, newProduct]);

    setProductName("");
    setProductQuantity(1);
    setProductPrice(0);
    setShowProductForm(false);
  };

  const handleAddBill = () => {
    const billId = Math.floor(Math.random() * 10000);
    const companyName = billCompanyName;
    const parsedBillPrice = parseFloat(billPrice);
    const formattedBillDate = moment(billDate).format("DD/MM/YYYY");
    const newBill = {
      billId,
      billNumber,
      companyName,
      billPrice: parsedBillPrice,
      billDate: formattedBillDate,
    };

    setBills([...bills, newBill]);

    setBillNumber("");
    setBillCompanyName("");
    setBillPrice("");
    setBillDate(new Date());
    setShowBillForm(false);
  };

  return (
    <Formik
      initialValues={{
        clientName: "",
        payment: "",
      }}
      validationSchema={addOrderValidationSchema}
      onSubmit={(values, { resetForm }) => {
        if (deliveryDate !== undefined && paymentDate !== undefined) {
          const orderId = uuidv4();
          const formattedDeliveryDate = moment(deliveryDate).format(
            "DD/MM/YYYY"
          );
          const formattedPaymentDate = moment(paymentDate).format("DD/MM/YYYY");

          const newOrder = {
            orderId,
            clientName: values.clientName,
            payment: values.payment,

            deliveryDate: formattedDeliveryDate,
            paymentDate: formattedPaymentDate,
            currency,
            products,
            bills,
          };
          addOrder(newOrder);

          setProducts([]);
          setBills([]);
          setCurrency("PLN");
          setDeliveryDate();
          setPaymentDate();

          resetForm();
        } else {
          setDeliveryDateError("choose delivery date!");
          setPaymentDateError("choose payment date!");
        }
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <AddOrderFormContent
            values={values}
            handleChange={handleChange}
            currency={currency}
            deliveryDate={deliveryDate}
            paymentDate={paymentDate}
            deliveryDateError={deliveryDateError}
            paymentDateError={paymentDateError}
            handleCurrencyChange={handleCurrencyChange}
            handleDeliveryDateChange={handleDeliveryDateChange}
            handlePaymentDateChange={handlePaymentDateChange}
          />
          {showProductForm === false ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowProductForm(true)}
            >
              add product
            </Button>
          ) : (
            <AddProduct
              productName={productName}
              productType={productType}
              productPrice={productPrice}
              productQuantity={productQuantity}
              handleProductTypeChange={handleProductTypeChange}
              handleAddProduct={handleAddProduct}
              handleProductNameChange={handleProductNameChange}
              handleProductQuantityChange={handleProductQuantityChange}
              handleProductPriceChange={handleProductPriceChange}
              handleShowProductFormClose={handleShowProductFormClose}
            />
          )}

          {showBillForm === false ? (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowBillForm(true)}
            >
              add bill
            </Button>
          ) : (
            <AddBill
              billNumber={billNumber}
              billCompanyName={billCompanyName}
              billPrice={billPrice}
              handleBillNumberChange={handleBillNumberChange}
              handleBillCompanyNameChange={handleBillCompanyNameChange}
              handleBillPriceChange={handleBillPriceChange}
              handleBillDateChange={handleBillDateChange}
              handleAddBill={handleAddBill}
              billDate={billDate}
              handleShowBillFormClose={handleShowBillFormClose}
            />
          )}
          <Button variant="contained" type="submit" color="primary">
            add order
          </Button>
        </Form>
      )}
    </Formik>
  );
};
const mapDispatchToProps = (dispatch) => {
  return {
    addOrder: (order) => dispatch(addOrderAction(order)),
  };
};
export default connect(null, mapDispatchToProps)(AddOrderForm);
