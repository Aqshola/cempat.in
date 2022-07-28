export const parentTransition = {
  hidden: {},
  show: {
    transition: {
      delay: 1,
      duration: 1.5,
      staggerChildren: 0.5,
    },
  },
};

export const titleLandingTransition = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 100,
    transition: {
      delay: 1,
      duration: 0.5,
      staggerChildren: 0.2,
      type: "spring",
      stiffness: 200,
    },
  },
};

export const childTitleLandingTransition = {
  hidden: {
    color: "#000",
  },
  show: {
    delay: 1.2,
    color: "#00AA13",
    transition: {
      delay: 2,
    },
  },
};

export const childTransition = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

export const scaleTransition = {
  hidden: {
    scale: 0,
  },
  show: {
    scale: 1,
    transition: {
      duration: 0.2,
      type: "spring",
      bounce: 0.25,
    },
  },
};

export const opacityTransition = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
};

export const fontWeightTransition = {
  hidden: {
    fontWeight: 300,
  },
  show: {
    fontWeight: 800,
    transition: {
      delay: 1,
      duration: 0.5,
      type: "spring",
      bounce: 0.25,
    },
  },
};
export const textGreenTransition = {
  hidden: {
    color: "#000",
  },
  show: {
    delay: 0.5,
    color: "#00AA13",
    transition: {
      delay: 1,
    },
  },
};

export const opacityPageTransition = {
  hidden: {
    opacity:0,
  },
  show: {
    opacity:1,
    transition: {
      delay: 0.2,
      duration:0.2
    },
  },
  exit:{
    opacity:0,
    transition: {
      duration:0.2
    },
  }
};


