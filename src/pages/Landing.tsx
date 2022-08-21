import { motion } from "framer-motion";
import { opacityPageTransition } from "lib/Transition";

import SectionHeading from "components/Landing/SectionHeading";
import SectionMiddle from "components/Landing/SectionMiddle";
import SectionEnd from "components/Landing/SectionEnd";

function Landing() {
  return (
    <motion.div
      variants={opacityPageTransition}
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <SectionHeading />

      <SectionMiddle />

      <SectionEnd />
    </motion.div>
  );
}

export default Landing;
