import React from "react";

import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";

import { historiesData } from "../../../data";

const History = () => {
  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-20">
        <div className="flex flex-col items-center justify-center text-center">
          <h6 className="relative inline-block pb-4 text-sm text-gray-400 font-semibold">
            <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
              OUR HISTORY
            </span>
          </h6>
          <h2 className="text-3xl leading-tight font-extrabold">
            A Journey Through Time
          </h2>
          <p className="font-light text-gray-500 w-full xl:w-2/3">
            Explore the significant milestones in our journey, showcasing our
            growth and commitment to quality in the security industry.
          </p>
        </div>

        <ol className="relative border-l border-gray-300 my-16">
          {historiesData.map((item, index) => (
            <li key={index} className="mb-10 ml-6">
              <span className="absolute flex items-center justify-center w-4 h-4 bg-red-700 rounded-full -left-2"></span>
              <h3 className="flex items-center mb-1 text-4xl font-semibold text-red-700">
                {item.year}
              </h3>
              {item.children &&
                item.children.map((child, childIndex) => (
                  <div key={childIndex} className="ml-6">
                    <h4 className="font-semibold text-lg">{child.title}</h4>
                    <p className="mb-4 font-normal text-gray-500">
                      {child.desc}
                    </p>
                    {child.quote && (
                      <blockquote className="italic text-gray-600">
                        “{child.quote}”
                      </blockquote>
                    )}
                    {child.milestones && (
                      <p className="mt-2 text-gray-500">
                        <strong>Milestones:</strong> {child.milestones}
                      </p>
                    )}
                  </div>
                ))}
            </li>
          ))}
        </ol>
      </Wrapper>
    </>
  );
};

export default History;
