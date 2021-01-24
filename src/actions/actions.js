import { actionTypes } from "./actionTypes";

export const addOrder = (order) => {
  return {
    type: actionTypes.ADD_ORDER,
    payload: order,
  };
};

export const deleteOrder = (orderId) => {
  return {
    type: actionTypes.DELETE_ORDER,
    payload: orderId,
  };
};

export const openProductModal = () => {
  return {
    type: actionTypes.OPEN_PRODUCT_MODAL,
  };
};

export const closeProductModal = () => {
  return {
    type: actionTypes.CLOSE_PRODUCT_MODAL,
  };
};

export const openBillModal = () => {
  return {
    type: actionTypes.OPEN_BILL_MODAL,
  };
};

export const closeBillModal = () => {
  return {
    type: actionTypes.CLOSE_BILL_MODAL,
  };
};

export const selectOrder = (orderId) => {
  return {
    type: actionTypes.SELECT_ORDER,
    payload: orderId,
  };
};

export const openEditModal = () => {
  return {
    type: actionTypes.OPEN_EDIT_MODAL,
  };
};

export const closeEditModal = () => {
  return {
    type: actionTypes.CLOSE_EDIT_MODAL,
  };
};

export const editOrder = (editedOrder) => {
  return {
    type: actionTypes.EDIT_ORDER,
    payload: editedOrder,
  };
};
export const openEditProductModal = () => {
  return {
    type: actionTypes.OPEN_EDIT_PRODUCT,
  };
};
export const closeEditProductModal = () => {
  return {
    type: actionTypes.CLOSE_EDIT_PRODUCT,
  };
};
export const openEditBillModal = () => {
  return {
    type: actionTypes.OPEN_EDIT_BILL,
  };
};
export const closeEditBillModal = () => {
  return {
    type: actionTypes.CLOSE_EDIT_BILL,
  };
};
export const finishOrder = (orderId) => {
  return {
    type: actionTypes.FINISH_ORDER,
    payload: orderId,
  };
};
export const removeDeletedOrder = (orderId) => {
  return {
    type: actionTypes.REMOVE_DELETED_ORDER,
    payload: orderId,
  };
};

export const addProduct = (product) => {
  return {
    type: actionTypes.ADD_PRODUCT,
    payload: product,
  };
};
export const addBill = (bill) => {
  return {
    type: actionTypes.ADD_BILL,
    payload: bill,
  };
};

export const selectDoneOrder = (orderId) => {
  return {
    type: actionTypes.SELECT_DONE_ORDER,
    payload: orderId,
  };
};
