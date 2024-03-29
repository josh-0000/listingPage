import { useContext, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import photo1 from "../../Assets/PremiumBrands.svg";
import photo2 from "../../Assets/nike.svg";
import photo3 from "../../Assets/adidas.svg";
import { Container } from "react-bootstrap";
import "../../Styles/App.css";
import { ListingContext } from "../../Context/ListingContext";

function FeatureCard(): JSX.Element {
  const { showFeatured } = useContext(ListingContext);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  const content = showFeatured ? (
    <Container
      style={{ maxWidth: "1500px" }}
      className="mb-5 position-relative"
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        controls={false}
        className="position-relative featured-card"
      >
        <Carousel.Item>
          <img
            className="d-block w-100 position-relative"
            src={photo1}
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 position-relative"
            src={photo2}
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 position-relative"
            src={photo3}
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </Container>
  ) : (
    <div></div>
  );

  return <div>{content}</div>;
}

export default FeatureCard;
