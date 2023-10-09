import { useContext } from "react";
import "./Styles/App.css";
import Navbar from "./Components/NavAndFooter/Navbar";
import Footer from "./Components/NavAndFooter/Footer";
import { ListingContextProvider } from "./Context/ListingContext";
import { UserContextProvider } from "./Context/UserContext";
import MainPage from "./Pages/MainPage";
import { ViewContext } from "./Context/ViewContext";
import LoginPage from "./Pages/LoginPage";
import AccountCreationPage from "./Pages/AccountCreationPage";
import CartPage from "./Pages/CartPage";
import { Container } from "react-bootstrap";
import ProfilePage from "./Pages/ProfilePage";
import ListingInfoPage from "./Pages/ListingInfoPage";

function App(): JSX.Element {
  const { currentPage } = useContext(ViewContext);

  let content;
  switch (currentPage) {
    case "HOME":
      content = <MainPage />;
      break;
    case "LOGIN":
      content = <LoginPage />;
      break;
    case "ACCOUNT CREATION":
      content = <AccountCreationPage />;
      break;
    case "CART":
      content = <CartPage />;
      break;
    case "PROFILE":
      content = <ProfilePage />;
      break;
    case "DESCRIPTION":
      content = <ListingInfoPage />;
  }

  return (
    <Container fluid className="v-100 bg-light">
      <ListingContextProvider>
        <UserContextProvider>
          <Navbar />
          {content}
          <Footer />
        </UserContextProvider>
      </ListingContextProvider>
    </Container>
  );
}

export default App;
