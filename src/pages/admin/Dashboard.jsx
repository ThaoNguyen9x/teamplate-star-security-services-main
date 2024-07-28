import React from "react";
import Card from "../../components/admin/Card";
import Transactions from "../../components/admin/Transactions";
import Chart from "../../components/admin/Chart";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const { pathname } = useLocation();

  const data = [
    {
      id: 1,
      title: "Total Users",
      number: 3400,
      dataKey: "users",
      percentage: 10,
      chartData: [
        { name: "Sun", users: 400 },
        { name: "Mon", users: 600 },
        { name: "Tue", users: 500 },
        { name: "Wed", users: 700 },
        { name: "Thu", users: 400 },
        { name: "Fri", users: 300 },
        { name: "Sat", users: 500 },
      ],
    },
    {
      id: 2,
      title: "Total Products",
      number: 143,
      dataKey: "products",
      percentage: 21,
      chartData: [
        { name: "Sun", products: 13 },
        { name: "Mon", products: 45 },
        { name: "Tue", products: 15 },
        { name: "Wed", products: 9 },
        { name: "Thu", products: 35 },
        { name: "Fri", products: 20 },
        { name: "Sat", products: 8 },
      ],
    },
    {
      id: 3,
      title: "Total Revenue",
      number: "$123.231",
      dataKey: "revenue",
      percentage: -12,
      chartData: [
        { name: "Sun", revenue: 200 },
        { name: "Mon", revenue: 100 },
        { name: "Tue", revenue: 400 },
        { name: "Wed", revenue: 50 },
        { name: "Thu", revenue: 259 },
        { name: "Fri", revenue: 146 },
        { name: "Sat", revenue: 70 },
      ],
    },
    {
      id: 4,
      title: "Total Ratio",
      number: 2.6,
      dataKey: "ratio",
      percentage: 12,
      chartData: [
        { name: "Sun", ratio: 100 },
        { name: "Mon", ratio: 150 },
        { name: "Tue", ratio: 30 },
        { name: "Wed", ratio: 500 },
        { name: "Thu", ratio: 319 },
        { name: "Fri", ratio: 146 },
        { name: "Sat", ratio: 90 },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-5 mt-5">
      <div className="font-semibold text-xl capitalize">
        {pathname.split("/").pop()}
      </div>
      <div className="flex-[4] flex flex-col gap-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {data.map((item) => (
            <Card key={item.id} item={item} />
          ))}
        </div>
        <Transactions />
        <Chart />
      </div>
    </div>
  );
};

export default Dashboard;
