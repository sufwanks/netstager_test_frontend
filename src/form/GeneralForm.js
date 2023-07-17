import { Button, Card, Form, Input, Modal, Select, message } from "antd";
import { useEffect, useState } from "react";
import { months } from "../constants/Months";
import { saveLeadData } from "../services/api";
import { useNavigate } from "react-router-dom";

const GeneralForm = ({ setFirstName }) => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [addressForm] = Form.useForm();
  const [days, setDays] = useState([]);
  const [years, setYears] = useState([]);
  const [buttonStatus, setButtonStatus] = useState(0);
  const [showPage, setShowPage] = useState(true);

  const [addressRow, setAddressRow] = useState(1);

  useEffect(() => {
    let day = [];
    for (let index = 0; index <= 30; index++) {
      day.push({ label: `${index + 1}`, value: index + 1 });
    }
    setDays(day);
    let year = [];
    for (let index = 1900; index < new Date().getFullYear(); index++) {
      year.push({ label: `${index + 1}`, value: index + 1 });
    }
    setYears(year);
  }, []);

  const onFinish = () => {
    let tempaddd = addressForm.getFieldsValue();
    addressForm.setFieldsValue({
      first_address: `${tempaddd?.line_one_first}/n
  ${tempaddd?.line_two_first}/n
  ${tempaddd?.line_three_first}/n`,
      second_address: `${tempaddd?.line_one_sec}/n
    ${tempaddd?.line_two_sec}/n
    ${tempaddd?.line_three_sec}/n`,
      third_address: `${tempaddd?.line_one_third}/n
    ${tempaddd?.line_two_third}/n
    ${tempaddd?.line_three_third}/n`,
    });
    form
      .validateFields()
      .then((res) => {

        let tempCheck = form.getFieldValue();
        let tempaddress = addressForm.getFieldValue();
        let newAdress = {
          previous_address_one: tempaddress?.first_address,
          previous_address_two: tempaddress?.second_address,
          previous_address_three: tempaddress?.third_address,
        };

        let formValues = { ...tempCheck, ...newAdress };

        if (formValues) {
          var bodyFormData = new FormData();
          Object.keys(formValues).forEach((prop) => {
            bodyFormData.append(prop, formValues[prop]);
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
                navigate("/final");
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
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
  };

  const PreviousDetails = () => {
    return (
      <Card title="Do you have a Previous Address?">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12 text-center">
              <Button
                className="btn btn-info next-btn mr-5 p-3"
                onClick={() => setButtonStatus(3)}
              >
                Yes
              </Button>
              <Button className="btn btn-info next-btn p-3" onClick={onFinish}>
                No
              </Button>
            </div>
          </div>
        </div>
      </Card>
    );
  };

  const onHandleButton = (e) => {
    form
      .validateFields()
      .then((res) => {
        let tempName = form.getFieldValue("first_name");
        setFirstName(tempName);

        if (e.target.textContent == "Next") {
          setShowPage(false);
        } else if (e.target.textContent == "Submit") {
          setButtonStatus(2);
        } else setShowPage(true);
      })
      .catch((errorInfo) => {
        console.log(errorInfo);
      });
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
                      <Form.Item
                        name="first_name"
                        label="First Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your First Name",
                          },
                        ]}
                      >
                        <Input placeholder="First Name" />
                      </Form.Item>
                    </div>
                    <div className="mb-3">
                      <Form.Item
                        name="last_name"
                        label="Last Name"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your Last Name",
                          },
                        ]}
                      >
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
                              <Form.Item
                                name="day"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select your day of birth",
                                  },
                                ]}
                              >
                                <Select
                                  showSearch
                                  placeholder="Day"
                                  optionFilterProp="children"
                                  filterOption={(input, option) =>
                                    (option?.label).includes(input)
                                  }
                                  options={days}
                                />
                              </Form.Item>
                            </div>
                            <div className="col-4">
                              {" "}
                              <Form.Item
                                name="month"
                                rules={[
                                  {
                                    required: true,
                                    message:
                                      "Please select your month of birth",
                                  },
                                ]}
                              >
                                <Select
                                  showSearch
                                  placeholder="Month"
                                  name="Month"
                                  optionFilterProp="children"
                                  filterOption={(input, option) =>
                                    (option?.label ?? "")
                                      .toLowerCase()
                                      .includes(input.toLowerCase())
                                  }
                                  options={months}
                                />
                              </Form.Item>
                            </div>
                            <div className="col-4">
                              {" "}
                              <Form.Item
                                name="year"
                                rules={[
                                  {
                                    required: true,
                                    message: "Please select your year of birth",
                                  },
                                ]}
                              >
                                <Select
                                  showSearch
                                  placeholder="Year"
                                  name="Year"
                                  optionFilterProp="children"
                                  filterOption={(input, option) =>
                                    (option?.label ?? "").includes(input)
                                  }
                                  options={years}
                                />
                              </Form.Item>
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
                        name="email_id"
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
                      <Form.Item
                        name="phone_number"
                        label="Phone Number"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your phone number",
                          },
                        ]}
                      >
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
              <Form
                form={addressForm}
                name="address"
                layout="vertical"
                autoComplete="off"
              >
                <div className="mb-3">
                  {addressRow >= 1 && (
                    <Form.Item
                      name="first_address"
                      label="Previous Address 1"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address",
                        },
                      ]}
                    >
                      <Form.Item
                        name="line_one_first"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <Input placeholder="Address line 1" className="mb-3" />
                      </Form.Item>
                      <Form.Item
                        name="line_two_first"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <Input placeholder="Address line 2" className="mb-3" />
                      </Form.Item>
                      <Form.Item name="line_three_first">
                        <Input placeholder="Address line 3" />
                      </Form.Item>
                    </Form.Item>
                  )}

                  {addressRow >= 2 && (
                    <Form.Item
                      name="second_address"
                      label="Previous Address 2"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address",
                        },
                      ]}
                    >
                      <Form.Item
                        name="line_one_sec"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <Input placeholder="Address line 1" className="mb-3" />
                      </Form.Item>
                      <Form.Item
                        name="line_two_sec"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <Input placeholder="Address line 2" className="mb-3" />
                      </Form.Item>
                      <Form.Item name="line_three_sec">
                        <Input placeholder="Address line 3" />
                      </Form.Item>
                    </Form.Item>
                  )}

                  {addressRow >= 3 && (
                    <Form.Item
                      name="third_address"
                      label="Previous Address 3"
                      rules={[
                        {
                          required: true,
                          message: "Please enter your address",
                        },
                      ]}
                    >
                      <Form.Item
                        name="line_one_third"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <Input placeholder="Address line 1" className="mb-3" />
                      </Form.Item>
                      <Form.Item
                        name="line_two_third"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your address",
                          },
                        ]}
                      >
                        <Input placeholder="Address line 2" className="mb-3" />
                      </Form.Item>
                      <Form.Item name="line_three_third">
                        <Input placeholder="Address line 3" />
                      </Form.Item>
                    </Form.Item>
                  )}
                </div>
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

  return getFields();
};

export default GeneralForm;
