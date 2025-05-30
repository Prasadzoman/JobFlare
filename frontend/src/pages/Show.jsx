import React, { useState, useEffect, useContext } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { JobContext } from '../context/JobContext';

const Show = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(JobContext);

  const [job, setJob] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await fetch(`http://localhost:3000/listings/${id}`);
        if (!res.ok) throw new Error("Job not found");
        const data = await res.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [id]);

  const deleteJob = async () => {
    try {
      const res = await axios.delete(`http://localhost:3000/listings/${id}`, {
        withCredentials: true
      });
      const data = await res.data;
      console.log(data);
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      setError(`Unable to delete the listing: ${err.response?.data || err.message}`);
    }
  };

  const isOwnerRecruiter = user && user.role === 'recruiter' && job.userId && user._id.toString() === job.userId.toString();

  return (
    <div className='show-body d-flex justify-content-center'>
      {loading && <Spinner animation="border" variant="primary" style={{ marginTop: "30px" }} />}

      {!loading && error && (
        <Alert variant="danger" className="mt-4 text-center w-75">
          {error}
        </Alert>
      )}

      {!loading && !error && (
        <Card style={{ width: '38rem', margin: '1rem' }}>
          <Card.Img variant="top" src={job.logo} />
          <Card.Body>
            <Card.Title>{job.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
            <Card.Text><strong>Posted:</strong> {new Date(job.datePosted).toLocaleDateString()}</Card.Text>
            <Card.Text>{job.description}</Card.Text>
            <Card.Text>
              <strong>Location:</strong> {job.location}<br />
              <strong>Salary:</strong> {job.salary}<br />
              <strong>Type:</strong> {job.type}
            </Card.Text>
            <Card.Text>
              <strong>Required skills:</strong>{" "}
              {job.skills && job.skills.map((e, idx) => (
                <span key={idx} className="badge bg-secondary me-1">{e}</span>
              ))}
            </Card.Text>

            <div className="show-buttons d-flex gap-2 flex-wrap mt-3">
              {user && user.role === 'applicant' && (
                <Link to={`/apply/${job._id}`}>
                  <Button variant="primary">Apply</Button>
                </Link>
              )}

              {isOwnerRecruiter && (
                <>
                  <Button variant="danger" onClick={deleteJob}>Delete</Button>
                  <Link to={`/edit/${job._id}`}>
                    <Button variant="warning">Edit</Button>
                  </Link>
                  <Link to={`/applications/${job._id}`}>
                    <Button variant="info">Applications</Button>
                  </Link>
                </>
              )}

              {user && user.role === 'recruiter' && job.userId && user._id.toString() !== job.userId.toString() && (
                <Alert variant="warning" className="mt-3 w-100">
                  You are not authorized to modify this listing.
                </Alert>
              )}
            </div>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default Show;
