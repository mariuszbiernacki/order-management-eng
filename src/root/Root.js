import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AddOrdersPage from "../pages/AddOrdersPage/AddOrdersPage";
import Home from "../pages/Home/Home";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import DoneOrdersPage from "../pages/DoneOrdersPage/DoneOrdersPage";
import MainTemplate from "../template/MainTemplate";
import { connect } from "react-redux";

const Root = ({ orders, doneOrders }) => {
  const setOrdersFromLocalStorage = () => {
    localStorage.setItem("orders", JSON.stringify(orders));
  };

  const setDoneOrdersFromLocalStorage = () => {
    localStorage.setItem("doneOrders", JSON.stringify(doneOrders));
  };

  useEffect(() => {
    setOrdersFromLocalStorage();
    setDoneOrdersFromLocalStorage();
  }, [orders, doneOrders]);

  return (
    <BrowserRouter>
      <MainTemplate>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/addOrdersPage" component={AddOrdersPage} />
          <Route path="/OrdersPage" component={OrdersPage} />
          <Route path="/DoneOrdersPage" component={DoneOrdersPage} />
        </Switch>
      </MainTemplate>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    doneOrders: state.doneOrders,
  };
};

export default connect(mapStateToProps)(Root);
