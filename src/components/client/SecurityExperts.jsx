import React from "react";
import Wrapper from "./Wrapper";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

const SecurityExperts = () => {
  const data = [
    {
      id: 1,
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/01/team-04-500x700.jpg",
      name: "Karlo martin",
      position: "Co-Founder",
    },
    {
      id: 2,
      image: "https://demo.themexbd.com/html/securtv/assets/images/team-04.jpg",
      name: "rubel martin",
      position: "Founder",
    },
    {
      id: 3,
      image:
        "https://bostonsecurityagency.com/wp-content/uploads/2022/05/handsome-bodyguard-in-sunglasses-talking-by-portab-P88D8US.jpg",
      name: "norton berry",
      position: "managing director",
    },
  ];

  return (
    <Wrapper className="py-20 bg-[#1a191d] text-white">
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
      >
        <div className="flex flex-row md:flex-col items-center text-center">
          <div className="font-semibold">
            <h6 className="relative inline-block pb-4 text-sm">
              <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
                SECURITY EXPERTS
              </span>
            </h6>
            <div className="flex flex-col md:flex-row gap-5 my-1">
              <h2 className="text-3xl leading-tight">MEET OUR BODYGUARDS</h2>
            </div>
          </div>
        </div>

        <Swiper
          breakpoints={{
            340: {
              slidesPerView: 1,
              spaceBetween: 15,
            },
            700: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            900: {
              slidesPerView: 3,
              spaceBetween: 15,
            },
          }}
          modules={[Pagination]}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          className="w-full flex items-center gap-5 py-10"
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              className="relative w-full h-[500px]"
            >
              <img
                src={item.image}
                alt=""
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-end gap-2 bg-black bg-opacity-50 text-white text-center py-4 opacity-0 transition-opacity duration-300 hover:opacity-100">
                <h4 className="text-xl font-bold uppercase">{item.name}</h4>
                <p className="text-red-700 text-sm uppercase font-medium">
                  {item.position}
                </p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>
    </Wrapper>
  );
};

export default SecurityExperts;
