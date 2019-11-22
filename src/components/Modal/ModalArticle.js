import React from "react";
import { TextField } from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import axios from "axios";

import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// import { Editor } from "react-draft-wysiwyg";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid #000",
    boxShadow: theme.shadows[5],
    borderRadius: 8,
    padding: theme.spacing(2, 4, 3)
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginBottom: 20,
    width: "100%"
  }
}));

const ModalArticle = props => {
  const initialState = {
    title: "",
    spoiler: "",
    type: "",
    content: "",
    image: ""
  };
  const classes = useStyles();
  const [input, setInput] = React.useState(initialState);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setInput({ ...input, type: props.title });
    }, 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [props, input]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(input, props.title, "submit");

    // if (props.title === "promo")
    addArticle();
  };

  const addArticle = () => {
    // console.log(process.env.REACT_APP_BASE_URL, "ini env");
    const config = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    const formData = new FormData();
    formData.append("title", input.title);
    formData.append("image", input.image);
    formData.append("spoiler", input.spoiler);
    formData.append("content", input.content);
    formData.append("type", input.type);

    axios
      .post(`${process.env.REACT_APP_BASE_URL}/articles`, formData, config)
      .then(response => {
        if (response.data.status === "success") {
          console.log(response, "response");
          props.onAdd();
          setInput(initialState);
          props.closeModal();
        } else {
          alert(response.data.response);
        }
      })
      .catch(err => {
        alert(`Error add ${props.title}`);
        console.log(err, "err");
      });
  };

  const photoChange = e => {
    setInput({ ...input, image: e.target.files[0] });
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={props.visible}
      onClose={props.closeModal}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500
      }}
    >
      <Fade in={props.visible}>
        <div className={classes.paper}>
          <h3 id="transition-modal-title">
            {props.title === "promo" ? "Add Promo" : "Add Information"}
          </h3>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField
                id="title"
                label="Title"
                type="text"
                className={classes.textField}
                margin="dense"
                variant="outlined"
                onChange={e => setInput({ ...input, title: e.target.value })}
              />
              <label style={{ color: "#999" }}>Image</label>
              <br />
              <input
                type="file"
                onChange={photoChange}
                style={{ marginBottom: 10 }}
              />

              <TextField
                id="spoiler"
                label="spoiler"
                type="text"
                className={classes.textField}
                margin="dense"
                variant="outlined"
                onChange={e => setInput({ ...input, spoiler: e.target.value })}
              />
              <CKEditor
                editor={ClassicEditor}
                style={{ height: "200px" }}
                // data="<p>Hello from CKEditor 5!</p>"
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setInput({ ...input, content: data });
                }}
              />
            </div>
            <div style={{ marginTop: 20 }}>
              <Button
                variant="contained"
                color="primary"
                style={{ backgroundColor: "#4caf50", marginRight: 20 }}
                onClick={handleSubmit}
              >
                Add
              </Button>
              <Button style={{ color: "#f44336" }} onClick={props.closeModal}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalArticle;
