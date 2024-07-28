import React, { useState } from "react";
import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";
import Job from "../../components/client/Job";

const Careers = () => {
  const jobsData = [
    {
      jobTitle: "Security Officer",
      slug: "security-officer",
      jobLocation: "North",
      employmentType: "Full-time",
      minPrice: "$30,000",
      maxPrice: "$40,000",
      postingDate: "2024-07-15",
      description:
        "Responsible for ensuring the safety and security of the premises.",
      requirements: [
        "Experience in security operations preferred.",
        "Ability to work in a team environment.",
        "Good communication skills.",
      ],
      benefits: [
        "Competitive salary.",
        "Health insurance coverage.",
        "Paid time off.",
      ],
    },
    {
      jobTitle: "Cash Services Manager",
      slug: "cash-services-manager",
      jobLocation: "West",
      employmentType: "Part-time",
      minPrice: "$35,000",
      maxPrice: "$45,000",
      postingDate: "2024-07-10",
      description:
        "Manage cash services operations and ensure compliance with regulations.",
      requirements: [
        "Experience in cash management or banking preferred.",
        "Strong organizational and leadership skills.",
      ],
      benefits: ["Flexible work hours.", "Career growth opportunities."],
    },
    {
      jobTitle: "Cash Services Manager",
      slug: "cash-services-manager",
      jobLocation: "West",
      employmentType: "Part-time",
      minPrice: "$35,000",
      maxPrice: "$45,000",
      postingDate: "2024-07-10",
      description:
        "Manage cash services operations and ensure compliance with regulations.",
      requirements: [
        "Experience in cash management or banking preferred.",
        "Strong organizational and leadership skills.",
      ],
      benefits: ["Flexible work hours.", "Career growth opportunities."],
    },
    {
      jobTitle: "Cash Services Manager",
      slug: "cash-services-manager",
      jobLocation: "West",
      employmentType: "Part-time",
      minPrice: "$35,000",
      maxPrice: "$45,000",
      postingDate: "2024-07-10",
      description:
        "Manage cash services operations and ensure compliance with regulations.",
      requirements: [
        "Experience in cash management or banking preferred.",
        "Strong organizational and leadership skills.",
      ],
      benefits: ["Flexible work hours.", "Career growth opportunities."],
    },
    {
      jobTitle: "Cash Services Manager",
      slug: "cash-services-manager",
      jobLocation: "West",
      employmentType: "Part-time",
      minPrice: "$35,000",
      maxPrice: "$45,000",
      postingDate: "2024-07-10",
      description:
        "Manage cash services operations and ensure compliance with regulations.",
      requirements: [
        "Experience in cash management or banking preferred.",
        "Strong organizational and leadership skills.",
      ],
      benefits: ["Flexible work hours.", "Career growth opportunities."],
    },
    {
      jobTitle: "Cash Services Manager",
      slug: "cash-services-manager",
      jobLocation: "West",
      employmentType: "Part-time",
      minPrice: "$35,000",
      maxPrice: "$45,000",
      postingDate: "2024-07-10",
      description:
        "Manage cash services operations and ensure compliance with regulations.",
      requirements: [
        "Experience in cash management or banking preferred.",
        "Strong organizational and leadership skills.",
      ],
      benefits: ["Flexible work hours.", "Career growth opportunities."],
    },
  ];

  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    setCurrentPage(1);
  };

  const filteredJobs = jobsData.filter((job) => {
    return (
      (query === "" ||
        job.jobTitle.toLowerCase().includes(query.toLowerCase())) &&
      (location === "" || job.jobLocation === location)
    );
  });

  const totalPages = Math.ceil(filteredJobs.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-10">
        <form
          action=""
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <div className="w-full md:w-1/3">
              <input
                type="text"
                placeholder="Position"
                className="block w-full py-2 px-5 border border-gray-200 outline-none rounded-md"
                onChange={handleQueryChange}
                value={query}
              />
            </div>
            <div className="w-full md:w-1/3">
              <select
                className="block w-full py-2 px-5 border border-gray-200 outline-none rounded-md"
                onChange={handleLocationChange}
                value={location}
              >
                <option value="">Select Location</option>
                <option value="North">North</option>
                <option value="West">West</option>
                <option value="East">East</option>
                <option value="South">South</option>
              </select>
            </div>
            <div className="w-full md:w-auto">
              <button
                type="submit"
                className="bg-red-700 text-white hover:opacity-90 py-2 px-8 rounded-md w-full md:w-auto"
              >
                Search
              </button>
            </div>
          </div>
        </form>
      </Wrapper>

      <Wrapper className="my-10">
        <div className="flex flex-col gap-5">
          <h3 className="text-lg font-bold mb-2">{filteredJobs.length} Jobs</h3>
          {currentJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {currentJobs.map((job, index) => (
                <Job
                  jobTitle={job.jobTitle}
                  slug={job.slug}
                  jobLocation={job.jobLocation}
                  employmentType={job.employmentType}
                  minPrice={job.minPrice}
                  maxPrice={job.maxPrice}
                  postingDate={job.postingDate}
                  description={job.description}
                  key={index} // Ensure a unique key is provided
                />
              ))}
            </div>
          ) : (
            <p>No jobs found</p>
          )}

          {filteredJobs.length > 0 && (
            <div className="flex items-center justify-center mt-4 space-x-8">
              <button
                className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="px-4 py-2 border rounded-md bg-gray-200 hover:bg-gray-300"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </Wrapper>
    </>
  );
};

export default Careers;
