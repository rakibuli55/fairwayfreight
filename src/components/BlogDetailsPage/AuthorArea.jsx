import React from "react";
import { CgNotes } from "react-icons/cg";
import { FaRegUser } from "react-icons/fa";
import { GoClock } from "react-icons/go";

const AuthorArea = ({data}) => {
  return (
    <div className="flex items-center py-7 border-b border-[#4A4A4A] custom-xs:flex-wrap author-details-wrapper">
      {/* author details  */}
      <div className="flex items-center gap-3 w-[33.33%] custom-xs:w-[50%] border-r border-[#555] author-details-box">
        <span className="text-[30px]">
          <GoClock />
        </span>
        <div>
          <p className="text-sm uppercase text-primaryGreen font-bold">Date</p>
          <span className="inline-block mt-1 text-paragraph">{data?.created_date}</span>
        </div>
      </div>
      {/* author details  */}
      <div className="flex items-center gap-3 w-[33.33%] custom-xs:w-[50%] border-r border-[#555] justify-center author-details-box">
        <span className="text-[30px]">
          <FaRegUser />
        </span>
        <div>
          <p className="text-sm uppercase text-primaryGreen font-bold">
            AUTHOR NAME
          </p>
          <span className="inline-block mt-0 text-paragraph">
            {data?.author_name}
          </span>
        </div>
      </div>
      {/* author details  */}
      <div className="flex items-center gap-3 w-[33.33%] custom-xs:w-[100%] custom-xs:mt-4 justify-center author-details-box">
        <span className="text-[30px]">
          <CgNotes />
        </span>
        <div>
          <p className="text-sm uppercase text-primaryGreen font-bold">
            SUBJECT
          </p>
          <span className="inline-block mt-1 text-paragraph">
            {data?.subject}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthorArea;
