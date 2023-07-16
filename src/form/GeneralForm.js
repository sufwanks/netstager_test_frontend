import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  message,
} from "antd";
import { useEffect, useRef, useState } from "react";
import { months } from "../constants/Months";
import { saveLeadData } from "../services/api";

const GeneralForm = () => {
  const [form] = Form.useForm();
  const [days, setDays] = useState([]);
  const [month, setMonths] = useState(months);
  const [years, setYears] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(0);
  const [showPage, setShowPage] = useState(true);
  const [fieldValues, setFieldValues] = useState([]);
  const [addressRow, setAddressRow] = useState(1);

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

  // const onHandleClick = (e) => {
  //   let status = e.target.value;
  //   if (ref5.current?.value && ref6.current?.value) {
  //     setFieldValues([
  //       ...fieldValues,
  //       { label: ref5.current?.id, value: ref5.current?.value },
  //       { label: ref6.current?.id, value: ref6.current?.value },
  //     ]);
  //     setButtonStatus(parseInt(status));
  //   } else if (
  //     ref0.current?.value &&
  //     ref1.current?.value &&
  //     ref2.current?.value &&
  //     ref3.current?.value &&
  //     ref4.current?.value
  //   ) {
  //     setFieldValues([
  //       { label: ref0.current?.id, value: ref0.current?.value },
  //       { label: ref1.current?.id, value: ref1.current?.value },
  //       { label: ref2.current?.id, value: ref2.current?.value },
  //       { label: ref3.current?.id, value: ref3.current?.value },
  //       { label: ref4.current?.id, value: ref4.current?.value },
  //     ]);
  //     setButtonStatus(parseInt(status));
  //   }
  // };

  // const PersonalDetails = () => {
  //   return (
  //     <Card title="Enter Your Personal Details">
  //       <div className="container-xxl">
  //         <div className="row">
  //           <div className="col-12">
  //             <form className="needs-validation">
  //               <div class="mb-3">
  //                 <label for="first_name" class="form-label">
  //                   First Name
  //                 </label>
  //                 <input
  //                   type="text"
  //                   required
  //                   class="form-control"
  //                   id="first_name"
  //                   ref={ref0}
  //                   placeholder="First Name"
  //                 />
  //               </div>
  //               <div class="mb-3">
  //                 <label for="last_name" class="form-label">
  //                   Last Name
  //                 </label>
  //                 <input
  //                   type="text"
  //                   required
  //                   class="form-control"
  //                   id="last_name"
  //                   placeholder="Last Name"
  //                   ref={ref1}
  //                 />
  //               </div>
  //               <div class="mb-3">
  //                 <label for="exampleFormControlInput1" class="form-label">
  //                   Enter Your Date of Birth
  //                 </label>
  //                 <div class="borderd-content">
  //                   <div class="title">Date Of Birth</div>
  //                   <div className="container-xxl mt-4">
  //                     <div className="row">
  //                       <div className="col-4">
  //                         <select
  //                           id="day"
  //                           ref={ref2}
  //                           class="form-select"
  //                           required
  //                           aria-label="Default select example"
  //                         >
  //                           <option selected disabled value="">
  //                             Day
  //                           </option>
  //                           {days.map((itm) => {
  //                             return (
  //                               <option value={itm.value}>{itm.label}</option>
  //                             );
  //                           })}
  //                         </select>
  //                       </div>
  //                       <div className="col-4">
  //                         <select
  //                           id="month"
  //                           required
  //                           class="form-select"
  //                           ref={ref3}
  //                           aria-label="Default select example"
  //                         >
  //                           <option selected disabled value="">
  //                             Month
  //                           </option>
  //                           {month.map((itm) => {
  //                             return (
  //                               <option value={itm.value}>{itm.label}</option>
  //                             );
  //                           })}
  //                         </select>
  //                       </div>
  //                       <div className="col-4">
  //                         <select
  //                           id="year"
  //                           required
  //                           class="form-select"
  //                           ref={ref4}
  //                           aria-label="Default select example"
  //                         >
  //                           <option selected disabled value="">
  //                             Year
  //                           </option>
  //                           {years.map((itm) => {
  //                             return (
  //                               <option value={itm.value}>{itm.label}</option>
  //                             );
  //                           })}
  //                         </select>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //               </div>
  //               <div className="row">
  //                 <div className="col-12 text-center">
  //                   <button
  //                     onClick={onHandleClick}
  //                     value="1"
  //                     type="submit"
  //                     className="btn btn-warning next-btn"
  //                   >
  //                     Next
  //                   </button>
  //                 </div>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </Card>
  //   );
  // };

  // const ContactDetails = () => {
  //   return (
  //     <Card title="Enter Your Contact Details">
  //       <div className="container-xxl">
  //         <div className="row">
  //           <div className="col-12">
  //             <form class="row needs-validation" novalidate>
  //               <div class="mb-3">
  //                 <label for="email_id" class="form-label">
  //                   Email Address
  //                 </label>
  //                 <input
  //                   type="email"
  //                   ref={ref5}
  //                   class="form-control"
  //                   id="email_id"
  //                   placeholder="Email Address"
  //                   required
  //                 />
  //               </div>
  //               <div class="mb-3">
  //                 <label for="phone_number" class="form-label">
  //                   Phone Number
  //                 </label>
  //                 <input
  //                   type="text"
  //                   ref={ref6}
  //                   class="form-control"
  //                   id="phone_number"
  //                   placeholder="Phone Number"
  //                   required
  //                 />
  //               </div>
  //               <div className="row">
  //                 <div className="col-12 text-center">
  //                   <button
  //                     onClick={onHandleClick}
  //                     value="2"
  //                     type="button"
  //                     className="btn btn-success next-btn"
  //                   >
  //                     Submit
  //                   </button>
  //                 </div>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       </div>
  //     </Card>
  //   );
  // };

  const PreviousDetails = () => {
    return (
      <Card title="Do you have a Previous Address?">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 text-center">
              <Button
                className="btn btn-info next-btn mr-5 p-3"
                onClick={() => setButtonStatus(3)}
                // type="primary"
              >
                Yes
              </Button>
              <Button
                className="btn btn-info next-btn p-3"
                onClick={onFinish}
                // type="primary"
              >
                No
              </Button>
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

  // const getFields = () => {
  //   switch (buttonStatus) {
  //     case 1:
  //       return <ContactDetails />;
  //     case 2:
  //       return <PreviousDetails />;
  //     case 3 || 4:
  //       return <FinalSection />;
  //     default:
  //       return <PersonalDetails />;
  //   }
  // };
  // new form using antd

  const onHandleButton = (e) => {
    console.log(e.target.textContent);
    console.log(e);
    if (e.target.textContent == "Next") {
      setShowPage(false);
    } else if (e.target.textContent == "Submit") {
      setButtonStatus(2);
    } else setShowPage(true);
  };
  const QueryForm = () => {
    return (
      <Card title="Enter Your Personal Details">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <Form form={form} layout="vertical" autoComplete="off">
                {showPage == true ? (
                  <>
                    <div className="mb-3">
                      <Form.Item name="first_name" label="First Name">
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </div>
                    <div className="mb-3">
                      <Form.Item name="last_name" label="Last Name">
                        <Input placeholder="Last Name" />
                      </Form.Item>
                    </div>
                    <div className="mb-3">
                      <span>Enter Your Date of Birth</span>
                      <div class="borderd-content">
                        <div class="title">Date Of Birth</div>
                        <div className="container-xxl mt-4">
                          <div className="row">
                            <div className="col-4">
                              <Select
                                showSearch
                                placeholder="Day"
                                optionFilterProp="children"
                                // onChange={onChange}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                  (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                options={days}
                              />
                            </div>
                            <div className="col-4">
                              <Select
                                showSearch
                                placeholder="Month"
                                name="Month"
                                optionFilterProp="children"
                                // onChange={onChange}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                  (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                options={months}
                              />
                            </div>
                            <div className="col-4">
                              <Select
                                showSearch
                                placeholder="Year"
                                name="Year"
                                optionFilterProp="children"
                                // onChange={onChange}
                                // onSearch={onSearch}
                                filterOption={(input, option) =>
                                  (option?.label ?? "")
                                    .toLowerCase()
                                    .includes(input.toLowerCase())
                                }
                                options={years}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mb-3">
                      <Form.Item
                        name="email"
                        label="E-mail"
                        rules={[
                          {
                            type: "email",
                            message: "The input is not valid E-mail!",
                          },
                          {
                            required: true,
                            message: "Please input your E-mail!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="mb-3">
                      <Form.Item name="phone" label="Phone Number">
                        <Input
                          type="number"
                          controls="false"
                          placeholder="Phone Number"
                        />
                      </Form.Item>
                    </div>
                  </>
                )}
              </Form>
              <div className="row">
                <div className="col-12 text-center">
                  <Button
                    className="btn btn-warning next-btn"
                    onClick={onHandleButton}
                    value={showPage ? "Next" : "Submit"}
                    // type="primary"
                  >
                    {showPage ? "Next" : "Submit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const handleAddress = (e) => {
    if (addressRow < 4) {
      setAddressRow(addressRow + 1);
    }

    if (e.target.textContent == "Back") {
      setButtonStatus(2);
    } else if (addressRow > 1 && e.target.textContent == "Remove Address") {
      setAddressRow(addressRow - 1);
    }
  };
  const AddressForm = () => {
    return (
      <Card title="Enter Your Personal Details">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <Form form={form} layout="vertical" autoComplete="off">
                {addressRow == 1 ? (
                  <div className="mb-3">
                    <Form.Item name="address" label="Previous Address 1">
                      <Input placeholder="Address line 1" className="mb-3" />
                      <Input placeholder="Address line 2" className="mb-3" />
                      <Input placeholder="Address line 3" />
                    </Form.Item>
                  </div>
                ) : addressRow == 2 ? (
                  <>
                    <div className="mb-3">
                      <Form.Item name="address" label="Previous Address 1">
                        <Input placeholder="Address line 1" className="mb-3" />
                        <Input placeholder="Address line 2" className="mb-3" />
                        <Input placeholder="Address line 3" />
                      </Form.Item>
                    </div>
                    <div className="mb-3">
                      <Form.Item name="address" label="Previous Address 2">
                        <Input placeholder="Address line 1" className="mb-3" />
                        <Input placeholder="Address line 2" className="mb-3" />
                        <Input placeholder="Address line 3" />
                      </Form.Item>
                    </div>
                  </>
                ) : (
                  addressRow == 3 && (
                    <>
                      <div className="mb-3">
                        <Form.Item name="address" label="Previous Address 1">
                          <Input
                            placeholder="Address line 1"
                            className="mb-3"
                          />
                          <Input
                            placeholder="Address line 2"
                            className="mb-3"
                          />
                          <Input placeholder="Address line 3" />
                        </Form.Item>
                      </div>
                      <div className="mb-3">
                        <Form.Item name="address" label="Previous Address 2">
                          <Input
                            placeholder="Address line 1"
                            className="mb-3"
                          />
                          <Input
                            placeholder="Address line 2"
                            className="mb-3"
                          />
                          <Input placeholder="Address line 3" />
                        </Form.Item>
                      </div>
                      <div className="mb-3">
                        <Form.Item name="address" label="Previous Address 3">
                          <Input
                            placeholder="Address line 1"
                            className="mb-3"
                          />
                          <Input
                            placeholder="Address line 2"
                            className="mb-3"
                          />
                          <Input placeholder="Address line 3" />
                        </Form.Item>
                      </div>
                    </>
                  )
                )}
              </Form>
              <div className="row">
                <div className="col-12 text-center">
                  <div className="d-flex flex-column align-items-center">
                    <Button
                      className="btn btn-success next-btn"
                      onClick={onFinish}
                      // type="primary"
                    >
                      Submit
                    </Button>
                    {addressRow < 3 && (
                      <Button type="link" onClick={handleAddress}>
                        Add Another Address
                      </Button>
                    )}
                    <Button
                      onClick={handleAddress}
                      type="link"
                      className="mt-0"
                    >
                      {addressRow > 1 && addressRow < 4
                        ? "Remove Address"
                        : addressRow == 1 && "Back"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const getFields = () => {
    switch (buttonStatus) {
      case 1:
        return <QueryForm />;
      case 2:
        return <PreviousDetails />;
      case 3:
        return <AddressForm />;
      default:
        return <QueryForm />;
    }
  };

  // return <QueryForm />;
  return getFields();
};

export default GeneralForm;
