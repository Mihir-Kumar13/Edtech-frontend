import React from "react";
import { useSelector } from "react-redux";
import FirstSection from "../coursebuilder/FirstSection";
import SecondSection from "../coursebuilder/SecondSection";

const Courseform = () => {
  let Step = useSelector((state) => state.form.step);
  console.log(Step);

  return (
    <div>
      {Step === 1 && (
        <div>
          <FirstSection />
        </div>
      )}

      {Step === 2 && (
        <div>
          <h1>
            <SecondSection />{" "}
          </h1>
        </div>
      )}
    </div>
  );
};

export default Courseform;
