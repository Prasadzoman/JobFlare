import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ApplyPage = () => {
  const {id}=useParams();
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    linkedIn: "",
    expectedSalary: "",
    startDate: "",
    workAuthorization: false,
    relocate: false,
    experience: "",
    skills: ""
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [message, setMessage] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const skillsArr = form.skills
      .split(",")
      .map((skill) => skill.trim())
      .filter(Boolean);

    const formData = new FormData();
    formData.append("jobId",id );
    formData.append("fullName", form.fullName);
    formData.append("email", form.email);
    formData.append("phone", form.phone);
    formData.append("coverLetter", form.coverLetter);
    formData.append("linkedIn", form.linkedIn);
    formData.append("expectedSalary", form.expectedSalary);
    formData.append("startDate", form.startDate);
    formData.append("workAuthorization", form.workAuthorization);
    formData.append("relocate", form.relocate);
    formData.append("experience", form.experience);

    skillsArr.forEach((skill) => {
      formData.append("skills", skill);
    });

    if (resumeFile) {
      formData.append("resume", resumeFile);
    }

    try {
      const res = await axios.post("https://jobflare.onrender.com/applications", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
      });

      setMessage({ type: "success", text: "Application submitted successfully!" });

      setForm({
        fullName: "",
        email: "",
        phone: "",
        coverLetter: "",
        linkedIn: "",
        expectedSalary: "",
        startDate: "",
        workAuthorization: false,
        relocate: false,
        experience: "",
        skills: ""
      });
      setResumeFile(null);
    } catch (err) {
      console.error(err);
      setMessage({ type: "error", text: "Failed to submit application." });
    }
  };

  return (
    <>
      {message.text && (
        <div
          style={{
            padding: "10px",
            marginBottom: "15px",
            color: message.type === "success" ? "green" : "red",
            border: "1px solid",
            borderColor: message.type === "success" ? "green" : "red",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
        >
          {message.text}
        </div>
      )}

      <div className="container mt-4">
        <h2>Apply for Job</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label htmlFor="fullName" className="form-label">Full Name*</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              required
              value={form.fullName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email*</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Phone*</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              required
              value={form.phone}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="coverLetter" className="form-label">Cover Letter</label>
            <textarea
              className="form-control"
              id="coverLetter"
              name="coverLetter"
              maxLength={2000}
              rows={4}
              value={form.coverLetter}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="linkedIn" className="form-label">LinkedIn Profile URL</label>
            <input
              type="url"
              className="form-control"
              id="linkedIn"
              name="linkedIn"
              value={form.linkedIn}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="resume" className="form-label">Resume File*</label>
            <input
              type="file"
              className="form-control"
              id="resume"
              name="resume"
              accept=".pdf,.doc,.docx"
              required
              onChange={handleFileChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="expectedSalary" className="form-label">Expected Salary</label>
            <input
              type="number"
              className="form-control"
              id="expectedSalary"
              name="expectedSalary"
              min="0"
              value={form.expectedSalary}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">Available Start Date</label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              name="startDate"
              value={form.startDate}
              onChange={handleChange}
            />
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="workAuthorization"
              name="workAuthorization"
              checked={form.workAuthorization}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="workAuthorization">
              Work Authorization
            </label>
          </div>

          <div className="form-check mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="relocate"
              name="relocate"
              checked={form.relocate}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="relocate">
              Willing to Relocate
            </label>
          </div>

          <div className="mb-3">
            <label htmlFor="experience" className="form-label">Years of Experience</label>
            <input
              type="text"
              className="form-control"
              id="experience"
              name="experience"
              min="0"
              value={form.experience}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="skills" className="form-label">Skills (comma separated)</label>
            <input
              type="text"
              className="form-control"
              id="skills"
              name="skills"
              value={form.skills}
              onChange={handleChange}
              placeholder="e.g. JavaScript, React, Node.js"
            />
          </div>

          <button type="submit" className="btn btn-primary">Submit Application</button>
        </form>
      </div>
    </>
  );
};

export default ApplyPage;
