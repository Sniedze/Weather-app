import React from "react";
import biohazard from "../../images/biohazard.png";

const Lost = () => {
  return (
    <div>
      <h1 style={{ color: "red" }}>You`re lost! Get back!!</h1>
      <img style={{ paddingTop: "50px" }} src={biohazard} alt="Back" />
    </div>
  );
};

export default Lost;
