import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import Backdrop from "@material-ui/core/Backdrop";
import Typography from "@material-ui/core/Typography";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { Modal } from "@material-ui/core";
import { Fade } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { loadWords, wordAdded } from "../store/words";
import AddNewWordModal from "./AddNewWordModal";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    marginTop: "50px",
    backgroundColor: theme.palette.background.paper,
    overflow: "auto",
    fontFamily: "Kumbh Sans",
  },
  inline: {
    display: "inline",
  },
  modal: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    height: "100vh",
    width: "100vh",
    marginTop: "10vh",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  fab: {
    position: "fixed",
    bottom: "20px",
    right: 10,
  },
}));

const WordsList = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const dictionary = useSelector((state) => state.entities.words.list);
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getAllWords = async () => {
      dispatch(loadWords());
    };
    getAllWords();
  }, [dispatch]);

  //Adding new Word
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!searchText) return;
    setLoading(true);
    const { data } = await axios.post(
      "https://vocabs-dictionary.herokuapp.com/verifyword",
      {
        word: searchText,
      }
    );
    dispatch(wordAdded(data));

    setSearchText("");
    setLoading(false);
    setShowAddForm(false);
  };

  return (
    <>
      <List className={classes.root}>
        {dictionary &&
          dictionary.map((word, idx) => {
            return (
              <React.Fragment key={word.key}>
                <ListItem
                  alignItems="flex-start"
                  onClick={() => {
                    setOpen(true);
                    setCurrentWord(idx);
                  }}>
                  <ListItemText
                    primary={word.key}
                    secondary={
                      <React.Fragment>
                        <Typography
                          component="span"
                          variant="body2"
                          className={classes.inline}
                          color="textPrimary">
                          ({word.category}){word.definition}
                        </Typography>
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="fullWidth" component="li" />
              </React.Fragment>
            );
          })}
      </List>
      <Fab className={classes.fab} color="primary">
        <AddIcon onClick={() => setShowAddForm(true)}>Add word</AddIcon>
      </Fab>
      {/* Full Screen Modal */}
      <Modal
        className={classes.modal}
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={open}>
          <div className={classes.paper}>
            <button
              style={{ border: "none", marginLeft: "98%" }}
              onClick={() => setOpen(false)}>
              x
            </button>
            <h1 id="transition-modal-title">
              {dictionary && dictionary[currentWord]?.key}
            </h1>
            <p id="transition-modal-description">
              {dictionary && dictionary[currentWord]?.category}
            </p>
            <p>{dictionary && dictionary[currentWord]?.etymology}</p>
            {dictionary && dictionary[currentWord]?.definition}
            <p>
              <li>{dictionary && dictionary[currentWord]?.example}</li>
            </p>
            <p>
              <li>{dictionary && dictionary[currentWord]?.shortDef}</li>
            </p>
            <p>
              <li>{dictionary && dictionary[currentWord]?.subExample}</li>
            </p>
          </div>
        </Fade>
      </Modal>

      {/* Add Word Modal */}
      <AddNewWordModal
        loading={loading}
        setLoading={setLoading}
        showAddForm={showAddForm}
        handleSubmit={handleSubmit}
        setShowAddForm={setShowAddForm}
        searchText={searchText}
        setSearchText={setSearchText}
      />
    </>
  );
};

export default WordsList;
