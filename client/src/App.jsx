import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/home.jsx';
import Navbar from './components/navbar/navbar.jsx';
import Cart from './components/cart/cart.jsx';
import Signin from './components/signin/signin.jsx';
import Signup from './components/signup/signup.jsx';
import AdminPage from './components/adminPage/adminPage.jsx';
import UserPage from './components/userPage/userPage.jsx';
import PrivateRoute from './components/privateRoute/privateRoute.jsx';
import './App.css';
import { useState } from 'react';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {

    setCartItems((prevItems) => [...prevItems, product]);
    // console.log(product);
  };

  return (
    <BrowserRouter>
      <Navbar cartLength={cartItems.length} />
      <Routes>
        <Route path='/' element={<Home addToCart={addToCart}/>} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute>
              <AdminPage />
            </PrivateRoute>
          } 
        />
        <Route path="/user" element={<UserPage />} />
        <Route 
          path="/cart" 
          element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} 
        /> 
        <Route path='/signin' element={<Signin />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
