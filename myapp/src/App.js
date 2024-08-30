import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx';
import About from './pages/About.jsx';
import Policy from './pages/Policy.jsx';
import Contact from './pages/Contact.jsx';
import Pagenotfound from './pages/Pagenotfound.jsx';
import Register from './pages/Register.jsx';
import Login from './pages/Login.jsx';
import Dashboard from './pages/user/dashboard.jsx';
import Privateroute from './components/routes/private.js';
import Forgotpassword from './pages/forgot-password.jsx';
import Adminroute from './components/routes/adminroute.js';
import AdminDashboard from './admin/AdminDashboard.js';
import CreateCategory from './admin/CreateCategory.jsx';
import CreateProduct from './admin/CreateProduct.js';
import User from './admin/User.jsx';
import Profile from './pages/user/Profile.jsx';
import Orders from './pages/user/Orders.jsx';
import Product from './admin/Product.jsx';
import UpdateProduct from './admin/UpdateProduct.jsx';
import ProductDetails from './pages/productDetails.jsx';
import CartPage from './pages/CartPage.jsx';
import AdminOrders from './admin/adminOrders.jsx';
function App() {
  return (
    <>
      <div className="App">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:slug" element={<ProductDetails />} />
            <Route path="/About" element={<About />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Policy" element={<Policy />} />
            <Route path="/Register" element={<Register />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/forgot-password" element={<Forgotpassword />} />
            <Route path="/Dashboard" element={<Privateroute />} >
              <Route path="user" element={<Dashboard />} />
              <Route path="user/Profile" element={<Profile />} />
              <Route path="user/Orders" element={<Orders />} />

            </Route>
            <Route path="/Dashboard" element={<Adminroute />}>
              <Route path='admin/Create-Product' element={<CreateProduct />} />
              <Route path='admin/Create-Category' element={<CreateCategory />} />
              <Route path='admin/Product' element={<Product />} />
              <Route path='admin/Product/:slug' element={<UpdateProduct />} />
              <Route path='admin/user' element={<User />} />
              <Route path='admin/orders' element={<AdminOrders />} />
              <Route path="admin" element={<AdminDashboard />} />

            </Route>
            <Route path="*" element={<Pagenotfound />} />
          </Routes>
          <Footer />
        </Router>


      </div >
    </>
  );
}

export default App;
