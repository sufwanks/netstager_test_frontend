import { Card } from "antd";
import React, { useState } from "react";
import GeneralForm from "../form/GeneralForm";

const Home = () => {
  const [currentStep, setCurrentStep] = useState();
  const [steps, setSteps] = useState();

  return (
    <div>
      <div className="row">
        <div className="col-12">
          <img style={{ width: "100%" }} src="images/bnr.jpg" alt="" />
        </div>
      </div>
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <div className="container mb-5">
              <div className="text-center mb-5 mt-5">
                <h2>Lorem Ipsum</h2>
                <p className="mt-5 text-justify">
                  Lorem Ipsum has been the industry's standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
              </div>
              <div>
                <GeneralForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
