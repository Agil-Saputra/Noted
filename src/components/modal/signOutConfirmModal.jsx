import { useContext } from "react";
// import MUI components
import { Modal, Box, Typography, Button, Stack } from "@mui/material";
// import context from AuthContext
import { AuthContext } from "../../context/authContext";
// import auth from firebase config
import { auth } from "../../config/client.js";
// import SignOut method from firebase
import { signOut } from "firebase/auth";
// import the router dependencies
import { useNavigate } from "react-router-dom";

export default function signOutConfirmModal({ open, close }) {
  // get current user from AuthContext for get user data and display it ti user interface
  const { dispatch } = useContext(AuthContext);

  // initializing navigate function
  const navigate = useNavigate();

  // create function to logout user from page
  const logOut = () => {
    signOut(auth)
      .then(() => {
        dispatch({ type: "LOGOUT", payload: null });
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: { sm: 300, xs: "80%" },
    bgcolor: "background.paper",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxShadow: 1,
    borderRadius: "5px",
    p: 2,
    display: "grid",
    placeItems: "center",
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="confirmation-modal"
    >
      <Box sx={style} component="div">
        <Typography sx={{ mb: 1 }}>Are you sure you want to Log out?</Typography>
        <Stack spacing={2} direction="row" marginY={1}>
          <Button onClick={logOut} variant="contained">
            Log Out
          </Button>
          <Button onClick={() => close()} color="error" variant="contained">
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}
