import React from "react";
import axios from "axios"
import { useState } from "react";

const New = () => {

    const [form, setForm] = useState({
        title: "",
        description: "",
        company: "",
        location: "",
        salary: "",
        type: "",
        experience: "",
        skills: "",
        logo: null
    });

    const [message, setMessage] = useState({})
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'logo') {
            setForm({ ...form, logo: files[0] });
        } else {
            setForm({ ...form, [name]: value });
        }
    };

    const sendReq = async (form) => {
        try {
            const res = await axios.post("http://localhost:3000/listings", form, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });
            setMessage({ type: "success", text: "Job listing created successfully!" });
            return res.data;
        } catch (err) {
            setMessage({ type: "error", text: "Failed to create job listing." });
            return null;
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const skillsArr = form.skills.split(",").map((e) => e.trim());

        const formData = new FormData();
        formData.append("title", form.title);
        formData.append("description", form.description);
        formData.append("company", form.company);
        formData.append("location", form.location);
        formData.append("salary", form.salary);
        formData.append("type", form.type);
        formData.append("experience", form.experience);
        formData.append("logo", form.logo);

        skillsArr.forEach(skill => formData.append("skills", skill));

        await sendReq(formData);

        setForm({
            title: "",
            description: "",
            company: "",
            location: "",
            salary: "",
            type: "",
            experience: "",
            skills: "",
            logo: null
        });
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
                            fontWeight: "bold",
                        }}
                    >
                        {message.text}
                    </div>
                )}
            </div>
            <div className="container mt-4">

                <h2>Create New Job Listing</h2>
                <form onSubmit={handleSubmit}>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="title" className="form-label">Job Title</label>
                            <input type="text" className="form-control" id="title" name="title" required onChange={handleChange} value={form.title} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="company" className="form-label">Company</label>
                            <input type="text" className="form-control" id="company" name="company" required onChange={handleChange} value={form.company} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea className="form-control" id="description" name="description" rows="3" required onChange={handleChange} value={form.description}></textarea>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="location" className="form-label">Location</label>
                            <input type="text" className="form-control" id="location" name="location" required onChange={handleChange} value={form.location} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="salary" className="form-label">Salary</label>
                            <input type="text" className="form-control" id="salary" name="salary" required onChange={handleChange} value={form.salary} />
                        </div>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="type" className="form-label">Job Type</label>
                            <input type="text" className="form-control" id="type" name="type" placeholder="e.g., Full-time, Internship" required onChange={handleChange} value={form.type} />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="experience" className="form-label">Experience</label>
                            <input type="text" className="form-control" id="experience" name="experience" required onChange={handleChange} value={form.experience} />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="skills" className="form-label">Skills (comma separated)</label>
                        <input type="text" className="form-control" id="skills" name="skills" required onChange={handleChange} value={form.skills} />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="logo" className="form-label">Company Logo</label>
                        <input type="file" className="form-control" id="logo" name="logo" required onChange={handleChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </>
    );
};

export default New;
