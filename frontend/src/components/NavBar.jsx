import React, { useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { JobContext } from '../context/JobContext';

const NavBar = () => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(JobContext);

  const handleLogout = async () => {
    try {
      await axios.post('https://jobflare.onrender.com/user/logout', {}, { withCredentials: true });
      setUser(null);
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <Navbar expand="lg" bg="dark" variant="dark" sticky="top" className="py-3 shadow">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fs-3 fw-bold text-info">
          JobFlare
          <i class="fa-solid fa-feather-pointed" style={{color:' #74C0FC'}}></i>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto fs-5 align-items-center">
            <Nav.Link as={Link} to="/" className="px-3">
              Listings
            </Nav.Link>

            {user && user.role === 'recruiter' && (
              <>
                <Nav.Link as={Link} to="/new" className="px-3">
                  New Listing
                </Nav.Link>
                <Nav.Link as={Link} to="/your-jobs" className="px-3">
                  Your Listings
                </Nav.Link>
              </>
            )}

            {user && user.role === 'applicant' && (
              <Nav.Link as={Link} to="/your-applications" className="px-3">
                Your Applications
              </Nav.Link>
            )}
          </Nav>


          <Nav className="ms-auto fs-5 align-items-center">
            {user ? (
              <>
                <Nav.Link as={Link} to="/profile" className="px-3">
                  Profile
                </Nav.Link>
                <Nav.Link
                  as="span"
                  onClick={handleLogout}
                  className="px-3"
                  style={{ cursor: 'pointer' }}
                >
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="px-3">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register" className="px-3">
                  SignUp
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
};

export default NavBar;
