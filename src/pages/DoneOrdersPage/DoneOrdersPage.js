import React from "react";
import DoneOrdersTable from "../../components/DoneOrdersTable/DoneOrdersTable";
import ProductsDoneModal from "../../components/DisplayModals/ProductsDoneModal";
import BillsDoneModal from "../../components/DisplayModals/BillsDoneModal";

const DoneOrdersPage = () => {
  return (
    <>
      <ProductsDoneModal />
      <BillsDoneModal />
      <DoneOrdersTable />
    </>
  );
};

export default DoneOrdersPage;
