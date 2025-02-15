import React from "react";
import { PuffLoader } from "react-spinners";

const Spinner = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <PuffLoader size={60} color="#EF4444" />
    </div>
  );
};

export default Spinner;