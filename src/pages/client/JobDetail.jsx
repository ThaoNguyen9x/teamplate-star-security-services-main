import React, { useState } from "react";
import Breadcrumbs from "../../components/client/Breadcrumbs";
import Wrapper from "../../components/client/Wrapper";
import { useParams } from "react-router-dom";
import ApplyModal from "../../components/client/ApplyModal"; // Đảm bảo đường dẫn phù hợp

const JobDetail = ({ jobsData }) => {
  const { slug } = useParams();
  const job = jobsData.find((job) => job.slug === slug);

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(!showModal);

  const { description, requirements, benefits } = job;

  return (
    <>
      <Breadcrumbs />
      <Wrapper className="my-20">
        <div className="border border-gray-200 p-5 rounded-md">
          <h2 className="text-2xl font-semibold mb-2">{job.jobTitle}</h2>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Description</h3>
            <p>{description}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Requirements</h3>
            <ul className="list-disc list-inside">
              {requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Benefits</h3>
            <ul className="list-disc list-inside">
              {benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          </div>
          <button
            onClick={toggleModal}
            className="bg-red-700 text-white py-2 px-5 rounded-md hover:opacity-95"
          >
            Apply Now
          </button>
        </div>
      </Wrapper>
      <ApplyModal isOpen={showModal} onClose={toggleModal} />
    </>
  );
};

export default JobDetail;
