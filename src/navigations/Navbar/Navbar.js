import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  margin: 0 20px;
  font-family: sans-serif;
`;

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function DenseAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Container fixed>
          <Toolbar variant="dense">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/addOrdersPage">Add new order</NavLink>
            <NavLink to="/OrdersPage">Orders List</NavLink>
            <NavLink to="/DoneOrdersPage">Finished orders</NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}
