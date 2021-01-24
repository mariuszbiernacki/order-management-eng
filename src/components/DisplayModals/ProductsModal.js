import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { closeProductModal as closeProductModalAction } from "../../actions/actions";

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

const ProductsModal = ({
  isProductModalOpen,
  closeProductModal,
  selectedOrder,
}) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isProductModalOpen}
      onClose={closeProductModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isProductModalOpen}>
        <div className={classes.paper}>
          <h2 id="transition-modal-title">product list: </h2>
          {selectedOrder === null ? (
            ""
          ) : (
            <>
              {selectedOrder.products.map((product) => {
                const {
                  productId,
                  productName,
                  productType,
                  productQuantity,
                  productPrice,
                  productCurrency,
                } = product;
                return (
                  <div key={productId}>
                    <h4>name: {productName}</h4>
                    <p>type: {productType}</p>
                    <p>quantity: {productQuantity}</p>
                    <p>
                      price: {productPrice} {productCurrency}
                    </p>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </Fade>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {
    isProductModalOpen: state.isProductModalOpen,
    selectedOrder: state.selectedOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeProductModal: () => dispatch(closeProductModalAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductsModal);
