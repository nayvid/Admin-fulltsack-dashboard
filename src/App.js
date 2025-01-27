import { useEffect } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  useLocation
} from 'react-router-dom';
import Home from "./scenes/home/Home";
import ItemDetails from './scenes/itemDetails/itemDetails'
import Confirmation from './scenes/checkout/Confirmation';
import Checkout from './scenes/checkout/Checkout';
import CartMenu from "./scenes/global/CartMenu";
import Navbar from "./scenes/global/Navbar";
import Footer from './scenes/global/Footer';
import SignUpForm from './components/SignUpForm'; 
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/routes/ProtectedRoute';

const ScrollToTop = () => {
  const {pathname} = useLocation();

  useEffect(() => {
    window.scrollTo(0,0);

  },{pathname})

  return null;
}

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Navbar />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='item/:itemId' element={<ItemDetails />}/>
          <Route path="checkout" element={
              <ProtectedRoute> 
                <Checkout />
              </ProtectedRoute>
            } 
            />
          <Route path='checkout/success' element={<Confirmation />} />
          <Route path="signup" element={<SignUpForm />} />
          <Route path="/login" element={<LoginForm />} />
        </Routes>
        <CartMenu />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
