import React, { useState } from "react";

import Wrapper from "../../components/client/Wrapper";
import Breadcrumbs from "../../components/client/Breadcrumbs";

import { faqData } from "../../../data";
import { LazyLoadImage } from "react-lazy-load-image-component";

const FAQ = () => {
  const tabsData = [
    {
      id: "cctv",
      label: "CCTV",
      content:
        "Our CCTV solutions provide high-quality surveillance and security with features like remote monitoring and motion detection.",
    },
    {
      id: "alarm",
      label: "Alarm Systems",
      content:
        "Our alarm systems are equipped with the latest technology to provide reliable alerts for security breaches.",
    },
    {
      id: "access",
      label: "Access Control",
      content:
        "Our access control systems manage entry points securely, featuring biometric scanning and keycard access.",
    },
    {
      id: "fire",
      label: "Fire Detection",
      content:
        "Our fire detection systems offer early warning to ensure quick response and evacuation in case of fire.",
    },
    {
      id: "intercom",
      label: "Intercom Systems",
      content:
        "Our intercom systems facilitate reliable communication within buildings, offering features like video intercom.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);
  const [activeTab, setActiveTab] = useState("cctv");

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const toggleTab = (tabId) => {
    setActiveTab(activeTab === tabId ? null : tabId);
  };

  return (
    <>
      <Breadcrumbs />

      <Wrapper className="my-20">
        <div className="flex flex-col items-center text-center">
          <h6 className="relative inline-block pb-4 text-sm text-gray-400 font-semibold">
            <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
              COMMON QUERIES
            </span>
          </h6>
          <h2 className="text-3xl font-extrabold">
            FREQUENTLY ASKED QUESTIONS
          </h2>
          <p className="font-light text-gray-500 w-full xl:w-2/3">
            You will find answers about our security technologies and specialist
            services below. Please feel free to contact us if you don't find
            your question's answer here.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5 my-16">
          <div>
            <LazyLoadImage
              src="https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/blog-02.jpg"
              alt="FAQ Image"
              effect="blur"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            {faqData.map((faq, index) => (
              <div key={index}>
                <button
                  onClick={() => toggleFAQ(index)}
                  className={`w-full flex justify-between items-center border-2 p-5 font-medium ${
                    openIndex === index
                      ? "border-red-700 text-red-700"
                      : "border-gray-100"
                  }`}
                >
                  <span>{faq.question}</span>
                  <div
                    className={`w-8 h-8 flex items-center justify-center ${
                      openIndex === index
                        ? "bg-red-700 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <span className="text-xl">
                      {openIndex === index ? "-" : "+"}
                    </span>
                  </div>
                </button>
                <div
                  className={`px-4 transition-all duration-300 ease-in-out ${
                    openIndex === index
                      ? "max-h-[100px] opacity-100 py-4"
                      : "max-h-0 opacity-0 py-0"
                  }`}
                >
                  <div className="text-sm text-gray-500">{faq.answer}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Wrapper>

      <Wrapper className="my-20">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
          <div>
            <h6 className="relative inline-block pb-4 text-sm text-gray-400 font-semibold">
              <span className="before:absolute before:bg-red-700 before:h-[1px] before:w-full before:left-0 before:bottom-[6px] after:absolute after:bg-red-700 after:h-[3px] after:w-[40px] after:left-0 after:bottom-[5px]">
                SECURITY INSTALL
              </span>
            </h6>
            <h2 className="text-3xl font-extrabold">
              SECURITY CAMERA INSTALLATION
            </h2>
            <p className="font-light text-gray-500">
              Our security camera installation services ensure that your
              property is well-protected with high-quality surveillance
              equipment.
            </p>

            <div className="my-5">
              <div className="relative hidden xl:block">
                <div className="grid grid-cols-5 items-center font-semibold">
                  {tabsData.map((tab) => (
                    <button
                      key={tab.id}
                      className={`h-16 p-5 flex items-center justify-center border ${
                        activeTab === tab.id
                          ? "border-red-700 border-b-0"
                          : "border-white border-b-red-700"
                      }`}
                      onClick={() => toggleTab(tab.id)}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <div
                  className={`relative border border-red-700 p-5 ${
                    activeTab ? "border-t-0" : ""
                  }`}
                >
                  {tabsData.map(
                    (tab) =>
                      activeTab === tab.id && (
                        <p key={tab.id} className="text-sm text-gray-500">
                          {tab.content}
                        </p>
                      )
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2 xl:hidden">
                {tabsData.map((tab, index) => (
                  <div key={index}>
                    <button
                      onClick={() => toggleTab(tab.id)}
                      className={`w-full flex justify-between items-center border-2 p-5 font-medium ${
                        activeTab === tab.id
                          ? "border-red-700 text-red-700"
                          : "border-gray-100"
                      }`}
                    >
                      <span>{tab.label}</span>
                      <div
                        className={`w-8 h-8 flex items-center justify-center ${
                          activeTab === tab.id
                            ? "bg-red-700 text-white"
                            : "bg-gray-100"
                        }`}
                      >
                        <span className="text-xl">
                          {activeTab === tab.id ? "-" : "+"}
                        </span>
                      </div>
                    </button>
                    <div
                      className={`px-4 transition-all duration-300 ease-in-out ${
                        activeTab === tab.id
                          ? "max-h-[100px] opacity-100 py-4"
                          : "max-h-0 opacity-0 py-0"
                      }`}
                    >
                      <div className="text-sm text-gray-500">{tab.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <LazyLoadImage
            src="https://digicop-demo.pbminfotech.com/demo2/wp-content/uploads/sites/3/2020/06/blog-04.jpg"
            alt="Installation Image"
            effect="blur"
          />
        </div>
      </Wrapper>
    </>
  );
};

export default FAQ;
