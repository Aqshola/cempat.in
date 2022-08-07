import React from "react";

import ListBox from "components/Peta/UserSection/ListBox";

import { MdLocationPin } from "react-icons/md";
import Paginate from "components/Pagination/Paginate";

type Props = {};

export default function MobileTempatSection({}: Props) {
  return (
    <section id="mobile-view" className="md:hidden">
      <div className="mt-5 px-5 flex flex-col gap-2">
        <ListBox
          leftElement={<MdLocationPin className="w-7 h-7 text-green-primary" />}
          title="Taman Solo"
          rightText={""}
        />
        <ListBox
          leftElement={<MdLocationPin className="w-7 h-7 text-green-primary" />}
          title="Taman Solo"
          rightText={""}
        />
      </div>
      
    </section>
  );
}
