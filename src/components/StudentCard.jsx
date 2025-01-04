import React from "react";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from "react-router";
import defaultAvatar from "../assets/no-profile-picture.svg";

const StudentCard = ({ studentsData, handleDelete }) => {
  return (
    <div className="w-full flex items-center gap-4 p-8 bg-white max-w-[700px] rounded-2xl border group relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible duration-300 translate-x-[50px] group-hover:translate-x-0">
        <Link
          to={`${studentsData?._id}/edit`}
          state={studentsData}
          className="bg-white shadow-box rounded-sm size-8 text-black hover:text-blue-600 mb-2 flex items-center justify-center text-base hover:shadow-box-lg duration-300"
        >
          <FiEdit />
        </Link>
        <button
          type="button"
          onClick={() => handleDelete(studentsData?._id)}
          className="bg-white shadow-box rounded-sm size-8 text-black hover:text-red-600 mb-2 flex items-center justify-center text-base hover:shadow-box-lg duration-300"
        >
          <RiDeleteBin6Line />
        </button>
      </div>
      <img
        src={studentsData?.profile ? studentsData?.profile : defaultAvatar}
        alt="Author Image"
        className="object-cover size-28 rounded-full"
      />
      <div>
        <h3 className="text-lg line-clamp-1 font-semibold text-primary">
          {studentsData?.fullName}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-5">
          Department : {studentsData?.department}
        </p>
        <p className="text-sm text-gray-500 line-clamp-5">
          Present Address : {studentsData?.presentAddress}
        </p>
        <p className="text-sm text-gray-500 line-clamp-5">
          Contact No : {studentsData?.phone}
        </p>
      </div>
    </div>
  );
};

export default StudentCard;
