import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "store/authStore";

type Props = {
  children: JSX.Element;
  loading: boolean;
};

type LocationState = {
  from: {
    pathname: string;
  };
};

export function PrivateRoute({ children, loading }: Props) {
  const { isAuth } = authStore((state) => state);
  const location = useLocation();


  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span
          aria-label="loading"
          className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36"
        ></span>
      </div>
    );
  }

  if (!isAuth && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export function PublicRoute({ children, loading }: Props) {
  const { isAuth, authLoading } = authStore((state) => state);
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span
          aria-label="loading"
          className="border-t-4 border-t-green-primary animate-spin rounded-full w-8 h-8 border-4 mx-auto mt-36"
        ></span>
      </div>
    );
  }

  if (isAuth && !loading) {
    let from = (location.state as LocationState)?.from.pathname || "/peta";
    return <Navigate to={from} state={{ from: location }} replace />;
  }
  return children;
}
