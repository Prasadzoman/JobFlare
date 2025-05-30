import React, { useState,useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
const Register = () => {
    const {setUser}=useContext(JobContext)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'applicant'
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post(
        'http://localhost:3000/user/register',
        formData,
        { withCredentials: true }
      );
      const res = await axios.get('http://localhost:3000/user/me', {
      withCredentials: true,
    });
      setUser(res.data.user)
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div>
          <label style={styles.label}>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </div>

        <div>
          <label style={styles.label}>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={styles.input}
          >
            <option value="applicant">Applicant</option>
            <option value="recruiter">Recruiter</option>
          </select>
        </div>

        {error && <p style={styles.error}>{error}</p>}

        <button type="submit" style={styles.button}>
          Register
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    width: '100%',
    maxWidth: '400px',
    margin: '80px auto',
    padding: '2rem',
    background: '#f0f0f0',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)'
  },
  title: {
    textAlign: 'center',
    marginBottom: '1rem'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem'
  },
  input: {
    width: '100%',
    padding: '0.5rem',
    fontSize: '1rem'
  },
  button: {
    padding: '0.7rem',
    fontSize: '1rem',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  error: {
    color: 'red',
    textAlign: 'center'
  }
};

export default Register;