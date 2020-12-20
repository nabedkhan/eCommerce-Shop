import './App.css';
import './bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './components/HomeScreen';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Login from './components/Login';
import Register from './components/Register';
import PrivateRoute from './components/PrivateRoute';
import Shipping from './components/Shipping';
import Order from './components/Order';
import OrderSuccess from './components/OrderSuccess';
import MyOrders from './components/MyOrders';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/products/:productId" component={ProductDetails} />
          <Route path="/cart/:id?" component={Cart} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />

          <PrivateRoute path="/shipping" children={<Shipping />} />
          <PrivateRoute path="/order" children={<Order />} />
          <PrivateRoute path="/orderSuccess" children={<OrderSuccess />} />
          <PrivateRoute path="/myOrders" children={<MyOrders />} />

          <Route path="*">
            <h1>Not Found</h1>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
