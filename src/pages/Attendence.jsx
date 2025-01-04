import React from "react";
import { Link } from "react-router";

const Attendence = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-primary mb-2">Coming Soon!</h1>
      <p className="w-full md:w-[800px] text-center">
        We are working hard to bring you something amazing. Stay tuned for
        updates as we get closer to launching this exciting new feature. Thank
        you for your patience and support!
      </p>
      <Link
        to={"/"}
        className="text-center bg-primary text-white rounded-lg py-2 px-5 mt-4"
      >
        Go Back
      </Link>
    </div>
  );
};

export default Attendence;
