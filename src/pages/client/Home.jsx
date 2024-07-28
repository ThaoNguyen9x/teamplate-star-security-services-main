import React from "react";
import Hero from "../../components/client/Hero";
import Service from "../../components/client/Service";
import SecurityServices from "../../components/client/SecurityServices";
import OurSecurity from "../../components/client/OurSecurity";
import Testimonial from "../../components/client/Testimonial";
import SecurityExperts from "../../components/client/SecurityExperts";
import Stats from "../../components/client/Stats";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Service />
      <SecurityServices />
      <OurSecurity />
      <SecurityExperts />
      <Testimonial />
    </>
  );
};

export default Home;
