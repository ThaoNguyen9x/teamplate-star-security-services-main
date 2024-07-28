import React from "react";
import { Link, useParams } from "react-router-dom";
import { IoIosCheckmark } from "react-icons/io";

import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";

import { cctv_mini, expert_mini, affordable_mini } from "../../assets/index";
import { serviceDetails } from "../../../data";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Detail = () => {
  const { slug } = useParams();
  const service = serviceDetails.find((s) => s.slug === slug);

  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-20 flex flex-col xl:flex-row gap-5">
        <div className="w-full xl:w-2/3 flex flex-col gap-10">
          <LazyLoadImage
            src={service.img}
            alt={service.title}
            className="w-full h-[500px] object-cover"
            effect="blur"
          />
          <div className="">
            <h5 className="text-xl font-bold my-2">Star Overview</h5>
            <p className="text-gray-500 text-sm">
              Star Security Services is a leading provider of comprehensive
              security solutions, dedicated to ensuring the safety and
              protection of our clients across various sectors. With years of
              experience in the security industry, we pride ourselves on our
              commitment to excellence, professionalism, and integrity. Our team
              comprises highly trained security professionals equipped with the
              latest technology and best practices to deliver tailored security
              services that meet the unique needs of each client.
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
            <div className="flex flex-col gap-3 items-center text-center">
              <LazyLoadImage
                src={cctv_mini}
                alt="CCTV"
                className="w-14 h-14 object-cover"
                effect="blur"
              />
              <div>
                <p className="text-gray-400 text-xs">EXPLORE THE FEATURES</p>
                <p className="text-xl font-bold">Reliable and Proven</p>
              </div>
              <p className="text-gray-500 text-sm">
                Our expert staff provides reliable and proven security systems
                at affordable prices.
              </p>
            </div>
            <div className="flex flex-col gap-3 items-center text-center">
              <LazyLoadImage
                src={expert_mini}
                alt="Expert"
                className="w-14 h-14 object-cover"
                effect="blur"
              />
              <div>
                <p className="text-gray-400 text-xs">QUALIFIED MEMBERS</p>
                <p className="text-xl font-bold">Experts and Staff</p>
              </div>
              <p className="text-gray-500 text-sm">
                Our team consists of highly qualified members who are experts in
                the field, providing reliable security services.
              </p>
            </div>
            <div className="flex flex-col gap-3 items-center text-center">
              <LazyLoadImage
                src={affordable_mini}
                alt="Affordable"
                className="w-14 h-14 object-cover"
                effect="blur"
              />
              <div>
                <p className="text-gray-400 text-xs">LATEST TECHNOLOGY</p>
                <p className="text-xl font-bold">Affordable Rates</p>
              </div>
              <p className="text-gray-500 text-sm">
                We offer the latest technology in security systems at affordable
                rates to ensure our clients receive the best value.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <h5 className="text-xl font-bold">{service.title}</h5>
            <p className="text-gray-500 text-sm">{service.description}</p>
            <h6 className="text-xl font-bold mt-4">
              Benefits With Our Service
            </h6>
            <div className="text-gray-500">
              {service.benefits.map((benefit, index) => (
                <div key={index} className="flex flex-row gap-5 my-2">
                  <IoIosCheckmark className="text-red-500 w-8 h-8" />
                  <p className="text-sm w-full">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="w-full h-full xl:w-1/3 flex flex-col gap-5 bg-gray-100">
          <div className="p-5 flex flex-col gap-2">
            <h5 className="text-xl font-bold mb-2">Our Business</h5>
            {serviceDetails.map((link) => (
              <Link
                to={`/our-business/${link.slug}`}
                key={link.slug}
                className="py-4 px-5 bg-white hover:text-red-700"
              >
                {link.title}
              </Link>
            ))}
          </div>
          <Link to="/contact-us">
            <div className="px-5 pb-5">
              <LazyLoadImage
                src="https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/banner-a2.png"
                alt=""
                className="w-full h-full xl:h-[500px] object-cover"
                effect="blur"
              />
            </div>
          </Link>
        </div>
      </Wrapper>
    </>
  );
};

export default Detail;
