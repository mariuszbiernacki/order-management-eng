export const getOrdersFromLocalStorage = () => {
  let localStorageOrders;
  if (localStorage.getItem("orders")) {
    localStorageOrders = JSON.parse(localStorage.getItem("orders"));
  } else {
    localStorageOrders = [];
  }
  return localStorageOrders;
};
export const getDoneOrdersFromLocalStorage = () => {
  let localStorageDoneOrders;
  if (localStorage.getItem("doneOrders")) {
    localStorageDoneOrders = JSON.parse(localStorage.getItem("doneOrders"));
  } else {
    localStorageDoneOrders = [];
  }
  return localStorageDoneOrders;
};
