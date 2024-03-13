import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import AppLayout from "./Layout/App";
import axios from "./utils/axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Search from "./pages/Search";
import { updateLocationSuccess } from "./redux/location/location";

function App() {
  const { chosenCountry } = useSelector((state) => state.location);
  // const dispatch = useDispatch()
  // const [IP, setIP] = useState("")

  

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("https://api.ipify.org/?format=json");
  //       setIP(res.data.ip);

  //       const location = await axios.get(`https://ipinfo.io/${IP}`);

  //       if (location) {
  //         dispatch(updateLocationSuccess(location.data));
  //         // toast.success("location found successfully!!!");
  //         // setLoading(false);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   fetchData();
  // }, []);

  // console.log(chosenCountry)
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       dispatch(getCategoriesStart());
  //       const { data } = await axios.get("/categories");

  //       dispatch(getCategoriesSuccess(data.data));
  //     } catch (error) {
  //       console.log(error);
  //       dispatch(getCategoriesFailure(error.message));
  //     }
  //   };
  //   fetchData();
  // }, []);

  return (
    <Router>
      <>
        <Routes>
          {/* open routes */}
         {!chosenCountry && <Route index element={<Search />} />}
          <Route path="/" element={<AppLayout />}>
            {/* {!chosenCountry && <Route index element={<Search />} />} */}
            {chosenCountry && <Route index element={<Home />} />}
            <Route path="about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Route>
        </Routes>
      </>
    </Router>
  );
}

export default App;
