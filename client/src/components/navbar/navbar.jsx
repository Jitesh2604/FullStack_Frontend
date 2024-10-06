import { useNavigate } from "react-router-dom";
import "./navbar.css";

const Navbar = ({ cartLength }) => {

    const navigate = useNavigate();

    const handleLogout = () => {
      
      sessionStorage.removeItem('token'); 
    
      sessionStorage.removeItem('userId'); 
      
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
  }

  return (
    <div id="navbar">
      <div className="left">
        <h5 onClick={() => navigate('/')}>Home</h5>
        <h5>About</h5>
        <h5>Categories</h5>
      </div>
      <div className="center" onClick={() => navigate('/')}>JiteStore.</div>
      <div className="right">
        <h5 onClick={() => navigate('/cart')}>Cart</h5>
        <h6>{cartLength}</h6>
        <h5 onClick={() => navigate('/signin')}>Sign In</h5>
        <h5 onClick={handleLogout}>Logout</h5>
      </div>
    </div>
  );
};

export default Navbar;
