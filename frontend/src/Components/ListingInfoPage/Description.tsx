import logo from "../../Assets/shirts.jpg";
import { useContext } from "react";
import { ListingContext } from "src/Context/ListingContext";
import { Row, Container } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Carousel from "react-bootstrap/Carousel";

function Description(): JSX.Element {
  const { viewListing } = useContext(ListingContext);
  const listingImages = [logo, logo, logo, logo];
  if (viewListing === null) {
    return <div></div>;
  }
  return (
    <Container className="d-flex flex-column justify-content-center">
      <Row>
        <Carousel slide={false} interval={null}>
          {listingImages.map((image, index) => (
            <Carousel.Item key={index}>
              <Image src={image} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Row>
    </Container>
  );
}

export default Description;
