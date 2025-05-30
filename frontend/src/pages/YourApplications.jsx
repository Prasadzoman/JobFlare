import React, { useEffect, useState } from 'react';

const YourApplications = () => {
  const [applications, setApplications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const res = await fetch('http://localhost:3000/user/applications', {
          credentials: 'include',   
        });

        if (!res.ok) {
          throw new Error("Failed to fetch applications");
        }

        const data = await res.json();
        setApplications(data);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError("Failed to load your applications.");
      }
    };

    fetchApp();
  }, []);

  return (
    <div className="container mt-4">
      <h2>Your Applications</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {applications.length === 0 && !error ? (
        <p>You have not applied for any jobs yet.</p>
      ) : (
        <ul className="list-group">
          {applications.map((app) => (
            <li key={app._id} className="list-group-item">
              <h5>{app.fullName}</h5>
              <p><strong>Email:</strong> {app.email}</p>
              <p><strong>Phone:</strong> {app.phone}</p>
              <p><strong>Job ID:</strong> {app.jobId}</p>
              <p><strong>Expected Salary:</strong> ₹{app.expectedSalary}</p>
              <p><strong>Experience:</strong> {app.experience} years</p>
              <p><strong>Skills:</strong> {app.skills.join(', ')}</p>
              <p><strong>Submitted on:</strong> {new Date(app.appliedAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default YourApplications;
