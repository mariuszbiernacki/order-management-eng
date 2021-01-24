import React from "react";
import OrdersTable from "../../components/OrdersTable/OrdersTable";
import BillsModal from "../../components/DisplayModals/BillsModal";
import EditModal from "../../components/DisplayModals/EditModal";
import ProductsModal from "../../components/DisplayModals/ProductsModal";
import EditProductModal from "../../components/DisplayModals/EditProductModal";
import EditBillModal from "../../components/DisplayModals/EditBillModal";

const OrdersPage = () => {
  return (
    <>
      <ProductsModal />
      <OrdersTable />
      <BillsModal />
      <EditModal />
      <EditProductModal />
      <EditBillModal />
    </>
  );
};

export default OrdersPage;
