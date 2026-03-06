import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import "../css/Navbar.css";

function NavBar() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">Movie App</Link>
      </div>
      <div className="navbar-link">
        <Link to="/" className="nav-link">
          Home
        </Link>
        {user ? (
          <span style={{ display: 'inline-flex', gap: 'inherit', alignItems: 'center' }}>
            <Link to="/watched" className="nav-link">
              Watched
            </Link>
            <Link to="/favorites" className="nav-link">
              Favorites
            </Link>
            <div className="profile-menu">
              <button className="profile-button">
                <svg className="profile-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" />
                </svg>
                {user.username || "Profile"}
              </button>
              <div className="dropdown-content">
                <button onClick={handleLogout}>
                  Logout
                </button>
              </div>
            </div>
          </span>
        ) : (
          <span style={{ display: 'inline-flex', gap: 'inherit' }}>
            <Link to="/login" className="nav-link">
              Login
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
          </span>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
