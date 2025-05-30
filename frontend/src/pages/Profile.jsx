import React, { useContext } from "react";
import { JobContext } from "../context/JobContext";

const Profile = () => {
  const { user } = useContext(JobContext);

  if (!user) {
    return <div className="text-center mt-5">Please login to see your profile.</div>;
  }

  return (
    <div className="container mt-4 p-4 rounded shadow" style={{ maxWidth: "600px", backgroundColor: "#f9f9f9" }}>
      <h2 className="mb-4">👤 User Profile</h2>

      <div className="mb-2"><strong>Name:</strong> {user.name}</div>
      <div className="mb-2"><strong>Email:</strong> {user.email}</div>
      <div className="mb-2"><strong>Role:</strong> {user.role}</div>

      <div className="mb-2">
        <strong>Phone:</strong> {user.phone || "Not provided"}
      </div>

      <div className="mb-2">
        <strong>Resume:</strong>{" "}
        {user.resumeUrl ? (
          <a href={user.resumeUrl} target="_blank" rel="noopener noreferrer">View Resume</a>
        ) : (
          "Not uploaded"
        )}
      </div>

      <div className="mb-2">
        <strong>Skills:</strong>{" "}
        {user.skills && user.skills.length > 0 ? (
          <ul className="ms-3">
            {user.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        ) : (
          "No skills listed"
        )}
      </div>
    </div>
  );
};

export default Profile;
