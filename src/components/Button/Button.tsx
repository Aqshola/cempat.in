import React, { useEffect} from "react";
import clsx from "clsx";
import {
  AnimationControls,
  HTMLMotionProps,
  motion,
  TargetAndTransition,
  useAnimation,
  VariantLabels,
} from "framer-motion";

type ButtonProps = {
  children: React.ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline-primary"
    | "outline-secondary"
    | "outline-gray" 
    |'vanilla'
    ;
  size?: "sm" | "md" | "lg" | "xs" | "xl";
  shape?: "normal" | "round";
  loading?: boolean;
};

const ButtonType: {
  [key: string]: string;
} = {
  primary: "bg-green-primary font-semibold text-white rounded-lg btn-primary",
  secondary:
    "bg-blue-primary text-white font-semibold rounded-lg btn-secondary",
  danger: "bg-red-primary text-white font-semibold rounded-lg btn-danger",
  "outline-primary":
    "bg-transparent text-green-primary font-semibold rounded-lg btn-primary",
  "outline-secondary":
    "bg-transparent text-blue-primary font-semibold rounded-lg btn-secondary",
  "outline-gray":
    "border bg-transparent border-gray-300 font-semibold rounded-lg btn-gray",
   'vanilla':'bg-transparent btn-gray font-semibold rounded-lg' 
};

const ButtonSize: {
  [key: string]: string;
} = {
  xl: "py-3 px-6 text-base",
  lg: "px-4 py-2 text-base",
  md: "px-4 py-2 text-sm",
  sm: "py-2 px-3 text-sm",
  xs: "py-2 px-3 text-xs",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  shape = "normal",
  loading,
  ...props
}: ButtonProps & HTMLMotionProps<"button">) {
  const loadingAnimation = useAnimation();
  const loaderAnimation = useAnimation();
  useEffect(() => {
    if (loading) {
      loadingAnimation.start({
        opacity: 0,
        y: -2,
        transition: {
          duration: 0.2,
        },
      });
      loaderAnimation.start({
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.2,
          duration: 0.2,
        },
      });
    } else {
      loaderAnimation.start({
        opacity: 0,
        y: 2,
        transition: {
          duration: 0.2,
        },
      });
      loadingAnimation.start({
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.2,
          duration: 0.2,
        },
      });
    }
  }, [loading]);

  return (
    <motion.button
      disabled={loading ? loading : props.disabled}
      {...props}
      className={clsx(
        "transition-all btn",
        ButtonType[variant],
        ButtonSize[size],
        props.className
      )}
    >
      <span className="relative">
        <DotLoader animate={loaderAnimation} variant={variant} />
      </span>
      <motion.div
        animate={loadingAnimation}
        className="w-full flex  justify-center gap-2"
      >
        {children}
      </motion.div>
    </motion.button>
  );
}

export default Button;

type Props = {
  animate:
    | boolean
    | AnimationControls
    | TargetAndTransition
    | VariantLabels
    | undefined;
  variant?:
    | "primary"
    | "secondary"
    | "danger"
    | "outline-primary"
    | "outline-secondary"
    | "outline-gray"
    | 'vanilla';
};

const LoaderType: {
  [key: string]: string;
} = {
  primary: "bg-white",
  secondary: "bg-white",
  danger: "bg-white",
  "outline-primary": "bg-green-primary",
  "outline-secondary": "bg-blue-primary",
  "outline-gray": "bg-black",
  "vanilla": "bg-black",
};
function DotLoader({ animate, variant = "primary" }: Props) {
  const loadingContainerVariants = {
    start: {
      transition: {
        staggerChildren: 0.2,
      },
    },
    end: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const loadingCircleVariants = {
    start: {
      opacity: 1,
      y: "0%",
    },
    end: {
      opacity: 0.5,
      y: "70%",
    },
  };

  const loadingCircleTransition = {
    transition:{
      duration: 0.3,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    }
  };
  return (
    <motion.div
      className="absolute top-0 left-0 right-0 bottom-0"
      initial={{
        opacity: 0,
        y: 2,
      }}
      animate={animate}
    >
      <motion.div
        initial="start"
        animate="end"
        variants={loadingContainerVariants}
        className="flex justify-center items-center gap-5 h-full"
      >
        <motion.span
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
          className={clsx("w-2 h-2 flex  rounded-full", LoaderType[variant])}
        ></motion.span>
        <motion.span
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
          className={clsx("w-2 h-2 flex  rounded-full", LoaderType[variant])}
        ></motion.span>
        <motion.span
          variants={loadingCircleVariants}
          transition={loadingCircleTransition}
          className={clsx("w-2 h-2 flex  rounded-full", LoaderType[variant])}
        ></motion.span>
      </motion.div>
    </motion.div>
  );
}
