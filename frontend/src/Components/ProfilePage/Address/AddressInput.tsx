import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { ViewContext } from "../../../Context/ViewContext";
import { useContext, useState } from "react";
import { UserContext } from "../../../Context/UserContext";
import { AddressInterface } from "src/Interfaces/Interfaces";

function AddressInput(): JSX.Element {
  const { setAddAddress } = useContext(ViewContext);
  const { user, setAddressList, addressList } = useContext(UserContext);
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  const saveAddress = async () => {
    const payload = {
      line1,
      line2,
      city,
      state,
      postalCode,
      country,
      userId: user.userid,
    };
    try {
      const response = await fetch("http://localhost:3001/user/save-address", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        const address = data.address;
        setAddressList([...addressList, address as AddressInterface]);
        setAddAddress(false);
      } else {
        console.error("Failed to save address");
      }
    } catch (error) {
      console.error("Error saving address:", error);
    }
  };
  return (
    <Card className="p-4 bg-light shadow-sm mx-auto mt-3">
      <Card.Text className="p-2">
        <Form.Group>
          <Form.Control
            type="text"
            className="mt-2 p-2"
            placeholder="Street Address or P.O. Box"
            onChange={(e) => setLine1(e.target.value)}
          />
          <Form.Control
            type="text"
            className="mt-2 p-2"
            placeholder="Apt, Suite, Unit, Building, Floor, etc."
            onChange={(e) => setLine2(e.target.value)}
          />
          <Row>
            <Col md={6}>
              <Form.Control
                type="text"
                className="mt-2 p-2"
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Select
                className="mt-2 p-2"
                onChange={(e) => setState(e.target.value)}
              >
                <option>Select State</option>
                <option value="AL">Alabama</option>
                <option value="AK">Alaska</option>
                <option value="AZ">Arizona</option>
                <option value="AR">Arkansas</option>
                <option value="CA">California</option>
                <option value="CO">Colorado</option>
                <option value="CT">Connecticut</option>
                <option value="DE">Delaware</option>
                <option value="DC">District Of Columbia</option>
                <option value="FL">Florida</option>
                <option value="GA">Georgia</option>
                <option value="HI">Hawaii</option>
                <option value="ID">Idaho</option>
                <option value="IL">Illinois</option>
                <option value="IN">Indiana</option>
                <option value="IA">Iowa</option>
                <option value="KS">Kansas</option>
                <option value="KY">Kentucky</option>
                <option value="LA">Louisiana</option>
                <option value="ME">Maine</option>
                <option value="MD">Maryland</option>
                <option value="MA">Massachusetts</option>
                <option value="MI">Michigan</option>
                <option value="MN">Minnesota</option>
                <option value="MS">Mississippi</option>
                <option value="MO">Missouri</option>
                <option value="MT">Montana</option>
                <option value="NE">Nebraska</option>
                <option value="NV">Nevada</option>
                <option value="NH">New Hampshire</option>
                <option value="NJ">New Jersey</option>
                <option value="NM">New Mexico</option>
                <option value="NY">New York</option>
                <option value="NC">North Carolina</option>
                <option value="ND">North Dakota</option>
                <option value="OH">Ohio</option>
                <option value="OK">Oklahoma</option>
                <option value="OR">Oregon</option>
                <option value="PA">Pennsylvania</option>
                <option value="RI">Rhode Island</option>
                <option value="SC">South Carolina</option>
                <option value="SD">South Dakota</option>
                <option value="TN">Tennessee</option>
                <option value="TX">Texas</option>
                <option value="UT">Utah</option>
                <option value="VT">Vermont</option>
                <option value="VA">Virginia</option>
                <option value="WA">Washington</option>
                <option value="WV">West Virginia</option>
                <option value="WI">Wisconsin</option>
                <option value="WY">Wyoming</option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Control
                type="text"
                className="mt-2 p-2"
                placeholder="Zip Code"
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Select
                className="mt-2 p-2"
                onChange={(e) => setCountry(e.target.value)}
              >
                <option>Select Country</option>
                <option value="US">United States (US)</option>
                <option value="CA">Canada (CA)</option>
                <option value="GB">United Kingdom (GB)</option>
                <option value="AU">Australia (AU)</option>
                <option value="DE">Germany (DE)</option>
                <option value="FR">France (FR)</option>
                <option value="IN">India (IN)</option>
                <option value="JP">Japan (JP)</option>
                <option value="CN">China (CN)</option>
                <option value="BR">Brazil (BR)</option>
                <option value="RU">Russia (RU)</option>
                <option value="ZA">South Africa (ZA)</option>
                <option value="IT">Italy (IT)</option>
                <option value="ES">Spain (ES)</option>
                <option value="MX">Mexico (MX)</option>
                <option value="NL">Netherlands (NL)</option>
                <option value="SE">Sweden (SE)</option>
                <option value="CH">Switzerland (CH)</option>
                <option value="SA">Saudi Arabia (SA)</option>
                <option value="AR">Argentina (AR)</option>
                <option value="KR">South Korea (KR)</option>
                <option value="SG">Singapore (SG)</option>
              </Form.Select>
            </Col>
          </Row>
        </Form.Group>
      </Card.Text>
      <Card.Text>
        <div className="mt-2">
          <Button type="submit" onClick={() => saveAddress()}>
            Add
          </Button>
          <Button
            type="button"
            className="mx-2"
            onClick={() => setAddAddress(false)}
          >
            Cancel
          </Button>
        </div>
      </Card.Text>
    </Card>
  );
}

export default AddressInput;
