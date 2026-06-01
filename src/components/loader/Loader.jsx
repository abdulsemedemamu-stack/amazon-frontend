import React from "react";
import { RiseLoader } from "react-spinners";

function Loader({ height = "50vh" }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: height,
      }}
    >
      <RiseLoader color="#febd69" />
    </div>
  );
}

export default Loader;
