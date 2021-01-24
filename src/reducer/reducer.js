import { actionTypes } from "../actions/actionTypes";
import {
  getOrdersFromLocalStorage,
  getDoneOrdersFromLocalStorage,
} from "../utils/localStorageGetters";

const initialState = {
  orders: getOrdersFromLocalStorage(),
  doneOrders: getDoneOrdersFromLocalStorage(),
  isProductModalOpen: false,
  isBillModalOpen: false,
  selectedOrder: null,
  isEditModalOpen: false,
  isEditProductOpen: false,
  isEditBillOpen: false,
  selectedDoneOrder: null,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, payload],
      };

    case actionTypes.DELETE_ORDER:
      const filteredOrders = state.orders.filter((order) => {
        return !payload.includes(order.orderId);
      });
      return {
        ...state,
        orders: [...filteredOrders],
      };
    case actionTypes.OPEN_PRODUCT_MODAL:
      return {
        ...state,
        isProductModalOpen: true,
      };
    case actionTypes.CLOSE_PRODUCT_MODAL:
      return {
        ...state,
        isProductModalOpen: false,
      };
    case actionTypes.OPEN_BILL_MODAL:
      return {
        ...state,
        isBillModalOpen: true,
      };
    case actionTypes.CLOSE_BILL_MODAL:
      return {
        ...state,
        isBillModalOpen: false,
      };
    case actionTypes.OPEN_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: true,
      };
    case actionTypes.CLOSE_EDIT_MODAL:
      return {
        ...state,
        isEditModalOpen: false,
      };
    case actionTypes.SELECT_ORDER:
      const chosenOrder = state.orders.find(
        (order) => order.orderId === payload
      );
      return {
        ...state,
        selectedOrder: chosenOrder,
      };
    case actionTypes.EDIT_ORDER:
      const editedOrder = state.orders.map((order) => {
        if (order.orderId === state.selectedOrder.orderId) {
          order.clientName = payload.clientName;
          order.payment = payload.payment;
          order.deliveryDate = payload.deliveryDate;
          order.paymentDate = payload.paymentDate;
          order.currency = payload.currency;
        }
        return order;
      });
      return {
        ...state,
        orders: [...editedOrder],
        isEditModalOpen: false,
      };
    case actionTypes.OPEN_EDIT_PRODUCT:
      return {
        ...state,
        isEditProductOpen: true,
      };
    case actionTypes.CLOSE_EDIT_PRODUCT:
      return {
        ...state,
        isEditProductOpen: false,
      };
    case actionTypes.OPEN_EDIT_BILL:
      return {
        ...state,
        isEditBillOpen: true,
      };
    case actionTypes.CLOSE_EDIT_BILL:
      return {
        ...state,
        isEditBillOpen: false,
      };
    case actionTypes.FINISH_ORDER:
      const finishedOrder = state.orders.filter(
        (order) => order.orderId === state.selectedOrder.orderId
      );
      const unfinishedOrders = state.orders.filter(
        (order) => order.orderId !== state.selectedOrder.orderId
      );

      return {
        ...state,
        doneOrders: [...state.doneOrders, ...finishedOrder],
        orders: [...unfinishedOrders],
      };
    case actionTypes.REMOVE_DELETED_ORDER:
      const filteredDoneOrders = state.doneOrders.filter((order) => {
        return payload.includes(order.id);
      });
      return {
        ...state,
        doneOrders: [...filteredDoneOrders],
      };
    case actionTypes.ADD_PRODUCT:
      const revisedOrder = state.orders.map((order) => {
        if (order.orderId === state.selectedOrder.orderId) {
          const productCurrency = state.selectedOrder.currency;
          const newProduct = { ...payload, productCurrency };
          order.products = [...order.products, newProduct];
        }
        return order;
      });
      return {
        ...state,
        orders: [...revisedOrder],
      };
    case actionTypes.ADD_BILL:
      const amendedOrder = state.orders.map((order) => {
        if (order.orderId === state.selectedOrder.orderId) {
          order.bills = [...order.bills, payload];
        }
        return order;
      });
      return {
        ...state,
        orders: [...amendedOrder],
      };
    case actionTypes.SELECT_DONE_ORDER:
      const chosenDoneOrder = state.doneOrders.find(
        (order) => order.orderId === payload
      );
      return {
        ...state,
        selectedDoneOrder: chosenDoneOrder,
      };
    default:
      return state;
  }
};

export default reducer;
