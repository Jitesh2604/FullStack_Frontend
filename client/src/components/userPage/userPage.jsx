import { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import "./userPage.css";

const UserPage = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("http://localhost:8000/api/products");
      setProducts(data);
      setLoading(false); // Set loading to false once data is fetched
      setError(""); 
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <p>Loading products...</p>; 
  }

  return (
    <div className="user-page-container">
      <h2>Available Products</h2>
      {error && <p className="error-message">{error}</p>}

      <div id="product-list">
        {products.map((product) => (
          <div key={product._id} id="product-item"> 
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <button
              onClick={() => addToCart(product)} 
              className="add-to-cart-btn"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

// Move propTypes outside of the component
UserPage.propTypes = {
  addToCart: PropTypes.func.isRequired,
};

export default UserPage;
