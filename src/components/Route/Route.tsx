import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authStore } from "store/authStore";

type Props = {
  children: JSX.Element;
  loading:boolean
};


export function PrivateRoute({ children,loading}: Props) {
  const { isAuth} = authStore((state) => state);
  const location = useLocation();


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuth && !loading) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

export function PublicRoute({ children, loading}: Props) {
  const { isAuth, authLoading } = authStore((state) => state);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (isAuth && !loading) {
    return <Navigate to={"/main"} replace />;
  }
  return children;
}
