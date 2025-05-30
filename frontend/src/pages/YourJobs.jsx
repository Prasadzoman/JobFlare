import { useState, useEffect, useContext } from "react";
import { JobContext } from "../context/JobContext";
import { Container, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const YourJobs = () => {
  const [jobs, setJobs] = useState([]);
  const { user } = useContext(JobContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      if (!user?._id) return;

      try {
        const res = await fetch(`http://localhost:3000/user/${user._id}`,{
      credentials: 'include', 
    });
        const data = await res.json();
        setJobs(data);
      } catch (err) {
        console.error("Failed to fetch user listings:", err);
      }
    };

    fetchJobs();
  }, [user]);

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center text-primary">Your Job Listings</h2>
      {jobs.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {jobs.map((job, idx) => (
            <Col key={idx}>
              <Card className="shadow-sm h-100">
                {job.logo && (
                  <Card.Img
                    variant="top"
                    src={job.logo}
                    alt={`${job.company} logo`}
                    style={{ maxHeight: "180px", objectFit: "contain", padding: "10px" }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{job.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {job.company} — {job.location}
                  </Card.Subtitle>
                  <Card.Text>
                    <strong>Type:</strong> {job.type}<br />
                    <strong>Experience:</strong> {job.experience}<br />
                    <strong>Salary:</strong> {job.salary}
                  </Card.Text>

                  <ButtonGroup className="mt-auto">
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate(`/${job._id}`)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="outline-success"
                      onClick={() => navigate(`/listing/applications/${job._id}`)}
                    >
                      Applications
                    </Button>
                  </ButtonGroup>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <p className="text-center text-secondary">No listings found.</p>
      )}
    </Container>
  );
};

export default YourJobs;
