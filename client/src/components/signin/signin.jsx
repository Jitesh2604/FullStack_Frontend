import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./signin.css";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }), 
      });

      console.log(response)

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to sign in. Please try again.");
      }

      const { token, userRole } = await response.json();
      console.log('Token received:', token);
      console.log( "userRole:", userRole);
      
      sessionStorage.setItem('token', JSON.stringify(token));
      sessionStorage.setItem('userRole', JSON.stringify(userRole))

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="main">
      <h2>Sign In</h2>
      <div className="signinFormCart">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full">
            Sign In
          </button>
          <p>
            Don’t have an account?{" "}
            <u className="clickForSignup" onClick={() => navigate("/signup")} >Sign Up</u>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signin;
