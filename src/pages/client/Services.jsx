import React from "react";
import { Link } from "react-router-dom";

import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";

import { servicesData } from "../../../data";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Services = () => {
  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
          {servicesData.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <LazyLoadImage
                src={item.img}
                alt=""
                height={300}
                className="w-full h-full object-cover"
                effect="blur"
              />

              <div className="relative border border-gray-200 p-4 flex flex-col items-center text-center gap-2">
                <div className="bg-white absolute -top-8 p-3">
                  <LazyLoadImage
                    src={item.icon}
                    alt=""
                    className="w-10 h-w-10 object-cover"
                    effect="blur"
                  />
                </div>
                <Link
                  to={item.slug}
                  className="text-lg font-bold uppercase text-nowrap pt-10 hover:text-red-700"
                >
                  {item.title}
                </Link>
                <p className="font-light text-gray-400 h-auto md:h-[50px] text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default Services;
