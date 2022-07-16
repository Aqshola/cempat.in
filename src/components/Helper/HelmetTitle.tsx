import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

type Props = {
  title: string;
  description?: string;
};

export default function HelmetTitle({ ...props }: Props) {
  return (
    <Helmet>
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:url" content={window.location.href || ""} />
      {props.description && (
        <meta property="og:description" content={props.description} />
      )}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={window.location.href || ""} />
      <meta property="twitter:title" content={props.title} />
      {props.description && (
        <meta property="twitter:description" content={props.description} />
      )}
    </Helmet>
  );
}
