import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "@material-ui/core/Button";

import axios from "axios";
import moment from "moment";

// import MaterialTable from "material-table";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    // backgroundColor: "black",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

const useStyles = makeStyles(styles);

export default function TransactionList() {
  const [loading, setLoading] = React.useState(true);
  const [listInfo, setLisInfo] = React.useState([]);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/transactions`)
      .then(response => {
        console.log(response);
        setLisInfo(() =>
          response.data.response.map((item, index) => [
            item.invoice_no,
            item.user_id,
            item.amount,
            item.category.name,
            <span
              style={{
                color: item.status === "success" ? "#4caf50" : "#ff9800",
                fontWeight: "bold"
              }}
              key={item.index}
            >
              {item.status}
            </span>,
            moment(item.date_add)
              .utc()
              .format("DD-MM-YYYY"),
            moment(item.date_add)
              .utc()
              .format("DD-MM-YYYY"),
            item.status === "pending" ? (
              <Button
                // variant="contained"
                // color="#f44336"
                style={{ backgroundColor: "#4caf50", color: "white" }}
                // onClick={() => deleteRow(item.id)}
                onClick={() => {
                  if (
                    window.confirm(
                      `Are you sure you to Accept this transaction?`
                    )
                  )
                    // this.deleteItem(e);
                    acceptTransaction(item.invoice_no);
                }}
                key={index}
              >
                Accept
              </Button>
            ) : null
          ])
        );
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  const fetchDataCallback = React.useCallback(fetchData, []);

  React.useEffect(() => {
    const timeOut = setTimeout(() => {
      fetchDataCallback();
    }, 0);

    return () => {
      clearTimeout(timeOut);
    };
  }, [fetchDataCallback]);

  const acceptTransaction = invoiceNo => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/transactions/${invoiceNo}`, {
        status: "success"
      })
      .then(response => {
        console.log(response);
        if (response.data.status === "success") {
          fetchData();
        }
      })
      .catch(error => console.log(error));
  };

  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h3 className={classes.cardTitleWhite}>Transaction</h3>
          </CardHeader>
          <CardBody>
            {loading ? (
              "loading"
            ) : listInfo.length === 0 ? (
              "Data empty"
            ) : (
              <Table
                tableHeaderColor="primary"
                tableHead={[
                  "Invoice",
                  "User",
                  "Amount",
                  "Service",
                  "Status",
                  "Date Add",
                  "Date Update",
                  "Action"
                ]}
                tableData={listInfo}
              />
            )}
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}
