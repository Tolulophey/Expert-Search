/* eslint-disable react/prop-types */
import { FormControl, FormHelperText, MenuItem, Select } from "@mui/material";

const ITEM_HEIGHT = 36;
const ITEM_PADDING_TOP = 8;

const menuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const SelectField = ({
  height,
  error,
  children,
  placeholder,
  label,
  required,
  my,
  ...other
}) => {
  const selectStyle = {
    "& .MuiMenuList-root": {
      height: "150px",
    },

    "& .MuiOutlinedInput-root": {
      //   boxShadow: boxShadow,
      borderRadius: "0.375rem",
    },
    "& .MuiSelect-select": {
      //   color: textColor,
      padding: { xs: "10px 15px", sm: "12px 15px" },
      boxSizing: "border-box",
      //   height: height ? height : "auto",
      fontSize: { xs: "12px", sm: "14px" },
    },
    // "& .MuiInputLabel-outlined.Mui-focused": {
    //   color: textColor,
    // },
    // "& .MuiSvgIcon-root": {
    //   color: textColor,
    // },

    "& .MuiOutlinedInput-notchedOutline": {
      //   borderColor: color,
      borderRadius: "0.375rem",
    },

    "& .MuiInputBase-formControl": {
      "&.Mui-focused fieldset": {
        borderColor: "rgb(55 65 81)",
        color: "rgb(55 65 81)",
      },
      //   "&:hover fieldset": {
      //     borderColor: color,
      //   },
    },
  };

  return (
    <div>
      <label className="text-[12px] md:text-[16px]">
        {label}
        <span className="text-red-600">{required && "*"}</span>
      </label>
      <Select
        fullWidth
        defaultValue={""}
        sx={{ ...selectStyle, marginY: my ? my : "8px" }}
        MenuProps={menuProps}
        {...other}
      >
        <MenuItem sx={{ fontSize: "12px" }} value="" disabled>
          {placeholder}
        </MenuItem>
        {children}
      </Select>
      {error && <p className="text-[red] text[10px]">{error}</p>}
    </div>
  );
};

export default SelectField;
