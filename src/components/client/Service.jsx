import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

import {
  police_mini_3,
  training_mini,
  cash_mini,
  security_mini_2,
} from "../../assets/index";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Service = () => {
  const data = [
    {
      id: "01",
      img: police_mini_3,
      title: "Manned Guarding",
      subtitle: "BODYGUARD SECURITY",
      desc: "Security guards, fire squads, dog squads, and bodyguards for various sectors.",
      path: "/",
      name: "GET SAFETY",
    },
    {
      id: "02",
      img: cash_mini,
      title: "Cash Services",
      subtitle: "Secured Cash Handling",
      desc: "Secure cash and valuables transfer, ATM replenishment, vaulting, processing, and caretaker services.",
      path: "/",
      name: "GET GUARD",
    },
    {
      id: "03",
      img: training_mini,
      title: "Recruitment and Training",
      subtitle: "Manpower Solutions",
      desc: "Recruitment, training, and deployment of manpower across various divisions.",
      path: "/",
      name: "GET TRAINING",
    },
    {
      id: "04",
      img: security_mini_2,
      title: "Electronic Security Systems",
      subtitle: "System Integration",
      desc: "Design, installation, and maintenance of electronic security systems.",
      path: "/",
      name: "GET SECURITY",
    },
  ];

  return (
    <Wrapper className="py-20">
      <div className="flex flex-row md:flex-col">
        <div className="font-semibold">
          <h6 className="relative inline-block pb-4 text-sm text-gray-400">
            <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
              WHO WE ARE
            </span>
          </h6>
          <div className="flex flex-col xl:flex-row gap-5 my-1">
            <motion.h2
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="text-3xl leading-tight"
            >
              WHEN YOU NEED ENHANCED SECURITY
            </motion.h2>
            <motion.p
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.2 }}
              className="font-light text-gray-400"
            >
              Our experienced security guards provide tailored security
              solutions to meet your needs. We offer top-notch security systems
              and ensure your safety against any potential harm or attacks.
            </motion.p>
          </div>
        </div>
      </div>

      <div className="w-full my-8 lg:my-10">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.2 }}
          className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4"
        >
          {data.map((item, index) => (
            <div
              key={index}
              className="border border-gray-200 p-8 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between">
                <LazyLoadImage
                  effect="blur"
                  src={item.img}
                  alt=""
                  className="w-20 h-20 object-cover"
                />
                <span className="text-5xl text-gray-200 font-semibold">
                  {item.id}
                </span>
              </div>
              <div className="">
                <p className="text-gray-500 text-sm uppercase">{item.title}</p>
                <h4 className="text-lg font-bold uppercase text-nowrap">
                  {item.subtitle}
                </h4>
              </div>
              <p className="h-[1px] w-full bg-gray-200"></p>
              <p className="font-light text-gray-400 h-auto md:h-[100px]">
                {item.desc}
              </p>
              <Link
                to={item.path}
                className="text-sm font-semibold hover:text-red-700 uppercase"
              >
                {item.name}
              </Link>
            </div>
          ))}
        </motion.div>
      </div>
    </Wrapper>
  );
};

export default Service;
