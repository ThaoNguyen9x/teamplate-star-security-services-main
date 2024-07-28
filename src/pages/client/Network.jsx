import React from "react";

import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";

import { branchesData } from "../../../data";

const generateMapLink = (address) => {
  const baseUrl = "https://maps.google.com/maps";
  const query = `?q=${encodeURIComponent(address)}&output=embed`;
  return baseUrl + query;
};

const Network = () => {
  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-20">
        <div className="flex flex-col items-center justify-center text-center">
          <h6 className="relative inline-block pb-4 text-sm text-gray-400 font-semibold">
            <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
              OUR NETWORK
            </span>
          </h6>
          <div className="flex flex-col items-center justify-center gap-5">
            <h2 className="text-3xl leading-tight font-extrabold">
              STAR SECURITY BRANCHES
            </h2>
            <p className="font-light text-gray-500 w-full xl:w-2/3">
              Discover our network of branches across various regions, providing
              dedicated support and services. If you have any questions, please
              don't hesitate to reach out.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 my-16">
          {branchesData.map((branch, index) => (
            <div
              key={index}
              className="p-5 border rounded shadow-md flex flex-col xl:flex-row gap-5"
            >
              <div className="w-full xl:w-1/2 flex flex-col gap-2">
                <h3 className="text-xl font-semibold">{branch.region}</h3>
                <div className="">
                  <strong>Address:</strong> {branch.details.address}
                </div>
                <div className="">
                  <strong>Phone:</strong> {branch.details.contact}
                </div>
                <div className="">
                  <strong>Fax:</strong> {branch.details.fax}
                </div>
                <div className="">
                  <strong>Contact Person:</strong>{" "}
                  {branch.details.contactPerson}
                </div>
              </div>
              <div className="w-full">
                <iframe
                  width="100%"
                  height="300"
                  src={generateMapLink(branch.details.address)}
                  title={`Map of ${branch.region}`}
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

export default Network;
