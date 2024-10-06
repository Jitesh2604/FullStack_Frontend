import { useState, useEffect } from "react";
import AdminPage from "../adminPage/adminPage"
import UserPage from "../userPage/userPage"
import "./home.css";

const HomePage = ({ addToCart }) => {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedRole = JSON.parse(sessionStorage.getItem("userRole")); 
    // console.log(storedRole);
    setRole(storedRole); 
    
  }, []);
  
  if (role == "Admin") {
    return <AdminPage />;
  } else {
    return <UserPage addToCart={addToCart}/>;
  }
};

export default HomePage;
