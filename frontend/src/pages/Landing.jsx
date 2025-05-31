import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";

const Landing = () => {
  const [jobs, setJobs] = useState([]);
  const [skill, setSkill] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobs = async () => {
    try {
      if (skill) {
        const res = await axios.get(`https://jobflare.onrender.com/listings/skills/${skill}`);
        setJobs(res.data);
      } else if (searchTerm) {
        const res = await axios.get(`https://jobflare.onrender.com/listings/search?term=${searchTerm}`);
        setJobs(res.data);
      } else {
        const res = await axios.get("https://jobflare.onrender.com/listings");
        setJobs(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [skill]);

  const handleSearch = async (e) => {
    e.preventDefault();
    setSkill(""); 
    await fetchJobs();
  };

  return (
    <div className="landing-body">
      <div className="search-bar">
        <Form onSubmit={handleSearch} className="mb-4 d-flex">
        <Form.Control
          type="text"
          placeholder="Search jobs by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button type="submit" variant="primary" className="ms-2">
          Search
        </Button>
      </Form>
      </div>
      <Container className="my-4">
      <div className="filters d-flex flex-nowrap gap-3 mb-4 overflow-auto">
        <div className="filter" onClick={() => setSkill("")}>
          <i className="fa-solid fa-list fa-2x"></i> <strong>All</strong>
        </div>
        <div className="filter" onClick={() => setSkill("React")}>
          <i className="fa-brands fa-react fa-2x"></i> <strong>React</strong>
        </div>
        <div className="filter" onClick={() => setSkill("JavaScript")}>
          <i className="fa-brands fa-js fa-2x"></i> <strong>JavaScript</strong>
        </div>
        <div className="filter" onClick={() => setSkill("HTML")}>
          <i className="fa-brands fa-html5 fa-2x"></i> <strong>HTML</strong>
        </div>
        <div className="filter" onClick={() => setSkill("CSS")}>
          <i className="fa-brands fa-css3-alt fa-2x"></i> <strong>CSS</strong>
        </div>
        <div className="filter" onClick={() => setSkill("Node.js")}>
          <i className="fa-brands fa-node-js fa-2x"></i> <strong>Node.js</strong>
        </div>
        <div className="filter" onClick={() => setSkill("MongoDB")}>
          <i className="fa-solid fa-database fa-2x"></i> <strong>MongoDB</strong>
        </div>
        <div className="filter" onClick={() => setSkill("Figma")}>
          <i className="fa-brands fa-figma fa-2x"></i> <strong>Figma</strong>
        </div>
        <div className="filter" onClick={() => setSkill("Flutter")}>
          <i className="fa-solid fa-mobile-screen fa-2x"></i> <strong>Flutter</strong>
        </div>
        <div className="filter" onClick={() => setSkill("TensorFlow")}>
          <i className="fa-solid fa-robot fa-2x"></i> <strong>TensorFlow</strong>
        </div>
        <div className="filter" onClick={() => setSkill("Selenium")}>
          <i className="fa-solid fa-bug fa-2x"></i> <strong>Selenium</strong>
        </div>
        <div className="filter" onClick={() => setSkill("Linux")}>
          <i className="fa-solid fa-terminal fa-2x"></i> <strong>Linux</strong>
        </div>
      </div>

      <h2 className="mb-4 text-center text-primary">
        {skill ? `Jobs requiring ${skill}` : searchTerm ? `Search Results for "${searchTerm}"` : "All Job Listings"}
      </h2>

      {jobs.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {jobs.map((job) => (
            <Col key={job._id}>
              <Link to={`/${job._id}`} style={{ textDecoration: "none", color: "inherit" }}>
                <Card className="shadow-sm h-100">
                  {job.logo && (
                    <Card.Img
                      variant="top"
                      src={job.logo}
                      alt={`${job.company} logo`}
                      style={{ maxHeight: "180px", objectFit: "contain", padding: "10px" }}
                    />
                  )}
                  <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      {job.company} — {job.location}
                    </Card.Subtitle>
                    <Card.Text>
                      <strong>Type:</strong> {job.type} <br />
                      <strong>Experience:</strong> {job.experience} <br />
                      <strong>Salary:</strong> {job.salary}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-secondary">No listings found.</p>
      )}
    </Container>
    </div>
  );
};

export default Landing;
