import React, { useState } from "react";
import { Helmet } from "react-helmet-async";


type Props = {
  title: string;
  description?: string |null;
};

export default function HelmetTitle({ ...props }: Props) {
  return (
    <Helmet>
      <title>{props.title}</title>
      {props.description && (
        <meta name="description" content={props.description} />
      )}
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
