import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "store/authStore";

type Props = {
  children: JSX.Element;
  loading?:boolean;
  auth?:boolean
};

type LocationState = {
    from: {
      pathname: string;
    };
  };

export function PrivateRoute({ children,loading,auth }: Props) {
  const { isAuth, authLoading } = authStore((state) => state);
  const location = useLocation();

  

  

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth && !authLoading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export function PublicRoute({ children,loading,auth }: Props) {
  const { isAuth, authLoading } = authStore((state) => state);
  // const location = useLocation();
  // let from=(location.state as LocationState).from.pathname;

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (isAuth && !authLoading) {
    return <Navigate to={"/main"} replace />;
  }
  return children;
}
