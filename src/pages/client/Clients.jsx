import React, { useState } from "react";
import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Clients = () => {
  const clientsData = [
    {
      id: "01",
      name: "Cha Eun-woo",
      img: "https://kenh14cdn.com/2018/10/19/1-15399341973341104676148.jpg",
      services: ["Manned Guarding", "Electronic Security Systems"],
      staffAssigned: ["John Doe", "Jane Smith"],
    },
    {
      id: "02",
      name: "Blackpink",
      img: "https://phunuvietnam.mediacdn.vn/179072216278405120/2023/7/28/06640315ef550fa7aec05304e3cd26ca849bb030-1690536453937230689864-1690546379368-1690546379465453022497.jpg",
      services: ["Cash Services"],
      staffAssigned: ["Michael Johnson", "Emily Davis"],
    },
    {
      id: "03",
      name: "Jessica Jung",
      img: "https://cdn.tuoitre.vn/thumb_w/480/ttc/r/2021/08/26/ve-si-cua-sao-han-12-1629949871.jpeg",
      services: ["Recruitment and Training", "Manned Guarding"],
      staffAssigned: ["Sarah Wilson", "Chris Brown"],
    },
  ];

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(clientsData.length / itemsPerPage);

  // Slice clientsData to show only the clients for the current page
  const currentClients = clientsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-10">
        <div className="flex flex-col items-center text-center">
          <div className="font-semibold uppercase">
            <h6 className="relative inline-block pb-4 text-sm text-gray-400 font-semibold">
              <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
                Our Clients
              </span>
            </h6>
            <div className="flex flex-col md:flex-row gap-5 my-1">
              <h2 className="text-3xl leading-tight font-extrabold">
                Meet Our Valued Clients
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 my-10">
            {currentClients.map((client) => (
              <div key={client.id} className="flex flex-col gap-2">
                <LazyLoadImage
                  src={client.img}
                  alt={client.name}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover mb-4"
                  effect="blur"
                />
                <div className="relative border border-gray-200 p-4 flex flex-col items-center text-center gap-2">
                  <h5 className="text-lg font-bold uppercase text-nowrap hover:text-red-700">
                    {client.name}
                  </h5>
                  <div className="font-light text-gray-400 text-sm mb-2">
                    <strong className="text-black font-semibold text-base">
                      Services Availed:
                    </strong>
                    <ul className="font-light text-gray-400 h-auto md:h-[50px] text-sm">
                      {client.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="font-light text-gray-400 text-sm">
                    <strong className="text-black font-semibold text-base">
                      Staff Assigned:
                    </strong>
                    <ul className="font-light text-gray-400 h-auto md:h-[50px] text-sm">
                      {client.staffAssigned.map((staff, index) => (
                        <li key={index}>{staff}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center mt-4 space-x-8">
            <button
              className={`px-4 py-2 border rounded-md ${
                currentPage === 1 ? "bg-gray-200" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 border rounded-md ${
                currentPage === totalPages ? "bg-gray-200" : "bg-gray-300 hover:bg-gray-400"
              }`}
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

export default Clients;
