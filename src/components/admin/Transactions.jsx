import React from "react";

const Transactions = () => {
  const dataColumns = [
    { field: "#" },
    { field: "Customer" },
    { field: "Date" },
    { field: "Amount" },
    { field: "Payment Method" },
    { field: "Status" },
  ];

  const dataRows = [
    {
      id: 1,
      customer: "fubao",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdSy3dACp1ORaJy7wJUPlKpp8cQbMbmjPIQ&s",
      date: "14.02.2023",
      amount: 2424,
      method: "cash on delivery",
      status: "pending",
    },
    {
      id: 2,
      customer: "fubao",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdSy3dACp1ORaJy7wJUPlKpp8cQbMbmjPIQ&s",
      date: "14.02.2023",
      amount: 1999,
      method: "online payment",
      status: "approved",
    },
    {
      id: 3,
      customer: "fubao",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKdSy3dACp1ORaJy7wJUPlKpp8cQbMbmjPIQ&s",
      date: "14.02.2023",
      amount: 1999,
      method: "online payment",
      status: "cancelled", // Fixed typo
    },
  ];

  return (
    <div className="p-5 bg-gray-100 rounded-md">
      <h2 className="text-gray-400 text-xl font-bold leading-none mb-4">
        Latest Transactions
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full text-center">
          <thead className="bg-gray-200 font-bold uppercase">
            <tr>
              {dataColumns.map((column) => (
                <th
                  scope="col"
                  key={column.field}
                  className="px-6 py-3 text-gray-600"
                >
                  {column.field}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="capitalize">
            {dataRows.map((row, index) => (
              <tr key={row.id}>
                <td className="px-6 py-3">{index + 1}</td>
                <td className="flex items-center justify-center gap-4 px-6 py-3">
                  <img
                    src={row.image}
                    alt={`${row.customer}'s avatar`}
                    className="h-10 w-10 object-cover rounded-full"
                  />
                  {row.customer}
                </td>
                <td className="px-6 py-3">{row.date}</td>
                <td className="px-6 py-3">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(row.amount)}
                </td>
                <td className="px-6 py-3">{row.method}</td>
                <td className="px-6 py-3">
                  <span
                    className={`${
                      row.status === "pending"
                        ? "bg-red-700"
                        : row.status === "approved"
                        ? "bg-green-700"
                        : "bg-gray-700"
                    } text-white px-2 py-1 rounded-md`}
                  >
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Transactions;
