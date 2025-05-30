import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
    type: "",
    experience: "",
    skills: "",
    logo: ""
  });

  const [logoFile, setLogoFile] = useState(null); // ⬅️ Track selected file
  const [message, setMessage] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setLogoFile(e.target.files[0]); // ⬅️ Set file
  };

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/listings/${id}`, {
          withCredentials: true
        });
        const data = res.data;
        setForm({
          ...data,
          skills: Array.isArray(data.skills) ? data.skills.join(", ") : data.skills
        });
      } catch (err) {
        setMessage({ type: "error", text: "Failed to load job data." });
      }
    };

    fetchJob();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append updated fields
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("company", form.company);
    formData.append("location", form.location);
    formData.append("salary", form.salary);
    formData.append("type", form.type);
    formData.append("experience", form.experience);
    formData.append("skills", form.skills);

    // If a new logo is uploaded, use that. Otherwise send current logo string
    if (logoFile) {
      formData.append("logo", logoFile);
    } else {
      formData.append("logo", form.logo);
    }

    try {
      await axios.put(`http://localhost:3000/listings/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setMessage({ type: "success", text: "Job updated successfully!" });
      setTimeout(() => navigate("/"), 1500);
    } catch (err) {
      setMessage({ type: "error", text: "Failed to update job listing." });
    }
  };

  return (
    <>
      <div className="message">
        {message.text && (
          <div
            style={{
              padding: "10px",
              marginBottom: "15px",
              color: message.type === "success" ? "green" : "red",
              border: "1px solid",
              borderColor: message.type === "success" ? "green" : "red",
              borderRadius: "5px",
              fontWeight: "bold"
            }}
          >
            {message.text}
          </div>
        )}
      </div>

      <div className="container mt-4">
        <h2>Edit Job Listing</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="title" className="form-label">
                Job Title
              </label>
              <input type="text" className="form-control" id="title" name="title" required onChange={handleChange} value={form.title} />
            </div>
            <div className="col-md-6">
              <label htmlFor="company" className="form-label">
                Company
              </label>
              <input type="text" className="form-control" id="company" name="company" required onChange={handleChange} value={form.company} />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea className="form-control" id="description" name="description" rows="3" required onChange={handleChange} value={form.description}></textarea>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input type="text" className="form-control" id="location" name="location" required onChange={handleChange} value={form.location} />
            </div>
            <div className="col-md-6">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input type="text" className="form-control" id="salary" name="salary" required onChange={handleChange} value={form.salary} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="type" className="form-label">
                Job Type
              </label>
              <input type="text" className="form-control" id="type" name="type" required onChange={handleChange} value={form.type} />
            </div>
            <div className="col-md-6">
              <label htmlFor="experience" className="form-label">
                Experience
              </label>
              <input type="text" className="form-control" id="experience" name="experience" required onChange={handleChange} value={form.experience} />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="skills" className="form-label">
              Skills (comma separated)
            </label>
            <input type="text" className="form-control" id="skills" name="skills" required onChange={handleChange} value={form.skills} />
          </div>

          <div className="mb-3">
            <label htmlFor="logo" className="form-label">
              Upload New Logo (optional)
            </label>
            <input type="file" className="form-control" id="logo" name="logo" accept="image/*" onChange={handleFileChange} />
            {form.logo && !logoFile && (
              <small>Current logo: <a href={form.logo} target="_blank" rel="noreferrer">View</a></small>
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Edit;
