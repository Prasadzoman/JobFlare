import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchJob = async () => {
      const result = await fetch('http://localhost:3000/listings')
      const res = await result.json();
      console.log(res)
      setJobs(res);
    }
    fetchJob()
  }, [])
  

  const checkAuth = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/me', { withCredentials: true });
      setUser(res.data.user);
    } catch {
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <JobContext.Provider value={{ jobs, setJobs,user,setUser }}>
      {children}
    </JobContext.Provider>
  );
}
