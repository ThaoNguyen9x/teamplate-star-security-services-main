import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import Wrapper from "./Wrapper";
import { LazyLoadImage } from "react-lazy-load-image-component";

import {
  police_mini,
  police_mini_2,
  armor_mini,
  safety_mini,
  security_mini,
  firetruck_mini,
  firestation_mini,
  computer_mini,
} from "../../assets/index";

const OurSecurity = () => {
  const data = [
    {
      id: 1,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-10-770x500.jpg",
      icon: police_mini,
      title: "Commercial Services",
      desc: "Commercial services provide our companies security professional & best guard.",
    },
    {
      id: 2,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-02-770x500.jpg",
      icon: armor_mini,
      title: "Home & Office Service",
      desc: "Home and Office Services for we provide a our best experienced security guard.",
    },
    {
      id: 3,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-11-770x500.jpg",
      icon: safety_mini,
      title: "Crowd Management",
      desc: "Our mobile patrolling staff are managed a Crowd Management service to easily.",
    },
    {
      id: 4,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-04-770x500.jpg",
      icon: firetruck_mini,
      title: "Transport Security",
      desc: "Transport Security give for a clients are travelling high-risky rush in safe.",
    },
    {
      id: 5,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/service-05-770x500.jpg",
      icon: security_mini,
      title: "Security Consulting",
      desc: "Our Expert guards always Consulting for a clients to provide a best security.",
    },
    {
      id: 6,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2019/05/service-06-770x500.jpg",
      icon: police_mini_2,
      title: "Special Event Security",
      desc: "Special Event Security for provides event managed expert professional guards.",
    },
    {
      id: 7,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2019/04/service-07-770x500.jpg",
      icon: firestation_mini,
      title: "Construction Security",
      desc: "Construction Security provide a companies experts security best staff member.",
    },
    {
      id: 8,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2019/04/service-08-770x500.jpg",
      icon: computer_mini,
      title: "Corporate Security",
      desc: "Corporate Security provides our companies security professionals protections.",
    },
  ];

  return (
    <Wrapper className="py-20">
      <div className="flex flex-row md:flex-col">
        <div className="font-semibold">
          <h6 className="relative inline-block pb-4 text-sm text-gray-400">
            <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
              OUR SECURITY
            </span>
          </h6>
          <div className="flex flex-col md:flex-row gap-5 my-1">
            <motion.h2
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="text-3xl leading-tight"
            >
              PROFESSIONAL SECURITY
            </motion.h2>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row py-10">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="flex-1"
        >
          <LazyLoadImage
            src="https://s4ucy.com/wp-content/uploads/2024/01/Security4u-scaled.webp"
            alt=""
            className="w-full h-full object-cover"
            effect="blur"
          />
        </motion.div>
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="flex-1 pt-10 md:p-10"
        >
          <div className="flex flex-col gap-5">
            <h3 className="text-2xl font-bold">
              Effective integrated security
            </h3>
            <p className="text-gray-500 text-sm">
              Get best security from a caring and professionals bodyguards. Our
              solution are cost effective аnd we are the еnѕurіng thаt you and
              уоur ѕtаff аrе рrоtесt аgаіnѕt an аttасk.
            </p>
            <div className="flex flex-col gap-5">
              <p className="flex items-center gap-5 text-gray-500 text-sm">
                <i className="bi bi-square-fill text-red-700 text-xs"></i>
                Experienced Security Staff
              </p>
              <p className="flex items-center gap-5 text-gray-500 text-sm">
                <i className="bi bi-square-fill text-red-700 text-xs"></i>
                Mobile Patrol Managing Guard
              </p>
              <p className="flex items-center gap-5 text-gray-500 text-sm">
                <i className="bi bi-square-fill text-red-700 text-xs"></i>
                Individual Security Services
              </p>
            </div>
            <div className="my-4">
              <Link
                to="/"
                className="text-white bg-red-700 hover:bg-[#1a191d] rounded transition duration-300 px-5 py-3 uppercase font-medium text-sm"
              >
                Read more
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
};

export default OurSecurity;
