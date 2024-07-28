import React from "react";
import { Link } from "react-router-dom";
import Wrapper from "./Wrapper";
import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { apostrophe_mini } from "../../assets/index";

const Testimonial = () => {
  const data = [
    {
      id: 1,
      star: 5,
      feedback:
        "These guys always give great security staff and help for attacks. It has been a comfort working with creating the strategy company best expert.",
      name: "Striven Smith",
      brand: "CEO of Digicop",
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2019/06/testimonial-01.jpg",
    },
    {
      id: 2,
      star: 5,
      feedback:
        "It has been a pleasure working with this guys creating the strategy for my company and solved my problems at the moment. This guys real experts.",
      name: "Elena Rusconi",
      brand: "Adviser",
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2019/06/testimonial-02.jpg",
    },
    {
      id: 3,
      star: 5,
      feedback:
        "The Guards are installed & maintain security system my office and their security staff work great. They giving security help when I need Thanks.",
      name: "James Bond",
      brand: "Agent",
      image:
        "https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2019/06/testimonial-03.jpg",
    },
  ];

  return (
    <Wrapper className="py-20">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-0 md:gap-10">
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="relative py-10 px-5"
          style={{
            backgroundImage: `url("https://intrepidsecuritycompany.com/wp-content/uploads/2023/02/bodyguard-reviewing-territory-while-businessman-going-out-from-car-e1668055044863.jpg")`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h6 className="relative inline-block pb-4 text-sm text-white font-semibold">
            <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
              TESTIMONIALS
            </span>
          </h6>
          <div className="flex flex-col md:flex-row gap-5 my-1 font-semibold">
            <h2 className="text-3xl leading-tight text-white">
              WHAT OUR CLIENTS SAY ABOUT US
            </h2>
          </div>
          <div className="my-10">
            <Link
              to="/"
              className="text-[#1a191d] bg-white hover:text-white hover:bg-[#1a191d] rounded transition duration-300 px-5 py-3 uppercase font-medium text-sm"
            >
              Read more
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="col-span-2 mt-8 md:mt-0"
        >
          <div className="flex flex-col">
            <p className="text-gray-500 text-sm">
              We offer security solutions and cost-effective services for our
              clients to ensure they are safe and secure in any situation.
            </p>

            <Swiper
              breakpoints={{
                340: { slidesPerView: 1, spaceBetween: 15 },
                700: { slidesPerView: 2, spaceBetween: 15 },
              }}
              modules={[Pagination]}
              freeMode={true}
              pagination={{ clickable: true }}
              className="w-full flex gap-5 py-10"
            >
              {data.map((item) => (
                <SwiperSlide key={item.id} className="flex flex-col gap-5">
                  <div className="relative flex flex-col gap-3 p-8 bg-gray-100">
                    <div className="absolute -top-5 right-5 p-3 bg-red-700 rounded-full">
                      <img
                        src={apostrophe_mini}
                        alt=""
                        className="w-7 h-7 object-cover"
                        effect="blur"
                      />
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: item.star }).map((_, index) => (
                        <i
                          key={index}
                          className="bi bi-star-fill text-yellow-500"
                        ></i>
                      ))}
                    </div>
                    <p className="font-medium">{item.feedback}</p>
                  </div>
                  <div className="flex items-center gap-5">
                    <LazyLoadImage
                      src={item.image}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover rounded-full"
                      effect="blur"
                    />
                    <div className="uppercase">
                      <h6 className="font-bold text-lg">{item.name}</h6>
                      <p className="text-gray-500 text-sm">{item.brand}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
};

export default Testimonial;
