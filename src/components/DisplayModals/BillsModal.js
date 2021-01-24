import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { closeBillModal as closeBillModalAction } from "../../actions/actions";

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

const BillsModal = ({ isBillModalOpen, closeBillModal, selectedOrder }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={isBillModalOpen}
      onClose={closeBillModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={isBillModalOpen}>
        <div className={classes.paper}>
          <h2>bill list</h2>
          {selectedOrder === null ? (
            ""
          ) : (
            <>
              {selectedOrder.bills.map((bill) => {
                const {
                  billId,
                  billNumber,
                  companyName,
                  billPrice,
                  billDate,
                } = bill;
                return (
                  <div key={billId} style={{ marginBottom: "20px" }}>
                    <h4>bill number: {billNumber}</h4>
                    <p>company: {companyName}</p>
                    <p>to be paid: {billPrice}</p>
                    <p>date: {billDate}</p>
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
    isBillModalOpen: state.isBillModalOpen,
    selectedOrder: state.selectedOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeBillModal: () => dispatch(closeBillModalAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BillsModal);
