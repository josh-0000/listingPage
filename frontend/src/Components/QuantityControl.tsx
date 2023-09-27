import React, { useState } from "react";
import { Button, InputGroup, FormControl } from "react-bootstrap";

function QuantityControl() {
  const [count, setCount] = useState(0);

  const handleIncrement = () => setCount((prevCount) => prevCount + 1);
  const handleDecrement = () =>
    count > 0 && setCount((prevCount) => prevCount - 1);

  return (
    <InputGroup size="sm" className="mx-3" style={{ width: "90px" }}>
      <Button size="sm" variant="outline-primary" onClick={handleDecrement}>
        -
      </Button>
      <FormControl
        size="sm"
        value={count}
        onChange={(e) => setCount(Number(e.target.value))}
        style={{ textAlign: "center" }}
      />
      <Button size="sm" variant="outline-primary" onClick={handleIncrement}>
        +
      </Button>
    </InputGroup>
  );
}

export default QuantityControl;
