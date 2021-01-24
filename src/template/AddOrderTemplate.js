import React from "react";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { spacing } from "@material-ui/system";

const AddOrderTemplate = ({ children }) => {
  return (
    <Grid item xs={12}>
      <Box mb={2}>{children}</Box>
    </Grid>
  );
};

export default AddOrderTemplate;
