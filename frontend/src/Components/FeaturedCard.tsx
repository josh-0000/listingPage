import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import photo1 from "../Assets/slide1.svg";
import photo2 from "../Assets/slide2.svg";
import photo3 from "../Assets/slide3.svg";
import { Container } from "react-bootstrap";
import "../Styles/App.css";

function FeatureCard(): JSX.Element {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  return (
    <Container
      style={{ maxWidth: "1500px" }}
      className="mb-5 position-relative"
    >
      <h3 className="position-absolute featured-card-title">Featured</h3>
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        className="position-relative"
      >
        <Carousel.Item>
          <img
            className="d-block w-100 position-relative"
            src={photo1}
            alt="First slide"
          />
          <Carousel.Caption>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 position-relative"
            src={photo2}
            alt="Second slide"
          />
          <Carousel.Caption>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 position-relative"
            src={photo3}
            alt="Third slide"
          />
          <Carousel.Caption>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </Container>
  );
}

export default FeatureCard;
