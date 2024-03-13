import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// eslint-disable-next-line react/prop-types
const Datepicker = ({ date, onChange, other }) => {
  return <DatePicker   minDate={new Date()}  selected={date} onChange={onChange} {...other} />;
};

export default Datepicker;
