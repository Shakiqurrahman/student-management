import React from "react";

const WaitingPage = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold text-primary mb-2">
        Your account is pending now!
      </h1>
      <p>Please wait until you are granted the admin or authorized role.</p>
    </div>
  );
};

export default WaitingPage;
