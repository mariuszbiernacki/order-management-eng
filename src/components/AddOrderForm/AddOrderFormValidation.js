import * as Yup from "yup";

export const addOrderValidationSchema = Yup.object().shape({
  clientName: Yup.string().required("type customer name"),
  payment: Yup.string().required("type amount to be paid"),
});
