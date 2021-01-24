import React from "react";
import AddOrderForm from "../../components/AddOrderForm/AddOrderForm";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Paper from "@material-ui/core/Paper";
import AddOrderTemplate from "../../template/AddOrderTemplate";

const AddOrdersPage = () => {
  return (
    <Container maxWidth="md">
      <Paper>
        <Box px={5} py={3}>
          <AddOrderTemplate>
            <Typography variant="h4" color="#212121">
              Add your order
            </Typography>
          </AddOrderTemplate>
          <AddOrderForm />
        </Box>
      </Paper>
    </Container>
  );
};

export default AddOrdersPage;
