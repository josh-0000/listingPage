import { useContext, useState, useRef, useEffect } from "react";
import { Form, InputGroup, Button, ListGroup } from "react-bootstrap";
import { ListingContext } from "../../Context/ListingContext";

function Search(): JSX.Element {
  const { allListings, setCategorySearch } = useContext(ListingContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const filteredItems = allListings
    .filter(
      (item) =>
        item.listingname.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.color &&
          item.color.toLowerCase().includes(searchQuery.toLowerCase()))
    )
    .slice(0, 6);

  const resetSearch = () => {
    setSearchQuery("");
  };

  const printResults = () => {
    setCategorySearch(searchQuery);
    resetSearch();
    setIsFocused(false);
  };

  const sort = (category: string) => {
    setCategorySearch(category);
    resetSearch();
    setIsFocused(false);
  };

  const handleClickOutside = (event: globalThis.MouseEvent) => {
    if (
      searchContainerRef.current &&
      !searchContainerRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="d-flex w-100" ref={searchContainerRef}>
      <Form
        className="d-flex w-50 align-items-center custom-search"
        role="search"
        onSubmit={(e) => e.preventDefault()}
      >
        <InputGroup>
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
          />
          {isFocused && (
            <div className="searchList">
              <ListGroup as="div">
                {filteredItems.map((item) => (
                  <ListGroup.Item
                    as="button"
                    action
                    onClick={(e) => {
                      e.stopPropagation();
                      sort(item.listingname);
                      setIsFocused(false);
                    }}
                    key={item.listingid}
                  >
                    {item.listingname}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          )}
          <Button
            variant="outline-success"
            type="submit"
            onClick={printResults}
          >
            Search
          </Button>
        </InputGroup>
      </Form>
    </div>
  );
}

export default Search;
