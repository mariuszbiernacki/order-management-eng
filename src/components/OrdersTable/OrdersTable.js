import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import VisibilityIcon from "@material-ui/icons/Visibility";
import FilterListIcon from "@material-ui/icons/FilterList";
import DoneIcon from "@material-ui/icons/Done";
import moment from "moment";
import { connect } from "react-redux";
import {
  deleteOrder as deleteOrderAction,
  openProductModal as openProductModalAction,
  openBillModal as openBillModalAction,
  selectOrder as selectOrderAction,
  openEditModal as openEditModalAction,
  openEditProductModal as openEditProductModalAction,
  openEditBillModal as openEditBillModalAction,
  finishOrder as finishOrderAction,
} from "../../actions/actions";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "orderId",
    numeric: true,
    disablePadding: true,
    label: "reference number",
  },
  {
    id: "clientName",
    numeric: false,
    disablePadding: false,
    label: "customer names",
  },
  {
    id: "payment",
    numeric: true,
    disablePadding: false,
    label: "to be paid",
  },
  {
    id: "deliveryDate",
    numeric: false,
    disablePadding: false,
    label: "delivery date",
  },
  {
    id: "paymentDate",
    numeric: false,
    disablePadding: false,
    label: "payment date",
  },

  {
    id: "productsList",
    numeric: true,
    disablePadding: false,
    label: "product list",
  },
  {
    id: "billsList",
    numeric: false,
    disablePadding: false,
    label: "bill list",
  },
  {
    id: "editOrders",
    numeric: false,
    disablePadding: false,
    label: "edit order",
  },
  {
    id: "editProducts",
    numeric: false,
    disablePadding: false,
    label: "add product",
  },
  {
    id: "editBills",
    numeric: false,
    disablePadding: false,
    label: "add bill",
  },
  {
    id: "finishOrder",
    numeric: false,
    disablePadding: false,
    label: "finish order",
  },
];

const EnhancedTableHead = (props) => {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Orders
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton
            aria-label="delete"
            onClick={() => props.deleteOrder(props.selected)}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "95%",
    margin: "auto",
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
  tableRow: {
    backgroundColor: "red",
  },
}));

const OrdersTable = ({
  orders,
  deleteOrder,
  openProductModal,
  openBillModal,
  openEditModal,
  selectOrder,
  openEditProductModal,
  openEditBillModal,
  finishOrder,
}) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const rows = [...orders];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((order) => order.orderId);
      setSelected(newSelecteds);
      return;
    }

    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          selected={selected}
          deleteOrder={deleteOrder}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.orderId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const actualDate = new Date();
                  const formattedActualDate = moment(actualDate).format(
                    "DD/MM/yyyy"
                  );
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.orderId}
                      selected={isItemSelected}
                      style={{
                        backgroundColor:
                          row.paymentDate === formattedActualDate
                            ? "red"
                            : row.deliveryDate === formattedActualDate
                            ? "yellow"
                            : "none",
                      }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          onChange={(event) => handleClick(event, row.orderId)}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row.orderId}
                      </TableCell>
                      <TableCell align="right">{row.clientName}</TableCell>
                      <TableCell align="right">
                        {row.payment} {row.currency}
                      </TableCell>
                      <TableCell align="right">{row.deliveryDate}</TableCell>
                      <TableCell align="right">{row.paymentDate}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="see products">
                          <IconButton
                            aria-label="showProducts"
                            onClick={() => {
                              selectOrder(row.orderId);
                              openProductModal();
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="see bills">
                          <IconButton
                            aria-label="showBills"
                            onClick={() => {
                              selectOrder(row.orderId);
                              openBillModal();
                            }}
                          >
                            <VisibilityIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="edit order">
                          <IconButton
                            aria-label="editOrder"
                            onClick={() => {
                              selectOrder(row.orderId);
                              openEditModal();
                            }}
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="add product">
                          <IconButton
                            aria-label="addProduct"
                            onClick={() => {
                              selectOrder(row.orderId);
                              openEditProductModal();
                            }}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="add bill">
                          <IconButton
                            aria-label="addBill"
                            onClick={() => {
                              selectOrder(row.orderId);
                              openEditBillModal();
                            }}
                          >
                            <AddCircleIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="right">
                        <Tooltip title="finish order">
                          <IconButton
                            aria-label="finishOrder"
                            onClick={() => {
                              selectOrder(row.orderId);
                              finishOrder(row.orderId);
                            }}
                          >
                            <DoneIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    orders: state.orders,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteOrder: (orderId) => dispatch(deleteOrderAction(orderId)),
    openProductModal: () => dispatch(openProductModalAction()),
    openBillModal: () => dispatch(openBillModalAction()),
    openEditModal: () => dispatch(openEditModalAction()),
    selectOrder: (orderId) => dispatch(selectOrderAction(orderId)),
    openEditProductModal: () => dispatch(openEditProductModalAction()),
    openEditBillModal: () => dispatch(openEditBillModalAction()),
    finishOrder: (orderId) => dispatch(finishOrderAction(orderId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrdersTable);
