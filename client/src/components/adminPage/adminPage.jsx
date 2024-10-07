import axios from "axios";
import { useState, useEffect } from "react";
import "./adminPage.css";

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");
  const [productName, setProductName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/products`);
      setProducts(data);
    } catch (err) {
      setError("Failed to fetch products. Please try again later.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token");

    if (!token) {
        setError("You must be logged in to add a product.");
        return;
    }

    const productData = {
        name: productName,
        description: desc,
        price: price,
    };
  
    try {
      if (editingProductId) {
        const { data } = await axios.put(
          `${import.meta.env.VITE_APP_API_URL}/products/${editingProductId}`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`, 
            }
          }
        );
        setProducts(
          products.map((product) => 
            product._id === editingProductId ? data : product
          )
        );
        setEditingProductId(null);
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_APP_API_URL}/products`,
          productData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProducts([...products, data]);
      }    

      setProductName("");
      setDesc("");
      setPrice("");
      setIsFormOpen(false);
    } catch (err) {
      setError("Failed to add the product. Please try again later.");
    }
  };

  const handleAddNew = () => {
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
  };

  const handleDelete = async (productId) => {
    const token = sessionStorage.getItem("token");

    if (!token) {
      setError("You must be logged in to delete a product.");
      return;
    }

    try {
      await axios.delete(
        `${import.meta.env.VITE_APP_API_URL}/products/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      setError("Failed to delete the product. Please try again later.");
    }
  };

  const handleUpdate = (product) => {
    setIsFormOpen(true);
    setEditingProductId(product._id);
    setProductName(product.name || "");
    setDesc(product.description || "");
    setPrice(product.price || "");
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="home-container">
      <button id="addNew" onClick={handleAddNew}>
        {editingProductId ? "Edit Product" : "Add New Product"}
      </button>

      {isFormOpen && (
        <div className="addNewProductForm">
          <div className="formCart">
            <button onClick={handleCloseForm} className="closeBtn">
              X
            </button>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="productName">Product Name</label>
                <input
                  id="productName"
                  type="text"
                  placeholder="Product Name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="price">Price</label>
                <input
                  id="price"
                  type="text"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="desc">Description</label>
                <input
                  id="desc"
                  type="text"
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="submitBtn">
                {editingProductId ? "Update" : "Add"}
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="product-list">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} id="product-item">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p>Price: ${product.price}</p>
              <div className="btns">
                <button onClick={() => handleUpdate(product)} className="updateBtn">
                  Update
                </button>
                <button onClick={() => handleDelete(product._id)} className="deleteBtn">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AdminPage;
