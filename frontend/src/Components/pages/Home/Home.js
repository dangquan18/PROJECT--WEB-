import React from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import Header from "../../Layout/Header/Header";
import Featured from "../../Layout/Featured/Features";
import Carousel from "../../Layout/Carousel/Carousel";
import AboutUs from "../../Layout/Aboutus/AboutUs";
import Contact from "../../Layout/Contact/Contact";
import Footer from "../../Layout/Footer/Footer";
function Home() {
  return (
    <>
      <Navbar />
      <Header />
      <Featured />
      <AboutUs />
      <Contact />
      <Footer />
    </>
  );
}
export default Home;
