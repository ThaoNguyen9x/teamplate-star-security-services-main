import React from "react";
import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";
import { branchesData } from "../../../data";

const Contact = () => {
  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-10">
        <div className="flex flex-col items-center text-center">
          <h6 className="relative inline-block pb-4 text-sm text-gray-400 font-semibold">
            <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
              CONTACT US
            </span>
          </h6>
          <h2 className="text-3xl leading-tight font-extrabold">
            Get in Touch
          </h2>
          <p className="font-light text-gray-500 w-full xl:w-2/3">
            If you have any questions or inquiries, please fill out the form
            below or reach out to your nearest branch.
          </p>
        </div>

        <form className="my-10 w-full max-w-lg mx-auto">
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Name"
              className="px-5 py-2 border rounded outline-none"
            />
            <input
              type="email"
              placeholder="Email"
              className="px-5 py-2 border rounded outline-none"
            />
            <input
              type="text"
              placeholder="Phone"
              className="px-5 py-2 border rounded outline-none"
            />
            <input
              type="text"
              placeholder="Subject"
              className="px-5 py-2 border rounded outline-none"
            />
            <select
              name="branch"
              className="px-3 py-2 border rounded col-span-2 outline-none"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a Branch
              </option>
              {branchesData.map((branch, index) => (
                <option
                  key={index}
                  value={branch.details.address}
                  className="truncate"
                >
                  {branch.details.address}
                </option>
              ))}
            </select>
            <textarea
              name="message"
              placeholder="Your Message"
              required
              className="px-5 py-2 border rounded outline-none h-32 col-span-2"
            ></textarea>
            <button
              type="submit"
              className="bg-red-700 text-white p-2 rounded col-span-2"
            >
              Submit
            </button>
          </div>
        </form>
      </Wrapper>
    </>
  );
};

export default Contact;
