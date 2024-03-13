import PropTypes from "prop-types";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Slide,
  Stack,
  Typography,
} from "@mui/material";
import { forwardRef } from "react";
import { X } from "@phosphor-icons/react";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PopUpModal = ({
  maxWidth,
  openPopUp,
  handleClose,
  children,
  borderRadius,
  title,
}) => {
  return (
    <div>
      <Dialog
        fullWidth
        open={openPopUp}
        TransitionComponent={Transition}
        keepMounted
        maxWidth={maxWidth}
        sx={{ "& .MuiPaper-root": { borderRadius: borderRadius } }}
      >
        <DialogTitle sx={{ position: "relative" }} component="div">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="subtitle1">{title}</Typography>
            <IconButton
              onClick={handleClose}
              sx={{
                padding: "0px",
                borderRadius: 0,
                border: "2px solid red",
              }}
            >
              <X color="red" size={20} />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ paddingTop: { xs: "2rem", md: 0 } }}>
          {children}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PopUpModal;

PopUpModal.propTypes = {
  openPopUp: PropTypes.bool,
  handleClose: PropTypes.func,
  children: PropTypes.node,
  borderRadius: PropTypes.string || PropTypes.number,
  title: PropTypes.string,
  maxWidth: PropTypes.string,
};
