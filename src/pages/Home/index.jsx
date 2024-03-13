import React from "react";
import Work from "./Work";
import Slider from "./Slider";
import Elegance from "./Elegance";
import Content from "./Content";
// import { teeBridalSlide1, teeBridalSlide2, teeBridalSlide3, teeBridalSlide4, teeBridalSlide5 } from "../../../assets/Home/homeSlider";

// const imageUrls = [
//   {
//     type: "img",
//     value: teeBridalSlide1
//   },
//   {
//     type: "img",
//     value: teeBridalSlide2
//   },
//   {
//     type: "img",
//     value: teeBridalSlide3
//   },
//   {
//     type: "img",
//     value: teeBridalSlide4
//   },
//   {
//     type: "img",
//     value: teeBridalSlide5
//   }
// ];

const eleganceImageUrls = [
  "/assets/pexels-eugenia-remark-15283334 1.webp",
  "/assets/pic.jpg",
  "/assets/3 1 (4).webp",
];

function Home() {
  return (
    <>
      {/* <Slider images={imageUrls} /> */}
      {/* <Work /> */}
      <Content />
      {/* <Elegance images={eleganceImageUrls} /> */}
    </>
  );
}

export default Home;
