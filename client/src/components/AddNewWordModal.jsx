import { CircularProgress, makeStyles, Modal } from "@material-ui/core";
import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import { Button } from "@material-ui/core";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  modal: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  addWordForm: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    padding: theme.spacing(2, 4, 3),
  },
}));

const AddNewWordModal = ({
  showAddForm,
  handleSubmit,
  setShowAddForm,
  searchText,
  setSearchText,
  loading,
  setLoading,
}) => {
  const classes = useStyles();
  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={showAddForm}
        onClose={() => setShowAddForm(false)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}>
        <Fade in={showAddForm}>
          <div className={classes.addWordForm}>
            <Typography variant="h6">Add To Dictionary</Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="standard-basic"
                label="New Word"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <Button onClick={() => setShowAddForm(false)}>Cancel</Button>
              <Button onClick={handleSubmit}>
                {loading ? <CircularProgress color="secondary" /> : "Add"}
              </Button>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default AddNewWordModal;
