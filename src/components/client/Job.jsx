import React from "react";
import { Link } from "react-router-dom";
import { FiCalendar, FiClock, FiDollarSign, FiMapPin } from "react-icons/fi";

const Job = ({
  jobTitle,
  slug,
  jobLocation,
  employmentType,
  minPrice,
  maxPrice,
  postingDate,
  description,
}) => {
  return (
    <div className="border border-gray-200 p-5 rounded-md">
      <Link to={`/careers/${slug}`} className="flex gap-4 flex-col sm:flex-row items-center">
        <div className="flex flex-col gap-3">
          <div className="flex flex-col">
            <h4 className="text-red-700 font-semibold">Star company</h4>
            <h3 className="text-lg font-semibold">{jobTitle}</h3>
          </div>
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
              <FiMapPin className="text-lg" /> {jobLocation}
            </span>
            <span className="flex items-center gap-2">
              <FiClock className="text-lg" /> {employmentType}
            </span>
            <span className="flex items-center gap-2">
              <FiDollarSign className="text-lg" /> {minPrice} - {maxPrice}
            </span>
            <span className="flex items-center gap-2">
              <FiCalendar className="text-lg" /> {postingDate}
            </span>
          </div>
          <p className="text-gray-500">{description}</p>
        </div>
      </Link>
    </div>
  );
};

export default Job;
