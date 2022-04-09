import React, { useEffect, useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { time } from "console";

type ButtonProps = {
  variant?: "primary" | "secondary" | "danger";
  size?: "sm" | "md" | "lg";
  shape?: "normal" | "round";
  loading?: boolean;
};

function Button({
  children,
  variant = "primary",
  size = "md",
  shape = "normal",
  loading,
  ...props
}: ButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  const btnRef = useRef<HTMLButtonElement>(null);
  const loaderRef = useRef<HTMLSpanElement>(null);
  const childrenRef = useRef<HTMLSpanElement>(null);
  const timeline = gsap.timeline({ defaults: { duration: 0.4 } });

  const _animateLoading = () => {
    timeline
      .to(childrenRef.current, {
        opacity: 0,
      })
      .to(childrenRef.current, {
        display: "none",
      })
      .to(loaderRef.current, {
        display: "block",
      })
      .to(loaderRef.current, {
        opacity: 1,
      });
  };

  const _clearAnimateLoading = () => {
    timeline
      .to(loaderRef.current, {
        opacity: 0,
      })
      .to(loaderRef.current, {
        display: "none",
      })
      .to(childrenRef.current, {
        display: "block",
      })
      .to(childrenRef.current, {
        opacity: 1,
      });
  };

  useLayoutEffect(() => {
    if (loading) {
      _animateLoading();
    } else {
      _clearAnimateLoading();
    }

    return () => {
      timeline.clear(true);
      timeline.kill();
      _clearAnimateLoading();
    };
  }, [loading]);

  return (
    <button
      ref={btnRef}
      {...props}
      className={clsx(
        props.className,
        shape === "round" && ["p-2 rounded-full"],
        shape === "normal" && [" px-3 py-2 rounded-lg"],
        size === "md" && ["text-sm md:text-base"],
        variant === "primary" && ["bg-green-primary text-white"],
        variant === "secondary" && ["bg-white text-green-primary"],
        variant === "danger" && ["bg-red-500 text-white"],
        "font-medium transition-all flex items-center justify-center disabled:bg-white"
      )}
      disabled={loading === null ? props.disabled : loading}
    >
      <span
        aria-label="loading"
        ref={loaderRef}
        className="opacity-0 hidden absolute border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8  border-4"
      ></span>

      <span ref={childrenRef}>{children}</span>
    </button>
  );
}

export default Button;
