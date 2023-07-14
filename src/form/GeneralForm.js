import { Card, Modal, message } from "antd";
import { useEffect, useRef, useState } from "react";
import { months } from "../constants/Months";
import { saveLeadData } from "../services/api";

const GeneralForm = () => {
  const [days, setDays] = useState([]);
  const [month, setMonths] = useState(months);
  const [years, setYears] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(0);
  const [fieldValues, setFieldValues] = useState([]);

  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);
  const ref6 = useRef(null);

  useEffect(() => {
    let day = [];
    for (let index = 0; index <= 30; index++) {
      day.push({ label: index + 1, value: index + 1 });
    }
    setDays(day);
    let year = [];
    for (let index = 1900; index < new Date().getFullYear(); index++) {
      year.push({ label: index + 1, value: index + 1 });
    }
    setYears(year);
  }, []);

  const onFinish = () => {
    console.log(fieldValues);

    if (fieldValues) {
      var bodyFormData = new FormData();
      fieldValues.forEach((prop) => {
        console.log(prop);
        bodyFormData.append(prop.label, prop.value);
      });
      saveLeadData(bodyFormData)
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            let msg = response.data.message
              ? response.data.message
              : response.data.data.message
              ? response.data.data.message
              : null;
            if (msg) {
              message.success(msg, 1.5);
            } else {
              message.success(`Record has been added successfully`, 1.5);
            }
            setButtonStatus(parseInt(4));
            console.log(response);
          } else {
            throw response;
          }
        })
        .catch((error) => {
          console.log("test", error);
          let msg = error.data
            ? error.data.message
              ? error.data.message
              : error.data.data.message
              ? error.data.data.message
              : "Something went wrong"
            : "Something went wrong";

          let modal = Modal.error({
            title: "Unable to Add",
            centered: "true",
            content: msg,
          });

          setTimeout(() => {
            modal.destroy();
          }, 3000);
        });
    }
  };

  const onHandleClick = (e) => {
    let status = e.target.value;
    if (ref5.current?.value && ref6.current?.value) {
      setFieldValues([
        ...fieldValues,
        { label: ref5.current?.id, value: ref5.current?.value },
        { label: ref6.current?.id, value: ref6.current?.value },
      ]);
      setButtonStatus(parseInt(status));
    } else if (
      ref0.current?.value &&
      ref1.current?.value &&
      ref2.current?.value &&
      ref3.current?.value &&
      ref4.current?.value
    ) {
      setFieldValues([
        { label: ref0.current?.id, value: ref0.current?.value },
        { label: ref1.current?.id, value: ref1.current?.value },
        { label: ref2.current?.id, value: ref2.current?.value },
        { label: ref3.current?.id, value: ref3.current?.value },
        { label: ref4.current?.id, value: ref4.current?.value },
      ]);
      setButtonStatus(parseInt(status));
    }
  };

  const PersonalDetails = () => {
    return (
      <Card title="Enter Your Personal Details">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <form className="needs-validation">
                <div class="mb-3">
                  <label for="first_name" class="form-label">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    id="first_name"
                    ref={ref0}
                    placeholder="First Name"
                  />
                </div>
                <div class="mb-3">
                  <label for="last_name" class="form-label">
                    Last Name
                  </label>
                  <input
                    type="text"
                    required
                    class="form-control"
                    id="last_name"
                    placeholder="Last Name"
                    ref={ref1}
                  />
                </div>
                <div class="mb-3">
                  <label for="exampleFormControlInput1" class="form-label">
                    Enter Your Date of Birth
                  </label>
                  <div class="borderd-content">
                    <div class="title">Date Of Birth</div>
                    <div className="container-xxl mt-4">
                      <div className="row">
                        <div className="col-4">
                          <select
                            id="day"
                            ref={ref2}
                            class="form-select"
                            required
                            aria-label="Default select example"
                          >
                            <option selected disabled value="">
                              Day
                            </option>
                            {days.map((itm) => {
                              return (
                                <option value={itm.value}>{itm.label}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-4">
                          <select
                            id="month"
                            required
                            class="form-select"
                            ref={ref3}
                            aria-label="Default select example"
                          >
                            <option selected disabled value="">
                              Month
                            </option>
                            {month.map((itm) => {
                              return (
                                <option value={itm.value}>{itm.label}</option>
                              );
                            })}
                          </select>
                        </div>
                        <div className="col-4">
                          <select
                            id="year"
                            required
                            class="form-select"
                            ref={ref4}
                            aria-label="Default select example"
                          >
                            <option selected disabled value="">
                              Year
                            </option>
                            {years.map((itm) => {
                              return (
                                <option value={itm.value}>{itm.label}</option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <button
                      onClick={onHandleClick}
                      value="1"
                      type="submit"
                      className="btn btn-warning next-btn"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const ContactDetails = () => {
    return (
      <Card title="Enter Your Contact Details">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <form class="row needs-validation" novalidate>
                <div class="mb-3">
                  <label for="email_id" class="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    ref={ref5}
                    class="form-control"
                    id="email_id"
                    placeholder="Email Address"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="phone_number" class="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    ref={ref6}
                    class="form-control"
                    id="phone_number"
                    placeholder="Phone Number"
                    required
                  />
                </div>
                <div className="row">
                  <div className="col-12 text-center">
                    <button
                      onClick={onHandleClick}
                      value="2"
                      type="button"
                      className="btn btn-success next-btn"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const PreviousDetails = () => {
    return (
      <Card title="Do you have a Previous Address?">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 text-center">
              <button
                type="button"
                value="3"
                onClick={onFinish}
                class="btn btn-info next-btn mr-5 p-3"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={onFinish}
                value="4"
                class="btn btn-info next-btn p-3"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </Card>
    );
  };
  const FinalSection = () => {
    return (
      <div className="container-xxl">
        <div className="row">
          <div className="col-12">
            <h2 className="final-msg">Thankyou...</h2>
          </div>
        </div>
      </div>
    );
  };

  const getFields = () => {
    switch (buttonStatus) {
      case 1:
        return <ContactDetails />;
      case 2:
        return <PreviousDetails />;
      case 3 || 4:
        return <FinalSection />;
      default:
        return <PersonalDetails />;
    }
  };
  return <>{getFields()}</>;
};

export default GeneralForm;
