import React from "react";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip } from "recharts";

const Card = React.memo(({ item }) => {
  return (
    <div
      key={item.id}
      className="flex flex-1 justify-between p-5 bg-gray-100 rounded-md"
    >
      <div className="flex flex-col justify-between gap-5">
        <span className="text-nowrap font-bold text-gray-400 text-xl leading-none">
          {item.title}
        </span>
        <span className="font-bold text-2xl leading-none">{item.number}</span>
        <Link to="/" className="underline">
          See all
        </Link>
      </div>
      <div className="flex flex-col justify-between">
        <ResponsiveContainer width="99%" height="100%">
          <LineChart data={item.chartData}>
            <Tooltip
              contentStyle={{ background: "transparent", border: "none" }}
              labelStyle={{ display: "none" }}
              position={{ x: 10, y: 70 }}
            />
            <Line
              type="monotone"
              dataKey={item.dataKey}
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex flex-col text-end">
          <span
            className={`font-bold text-xl ${
              item.percentage < 0 ? "text-red-700" : "text-green-700"
            }`}
          >
            {item.percentage} %
          </span>
          <span className="text-nowrap">this week</span>
        </div>
      </div>
    </div>
  );
});

export default Card;
