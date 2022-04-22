import React from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

export default function Head() {
  const location = useLocation();
  const currentPage = location.pathname.replace("/", "");
  return (
    <div className="application">
      <Helmet>
        <title>Cempat.in {currentPage !== "" ? `| ${currentPage}` : ""} </title>
        <meta
          name="description"
          content="Platform untuk menulis cerita tiap tempat yang dikunjungi"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#03C88E" />
        <meta name="theme-color" content="#03C88E" />
      </Helmet>
    </div>
  );
}
