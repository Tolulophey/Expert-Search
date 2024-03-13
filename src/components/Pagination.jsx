/* eslint-disable react/prop-types */
import * as React from "react";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IconButton } from "@mui/material";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export default function ListPagination({
  count,
  rowsPerPage,
  page,
  handleChange,
  handleNextButtonClick,
  handleBackButtonClick,
}) {
  return (
   
      <Stack marginTop={"40px"} spacing={"20px"} alignItems={"center"} justifyContent={{xs: "center",  md: "flex-end"}} direction={"row"}>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          sx={{ width: "max-content", border: "1px solid #BCBCBC" }}
        >
          <CaretLeft color={page === 0 ? "#BCBCBC" : "#185BC3"} size={24} />
        </IconButton>
        <Pagination
          page={page + 1}
          count={Math.ceil(count / rowsPerPage)}
          hidePrevButton
          hideNextButton
          onChange={handleChange}
          size="large"
        />

        <IconButton
          onClick={handleNextButtonClick}
          sx={{ width: "max-content", border: "1px solid #BCBCBC" }}
        >
          <CaretRight color="#185BC3" size={24} />
        </IconButton>
      </Stack>
   
  );
}
