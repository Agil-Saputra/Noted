import { Modal, Box, Typography, Button, Icon, Stack } from "@mui/material";
import { db } from "../../config/client";
import { doc, deleteDoc } from "firebase/firestore";

export default function deleteModal({ open, close, id }) {
    async function deleteNote(noteId) {
      const userDoc = doc(db, "Notes", noteId)
      deleteDoc(userDoc)
    }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {sm: 500, xs: '90%'},
    bgcolor: "background.paper",
    border: "1px solid rgba(0, 0, 0, 0.12)",
    boxShadow: 1,
    borderRadius: "5px",
    p: 4,
  };

  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} component='div'>
        <Typography>Are you sure Delete this notes?</Typography>
        <Typography>The notes will be Deleted Permanently</Typography>
        <Stack spacing={2} direction='row' marginY={1}>
        <Button onClick={() => {deleteNote(id)}} variant="contained">Confirm</Button>
        <Button onClick={() => {close()}} color="error" variant="contained">Cancel</Button>
        </Stack>
      </Box>
    </Modal>
  );
}
