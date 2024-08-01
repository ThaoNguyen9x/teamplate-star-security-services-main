import React, { useState, useEffect } from "react";
import Wrapper from "../../components/client/Wrapper";
import { useLocation, useNavigate } from "react-router-dom";
import JobService from "../../services/JobService";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { logo } from "../../assets/index";

const ScheduleInterview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [interviewDetails, setInterviewDetails] = useState({
    date: "",
    time: "",
    location: "",
    instructions: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenFromUrl = searchParams.get("token");

    if (!tokenFromUrl) {
      navigate("/404");
      return;
    }

    try {
      const decodedToken = jwtDecode(tokenFromUrl);
      const clientId = decodedToken.nameid;

      if (clientId) {
        fetchAllData(clientId);
      } else {
        navigate("/404");
      }
    } catch (error) {
      navigate("/404");
    }
  }, [location.search, navigate]);

  const fetchAllData = async (candidateId) => {
    setLoading(true);
    try {
      const interviewData = await JobService.GetInterviewByCandidateId(
        candidateId
      );
      if (interviewData) {
        setInterviewDetails({
          date: interviewData.interviewDate || "Not available",
          name: interviewData.name || "Candidate",
          time: "10:00 AM",
          location: interviewData.interviewLocation || "Not available",
          instructions: interviewData.comments || "Not available",
        });
      } else {
        navigate("/404");
      }
    } catch (error) {
      toast.error("Failed to fetch interview data.");
      setErrors({ apiError: "Failed to fetch interview data." });
      navigate("/404");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <Wrapper className="my-40">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-200">
        <div className="flex items-center justify-center mb-6">
          <img src={logo} alt="Company Logo" className="w-32" />
        </div>
        <h1 className="text-3xl font-bold mb-4 text-center">
          Interview Invitation
        </h1>
        <p className="text-lg mb-6 text-center">Dear {interviewDetails.name},</p>
        {loading && <p className="text-center">Loading...</p>}
        {errors.apiError && (
          <p className="text-red-500 text-center">{errors.apiError}</p>
        )}
        {!loading && !errors.apiError && (
          <>
            <div className="mb-6">
              <p className="text-xl font-semibold text-gray-700">Date:</p>
              <p className="text-gray-600">
                {formatDate(interviewDetails.date)}
              </p>
            </div>
            <div className="mb-6">
              <p className="text-xl font-semibold text-gray-700">Time:</p>
              <p className="text-gray-600">{interviewDetails.time}</p>
            </div>
            <div className="mb-6">
              <p className="text-xl font-semibold text-gray-700">Location:</p>
              <p className="text-gray-600">{interviewDetails.location}</p>
            </div>
            <div className="mb-6">
              <p className="text-xl font-semibold text-gray-700">
                Instructions:
              </p>
              <p className="text-gray-600">{interviewDetails.instructions}</p>
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-600">
                We look forward to meeting you and wish you the best of luck
                with your interview. Thank you for considering a career with us!
              </p>
              <p className="text-lg text-gray-600 mt-4">Best regards,</p>
              <p className="text-lg text-gray-600">The Recruitment Team</p>
            </div>
          </>
        )}
      </div>
    </Wrapper>
  );
};

export default ScheduleInterview;
