import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "store/authStore";

type Props = {
  children: JSX.Element;
};

type LocationState = {
    from: {
      pathname: string;
    };
  };

export function PrivateRoute({ children }: Props) {
  const { isAuth, authLoading } = authStore((state) => state);
  const location = useLocation();

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuth && !authLoading) {
    <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export function PublicRoute({ children }: Props) {
  const { isAuth, authLoading } = authStore((state) => state);
  const location = useLocation();
  let from=(location.state as LocationState).from.pathname || "/main";

  if (authLoading) {
    return <div>Loading...</div>;
  }

  if (isAuth && !authLoading) {
    <Navigate to={from} replace />;
  }
  return children;
}
