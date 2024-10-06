import "./cart.css"; 

const Cart = ({ cartItems, setCartItems }) => {
  // Function to remove item from cart
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <div className="cart-container">
      <h2 className="tittle">Your Cart</h2>
      <h3 className="totalPrice">Total Price: ${totalPrice}</h3>
      {cartItems.length > 0 ? (
        <div className="cart">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Price: ${item.price}</p>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </div>
          ))}
          
        </div>
      ) : (
        <p className="empty">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
