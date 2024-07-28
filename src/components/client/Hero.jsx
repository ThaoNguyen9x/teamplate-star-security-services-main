import React from "react";
import Wrapper from "./Wrapper";

import { motion } from "framer-motion";
import { fadeIn } from "../../variants";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Hero = () => {
  return (
    <Wrapper className="mt-[5.5rem] bg-[#1a191d] py-10 md:py-0">
      <div className="flex flex-col md:flex-row items-center justify-center overflow-hidden">
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          <LazyLoadImage
            src="https://ecprivatesecurity.co.za/wp-content/uploads/2024/04/70-8.png"
            alt=""
            height={500}
            className="h-full w-full object-cover"
            effect="blur"
          />
        </motion.div>

        <motion.div
          variants={fadeIn("down", 0.2)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white absolute md:relative"
        >
          <h2 className="leading-snug text-transparent border-gradient uppercase text-nowrap">
            Security service
          </h2>
          <div className="leading-snug uppercase">
            <div className="text-nowrap">
              For your <span className="px-2 bg-red-700">Personal</span>
            </div>
            safety
          </div>
        </motion.div>
      </div>
    </Wrapper>
  );
};

export default Hero;
