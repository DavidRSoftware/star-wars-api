import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import searchIcon from "./searchIcon.svg";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import "./styles.css";

function App() {
  const [results, setResults] = useState("");
  const [resultsDisplay, setResultsDisplay] = useState("");
  const [searchTerm, updateTerm] = useState("");
  const [previous, updatePrevious] = useState("");
  const [next, updateNext] = useState("");

  useEffect(() => {
    axios
      .get("https://swapi.dev/api/people/")
      .then((res) => {
        console.log(res);
        setResults(res.data.results);
        setResultsDisplay(res.data.results);
      })
      .catch((error) => {
        console.log(error);
        setResultsDisplay("error");
      });
  }, []);

  const updateResults = (newTerm) => {
    updateTerm(newTerm);
    const newResults = results.filter((value) =>
      value.name.toLowerCase().includes(newTerm.toLowerCase())
    );
    setResultsDisplay(newResults);
  };

  const getResults = () => {
    if (resultsDisplay === "error")
      return (
        <div className="error">
          A error has occured. Please check to see if you are connected to the
          internet and try reloading the page.
        </div>
      );
    else if (resultsDisplay !== "")
      return resultsDisplay.map((value, index) => {
        return (
          <ListGroup.Item key={index} variant="warning">
            {value.name}
          </ListGroup.Item>
        );
      });
    else return "Loading...";
  };

  const renderSearchBar = () => {
    if (resultsDisplay !== "error") {
      return (
        <InputGroup className="mb-4">
          <InputGroup.Prepend>
            <InputGroup.Text id="searchIcon">
              <img src={searchIcon} alt="" />
            </InputGroup.Text>
          </InputGroup.Prepend>
          <Form.Control
            value={searchTerm}
            onChange={(e) => updateResults(e.target.value)}
            placeholder="filter characters"
            aria-label="filter characters"
            aria-describedby="searchIcon"
            className="yellow"
          />
        </InputGroup>
      );
    }
  };

  return (
    <Container data-testid="app-component">
      <h2 data-testid="heading" className="my-4 title">Star Wars Characters</h2>
      <Row>
        <Col>{renderSearchBar()}</Col>
      </Row>
      <div className="mb-4" id="results">
        <ListGroup>{getResults()}</ListGroup>
      </div>
    </Container>
  );
}

export default App;
