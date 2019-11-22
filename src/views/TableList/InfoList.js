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
import ModalArticle from "../../components/Modal/ModalArticle";

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
    float: "left",
    // backgroundColor: "black",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  button: {
    float: "right"
  }
};

const useStyles = makeStyles(styles);

export default function InfoList() {
  const [modalIsOpen, setModalOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [listInfo, setLisInfo] = React.useState([]);

  const fetchData = () => {
    setLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/articles/type/info`)
      .then(response => {
        console.log(response);
        setLisInfo(() =>
          response.data.response.map((item, index) => [
            <img
              src={`${process.env.REACT_APP_BASE_URL}${item.image}`}
              key={index}
              style={{
                width: 150,
                height: 100,
                borderRadius: 8
                // backgroundSize: "cover"
              }}
              alt={item.title}
            />,
            item.title,
            moment(item.date_add)
              .utc()
              .format("DD-MM-YYYY"),
            moment(item.date_add)
              .utc()
              .format("DD-MM-YYYY"),
            <Button
              // variant="contained"
              // color="#f44336"
              style={{ color: "#f44336" }}
              // onClick={() => deleteRow(item.id)}
              onClick={() => {
                if (window.confirm(`Are you sure you to delete ${item.title}?`))
                  // this.deleteItem(e);
                  deleteRow(item.id);
              }}
              key={index}
            >
              Delete
            </Button>
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

  const deleteRow = articleId => {
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}/articles/${articleId}`)
      .then(response => {
        if (response.data.status === "success") {
          fetchData();
        }
      });
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };
  const classes = useStyles();
  return (
    <GridContainer>
      <ModalArticle
        visible={modalIsOpen}
        closeModal={handleCloseModal}
        title="info"
        onAdd={fetchData}
      />

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h3 className={classes.cardTitleWhite}>Information</h3>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleOpenModal}
            >
              Add
            </Button>
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
                  "Image",
                  "Title",
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
