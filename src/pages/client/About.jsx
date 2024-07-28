import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";

import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";

import { apostrophe_mini } from "../../assets/index";
import { testimonialData, positionData } from "../../../data";
import { LazyLoadImage } from "react-lazy-load-image-component";

const About = () => {
  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div>
            <h6 className="relative inline-block pb-4 text-sm text-gray-400 font-semibold">
              <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
                ABOUT STAR
              </span>
            </h6>
            <div className="flex flex-col gap-5">
              <h2 className="text-3xl leading-tight font-extrabold">
                WE PROVIDE SECURITY WITH SMART FEATURES SINCE 2000
              </h2>
              <p className="font-light text-sm text-gray-500">
                We are a residential and commercial security provider,
                introducing all types of the most accessible security systems
                for smart security.
              </p>
            </div>

            <div className="my-5 flex flex-col gap-5 font-light">
              <p className="text-sm text-gray-500">
                Latest technology with security solutions to provide you the
                high level of protection in your home and business.
              </p>
              <div className="grid grid-cols-2 gap-5">
                {[
                  "Experienced Security Staff",
                  "Expertise & Honesty",
                  "24/7 Quick Alarm Response",
                  "Latest Security Techniques",
                  "Commercial Security",
                  "Affordable Service",
                ].map((item, index) => (
                  <p
                    key={index}
                    className="flex items-center gap-5 text-gray-500 text-sm"
                  >
                    <i className="bi bi-square-fill text-red-700 text-xs"></i>
                    {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex flex-col gap-4 w-1/2">
              <div className="flex justify-center">
                <LazyLoadImage
                  className="h-full xl:h-48 w-full object-cover rounded-lg"
                  src="https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/about-01-a.jpg"
                  alt="Security Image 1"
                  effect="blur"
                />
              </div>
              <div className="flex justify-center">
                <LazyLoadImage
                  className="h-full xl:h-48 w-full object-cover rounded-lg"
                  src="https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/blog-07-770x770.jpg"
                  alt="Security Image 2"
                  effect="blur"
                />
              </div>
            </div>
            <div className="flex justify-center w-1/2">
              <LazyLoadImage
                className="h-full w-full object-cover rounded-lg"
                src="https://ceylonguard.lk/wp-content/uploads/2022/09/team-03.jpg"
                alt="Security Image 3"
                effect="blur"
              />
            </div>
          </div>
        </div>
      </Wrapper>

      <Wrapper className="my-20">
        <div className="flex flex-col items-center text-center">
          <div className="font-semibold uppercase">
            <h6 className="relative inline-block pb-4 text-sm text-gray-400 font-semibold">
              <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
                Leadership Team
              </span>
            </h6>
            <div className="flex flex-col md:flex-row gap-5 my-1">
              <h2 className="text-3xl leading-tight font-extrabold">
                Meet Our Visionary Leadership Team
              </h2>
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
            {positionData.map((item, index) => (
              <SwiperSlide key={index} className="relative flex items-center">
                <div className="relative w-full h-[500px] group">
                  <img
                    src={item.img}
                    alt=""
                    className="w-full  h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 flex items-end justify-center text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 p-5">
                    <div className="bg-red-700 absolute right-0 top-0 w-0 h-full transition-all duration-300 group-hover:w-full opacity-55"></div>
                    <div className="relative flex flex-col gap-2">
                      <h4 className="text-3xl font-extrabold uppercase text-white">
                        {item.name}
                      </h4>
                      <p className="text-red-700 text-lg uppercase font-bold">
                        {item.position}
                      </p>
                      <p className="text-white text-xs font-bold">
                        {item.biography}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Wrapper>

      <Wrapper className="my-20">
        <div className="flex flex-col items-center text-center">
          <div className="font-semibold uppercase">
            <h6 className="relative inline-block pb-4 text-sm text-gray-400 font-semibold">
              <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
                TESTIMONIALS
              </span>
            </h6>
            <div className="flex flex-col md:flex-row gap-5 my-1">
              <h2 className="text-3xl leading-tight font-extrabold">
                WHAT PEOPLE SAY
              </h2>
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
            className="w-full flex gap-5 py-10"
          >
            {testimonialData.map((item) => (
              <SwiperSlide key={item.id} className="flex flex-col gap-5">
                <div className="relative flex flex-col gap-3 p-8 bg-gray-100">
                  <div className="absolute -top-5 right-5 p-3 bg-red-700 rounded-full">
                    <img
                      src={apostrophe_mini}
                      alt=""
                      className="w-7 h-7 object-cover"
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
                  <p className="font-medium h-full xl:h-[100px]">{item.feedback}</p>
                </div>
                <div className="flex items-center gap-5">
                  <LazyLoadImage
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 object-cover rounded-full"
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
      </Wrapper>
    </>
  );
};

export default About;
