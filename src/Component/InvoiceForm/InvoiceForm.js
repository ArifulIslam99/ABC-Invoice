import React, { useState } from "react";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import house from "../../figs/house.png";
const InvoiceForm = () => {
  const currentDate = new Date().toISOString().substr(0, 10);
  const [submissionStatus, setSubmissionStatus] = useState(false);
  const [formData, setFormData] = useState({
    customerName: "",
    invoiceDate: currentDate,
    invoiceNumber: "",
    paymentDate: "",
    customerEmail: "",
    customerPhone: "",
    quantity: 1,
    chargeOnour: 250,
    toiletPrice: 100,
    reqhours: "2",
    totalChargeForToilet: 0,
    totalTime: 0,
    totalChargePerHours: 0,
    netDue: 0,
    method: "",

    // Add other form fields here
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function resetform() {
    window.location.reload();
  }

  const calculateData = () => {
    formData.totalChargeForToilet = formData.quantity * formData.toiletPrice;
    formData.totalTime = formData.quantity * parseInt(formData.reqhours);
    formData.totalChargePerHours = formData.totalTime * formData.chargeOnour;
    formData.netDue =
      formData.totalChargeForToilet + formData.totalChargePerHours;
  };

  const assignVariableWithDelay = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setSubmissionStatus(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("hei");
    if (
      formData.customerEmail === "" &&
      formData.customerName === "" &&
      formData.invoiceNumber === ""
    ) {
      setSubmissionStatus(false);
      alert("Please Enter Valid Input!");
    } else {
      assignVariableWithDelay();
    }
  };
  const handleMethodChange = (event) => {
    const selectedQuantity = event.target.value;
    setFormData({ ...formData, method: selectedQuantity });
  };
  const printStyles = `
  @media print {
    /* Define print-specific styles here */
    body {
      font-size: 12pt;
    }
    /* Add more styles as needed */

    /* Hide elements with class "no-print" when printing */
    .no-print {
      display: none !important;
    }
  }
`;
  const handlePrint = () => {
    const style = document.createElement("style");
    style.innerHTML = printStyles;
    document.head.appendChild(style);
    window.print();
    document.head.removeChild(style);
  };

  const handleIncrement = () => {
    setFormData({ ...formData, quantity: formData.quantity + 1 });
  };

  const handleDecrement = () => {
    if (formData.quantity > 1) {
      setFormData({ ...formData, quantity: formData.quantity - 1 });
    }
  };

  return (
    <div>
      {submissionStatus === false ? (
        <div className="my-4">
          <p
            style={{
              fontFamily: "monospace",
              fontStyle: "italic",
              fontWeight: "600",
              fontSize: "44px",
            }}
          >
            Create a new Invoice
          </p>
          <Container fluid className="w-50 mx-auto">
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    controlId="customerName"
                    className="my-3"
                  >
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="customerName"
                      value={formData.customerName}
                      onChange={handleChange}
                      placeholder="Enter customer name"
                    />
                  </Form.Group>
                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    controlId="customerEmail"
                    className="my-3"
                  >
                    <Form.Label>Customer Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="customerEmail"
                      value={formData.customerEmail}
                      onChange={handleChange}
                      placeholder="Enter customer Email"
                    />
                  </Form.Group>
                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    controlId="invoiceDate"
                    className="my-3"
                  >
                    <Form.Label>Invoice Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="invoiceDate"
                      value={formData.invoiceDate}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  {/* Add other form fields here */}
                </Col>
                <Col md={6}>
                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    controlId="customerPhone"
                    className="my-3"
                  >
                    <Form.Label>Customer Phone</Form.Label>
                    <Form.Control
                      type="phone"
                      name="customerPhone"
                      value={formData.customerPhone}
                      onChange={handleChange}
                      placeholder="Enter customer Phone"
                    />
                  </Form.Group>
                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    controlId="invoiceNumber"
                    className="my-3"
                  >
                    <Form.Label>Invoice Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleChange}
                      placeholder="Enter Invoice Number"
                    />
                  </Form.Group>

                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    controlId="paymentDate"
                    className="my-3"
                  >
                    <Form.Label>Payment Due Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="paymentDate"
                      value={formData.paymentDate}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group
                style={{
                  fontFamily: "monospace",
                  fontStyle: "italic",
                  fontWeight: "500",
                }}
              >
                <Form.Label>Choose Payment Method: </Form.Label> <br />
                <Form.Check
                  inline
                  type="radio"
                  label="Cash"
                  name="radioGroup"
                  id="radio1"
                  value="Cash"
                  checked={formData.method === "Cash"}
                  onChange={handleMethodChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Card"
                  name="radioGroup"
                  id="radio2"
                  value="Card"
                  checked={formData.method === "Card"}
                  onChange={handleMethodChange}
                />
                <Form.Check
                  inline
                  type="radio"
                  label="Bank Transfer"
                  name="radioGroup"
                  id="radio3"
                  value="Bank Transfer"
                  checked={formData.method === "Bank Transfer"}
                  onChange={handleMethodChange}
                />
              </Form.Group>
              <p
                style={{
                  fontSize: "32px",
                  margin: "20px",
                  fontStyle: "oblique",
                }}
              >
                Product Information
              </p>
              <Row>
                <Col>
                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    className="my-3"
                    controlId="quantity"
                  >
                    <Form.Label>Toilet to Change</Form.Label>
                    <div className="quantity-control">
                      <button type="button" onClick={handleDecrement}>
                        -
                      </button>
                      <input
                        style={{ width: "60px" }}
                        className="mx-2 text-center"
                        type="number"
                        name="quantity"
                        min="0"
                        value={formData.quantity}
                        onChange={handleChange}
                      />
                      <button type="button" onClick={handleIncrement}>
                        +
                      </button>
                    </div>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    controlId="chargeOnour"
                    className="my-3"
                  >
                    <Form.Label>Charge Per Hour</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      name="chargeOnour"
                      value={formData.chargeOnour}
                      onChange={handleChange}
                      placeholder="Charge Per Hour $"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    controlId="reqhours"
                    className="my-3"
                  >
                    <Form.Label>Estimated Time</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      name="reqhours"
                      value={formData.reqhours}
                      onChange={handleChange}
                      placeholder="Time Needed (hours)"
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    style={{
                      fontFamily: "monospace",
                      fontStyle: "italic",
                      fontWeight: "500",
                    }}
                    controlId="toiletPrice"
                    className="my-3"
                  >
                    <Form.Label>Charge Per Toilet</Form.Label>
                    <Form.Control
                      type="number"
                      min="0"
                      name="toiletPrice"
                      value={formData.toiletPrice}
                      onChange={handleChange}
                      placeholder="Charge Per Toilet $"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Button
                type="submit"
                className="btn-success"
                onClick={() => calculateData()}
              >
                Generate Invoice
              </Button>
            </Form>
          </Container>
        </div>
      ) : (
        <div style={{ width: "90%", margin: "auto" }}>
          {/* Header of Invoice */}
          <section>
            <div
              className=""
              style={{
                height: "150px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <p
                style={{
                  fontFamily: "monospace",
                  fontWeight: "600",
                  fontSize: "68px",
                  fontStyle: "oblique",
                }}
              >
                Invoice
              </p>
              <div>
                <img
                  style={{ width: "90px", height: "90px" }}
                  alt=""
                  src={house}
                ></img>
                <p
                  style={{
                    fontFamily: "monospace",
                    fontWeight: "200",
                    fontSize: "18px",
                    fontStyle: "oblique",
                  }}
                >
                  abc Cleaners LTD.
                </p>
              </div>
            </div>
          </section>

          {/* Info Center for Invoice */}
          <section
            style={{
              textAlign: "left",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="mb-4 fst-italic">
              <p className="fs-5">
                <span className="fw-bold">Bill To:</span>{" "}
                {formData.customerName}{" "}
              </p>

              <p> {formData.customerEmail} </p>
              <p> {formData.customerPhone} </p>

              <p className="fs-5">
                <span className="fw-bold">Bill Form:</span> abc cleaners ltd.
              </p>
              <p> 245-B south street pool </p>
              <p>
                <span className="fw-bold">Payment Method:</span>{" "}
                <span className="fst-italic">{formData.method}</span>{" "}
              </p>
            </div>

            <div className="fst-italic"> 
              <p>Invoice No: {formData.invoiceNumber} </p>
              <p>Invoice Date: {formData.invoiceDate} </p>
              <p>Last Day of Payment: {formData.paymentDate}</p>
            </div>
          </section>
     
          <table class="table table-responsive">
            <thead>
              <tr>
                <th scope="col">Toilelts to Change</th>
                <th scope="col">Total Charge for Toilets </th>
                <th scope="col">Estimated Time</th>
                <th scope="col">Charge for Hours</th>
                <th scope="col">Net Amount to Pay</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td> {formData.quantity} </td>
                <td>${formData.totalChargeForToilet} </td>
                <td> {formData.totalTime} hour/s </td>
                <td> ${formData.totalChargePerHours} </td>
                <td> ${formData.netDue}</td>
              </tr>
            </tbody>
          </table>

          <div>
            <p
              style={{
                fontFamily: "initial",
                fontWeight: "700",
                fontSize: "32px",
                border: "2px solid green",
                width: "40%",
              }}
              className="mx-auto my-5"
            >
              Grand Total: ${formData.netDue}{" "}
            </p>
            
          </div>

          <div style={
            {
              display: "flex",
              justifyContent: "space-around"
            }
          }>
          <p
              style={{
                fontFamily: "inherit",
                fontSize: "29px",
                width: "50%",
                fontWeight: "600",
                fontStyle: "oblique",
                color: "#1E4B5F",
              }}
              className="text-start"
            >
              Pleasure Doing Buisness With You!
            </p>

            <section className="mt-5">
            <p>-----------------------------------</p>
            <p className="fst-italic">Signature</p>
            </section>
          </div>
          <hr />
          <p>
            <small>abc cleaners ltd. | 245-B south street pool | +23 0390098529</small>
          </p>
          
          {/* Buttonas */}
          <Row className="w-25 mx-auto">
            <Col>
              <Button
                className="btn-warning no-print"
                onClick={() => setSubmissionStatus(false)}
              >
                Back To Edit
              </Button>
            </Col>
            <Col>
              <Button className="no-print btn-danger" onClick={resetform}>
                Reset Invoice
              </Button>
            </Col>
            <Col>
              <Button className="no-print btn-success" onClick={handlePrint}>
                Print Invoice
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default InvoiceForm;
