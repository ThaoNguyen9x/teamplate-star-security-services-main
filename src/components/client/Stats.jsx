import React from "react";
import CountUp from "react-countup";
import Wrapper from "./Wrapper";

const Stats = () => {
  const data = [
    {
      num: "250",
      text: "Objects protected",
    },
    {
      num: "24",
      text: "Years of experience",
    },
    {
      num: "2800",
      text: "Workforce",
    },
    {
      num: "24",
      text: "Operational Presence",
    },
  ];

  return (
    <Wrapper className="pt-20">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {data.map((item, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
            <CountUp
              end={parseInt(item.num)}
              duration={5}
              delay={1}
              className="text-4xl xl:text-6xl font-extrabold text-red-700 mb-2"
            />
            <p className="text-gray-600 text-lg">{item.text}</p>
          </div>
        ))}
      </div>
    </Wrapper>
  );
};

export default Stats;
