import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ShowApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/applications/${id}`, {
          withCredentials: true
        });
        setApplications(res.data);
      } catch (err) {
        setError('Failed to fetch applications.');
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [id]);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Applications for Listing</h2>
      {applications.length === 0 ? (
        <p>No applications found.</p>
      ) : (
        <ul className="app-container">
          {applications.map((app, index) => (
            <li key={index} className="border p-4 rounded shadow-sm">
              <p><strong>Name:</strong> {app.fullName}</p>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Skills:</strong> {app.skills?.join(', ') || 'N/A'}</p>
              <p><strong>Cover Letter:</strong> {app.coverLetter || 'N/A'}</p>
              <a href={app.resumeUrl} target="_blank" rel="noopener noreferrer">
  View Resume
</a>

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ShowApplications;
