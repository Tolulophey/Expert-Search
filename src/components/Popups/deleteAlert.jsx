import React from "react";
import PopUpModal from "../PopupModal/index";
import { Stack, Button, Typography, Box, CircularProgress } from "@mui/material";

const DeleteStock = ({ openDeleteStock, message, handleClose, loading, handleDelete}) => {

  const handleClick = async ()=> {
    await handleDelete()
    handleClose()
  }
  const buttonStyle = {
    width: { xs: "100px", md: "200px" },
    height: { xs: "40px", md: "50px" },
    textTransform: "inherit",
    backgroundColor: "#C29B06",
    color: "white",
    borderRadius: "5px",
    fontSize: { xs: "10px", md: "14px" },
    fontWeight: 700,
  };

  return (
    <>
      <PopUpModal openPopUp={openDeleteStock} handleClose={handleClose}>
        <Stack
          width={{ xs: "276px", md: "435px" }}
          maxWidth={"100%"}
          marginX="auto"
          marginBottom={{ xs: "40px", sm: "44px" }}
          alignItems="center"
        >
          <Typography
            variant="h6"
            component="h2"
            textAlign="center"
            marginBottom={{ xs: "35px", sm: "50px" }}
            fontSize={{ xs: "10px", sm: "14px" }}
          >
            {message}
          </Typography>
          <Box
            sx={{
              width: { xs: "250px", md: "100%" },
              display: "flex",
              justifyContent: `${loading ? "center" : "space-between"}`,
            }}
          >
            {loading ? (
              <Stack sx={{ justifyContent: "center", alignItems:"center" }}>
                <CircularProgress sx={{ color: "#fdb73d" }} size={20} />
              </Stack>
            ) : (
              <>
                <Button
                  onClick={handleClick}
                  sx={{
                    ...buttonStyle,
                    ":hover": { backgroundColor: "#C29B06" },
                  }}
                >
                  {"Yes, I'm sure"}
                </Button>
                <Button
                  onClick={handleClose}
                  sx={{
                    ...buttonStyle,
                    backgroundColor: "white",
                    color: "#000000",
                    border: "1px solid black",
                    // boxShadow:
                    //   "0px 4px 4px 0px rgba(0, 0, 0, 0.25), 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset",
                  }}
                >
                  No
                </Button>
              </>
            )}
          </Box>
        </Stack>
      </PopUpModal>
    </>
  );
};

export default DeleteStock;
