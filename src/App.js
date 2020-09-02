import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './Components/auth/signIn';
import SignUp from './Components/auth/signup';
import ForgotPassword from './Components/auth/ForgotPassword';
import ResetPassword from './Components/auth/ResetPassword';

import NavBar from './Components/layout/Navbar';
import ProductUpload from './Components/Product/ProductUpload';
import './App.scss'
import Footer from './Components/layout/footer';
import Fishery from './Components/Categories/Fishery';
import Poultry from './Components/Categories/Poultry';
import Fruit from './Components/Categories/Fruit';
// import Checkout from './Components/users/Checkout';
import Contact from './Components/users/Contact';
import Product from './Components/Product/Product';
import SideBar from './Components/layout/Sidebar';
// import classNames from "classnames";
import { Container } from "react-bootstrap";
import Loading from './Components/layout/Loading';
import ProductDetails from './Components/Product/ProductDetails';
// import ProductUpdate from './Components/Product/ProductUpdate';
import SentPasswordResetLink from './Components/auth/SentVerificationLink';
import NotFound404 from './Components/Custom/NotFound404';
import LiveStock from './Components/Categories/LiveStock';
import FarmTool from './Components/Categories/FarmTool';
import Cereal from './Components/Categories/Cereal';
import Tubers from './Components/Categories/Tubers';
import Vegetables from './Components/Categories/Vegetables';
import Service from './Components/Categories/Service';
import Others from './Components/Categories/Others';
import ProtectedRoute from './Components/Helpers/ProtectedRoute';
import Cart from './Components/Cart/Cart';
import AdminProtectedRoute from './Components/Helpers/AdminProtectedRoute';
import Checkout from './Components/Checkout/Checkout';
import Order from './Components/Order/Order';
import VerifyCheckOut from './Components/Checkout/VerifyCheckOut';
import Activate from './Components/auth/Activate';
import AdminOrderComp from './Components/Order/AdminOrderComp';
import OrderDetails from './Components/Order/OrderDetails';



class App extends Component {
  constructor(props) {
    super(props);

    // Moblie first
    this.state = {
      isOpen: false,
      isMobile: true
    };

    this.previousWidth = -1;
  }

  updateWidth() {
    const width = window.innerWidth;
    const widthLimit = 988;
    const isMobile = width <= widthLimit;
    const wasMobile = this.previousWidth <= widthLimit;

    if (isMobile !== wasMobile) {
      this.setState({
        isOpen: !isMobile
      });
    }

    this.previousWidth = width;
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateWidth();
    window.addEventListener("resize", this.updateWidth.bind(this));
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWidth.bind(this));
  }

  toggle = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };
  render() {
    return (
      <BrowserRouter>
        <div className="App">

          <SideBar toggle={this.toggle} isOpen={this.state.isOpen} />
          <Container
            fluid
          // className={classNames("content", { "is-open": this.props.isOpen })}
          >
            <NavBar toggle={this.toggle} />

            <Switch>
              {/* <Route exact path="/"> <Homes toggle={this.toggle} isOpen={this.state.isOpen} /> </Route> */}
              {/* <Route path="/categories/animal" component={Animal} /> */}
              <Route path="/categories/cereal" component={Cereal} />
              <Route path="/categories/animal" component={LiveStock} />
              <Route path="/categories/farmtools" component={FarmTool} />
              <Route path="/categories/fishery" component={Fishery} />
              <Route path="/categories/fruit" component={Fruit} />
              <Route path="/categories/poultry" component={Poultry} />
              <Route path="/categories/services" component={Service} />
              <Route path="/categories/tubers" component={Tubers} />
              <Route path="/categories/vegetables" component={Vegetables} />
              <Route path="/categories/others" component={Others} />
              <Route path="/loading" component={Loading} />
              <Route path="/contact" component={Contact} />
              <ProtectedRoute path="/cart" component={Cart} />
              <ProtectedRoute path="/checkout" component={Checkout} />
              <ProtectedRoute path="/orders" component={Order} />
              <ProtectedRoute path="/order/verify" component={VerifyCheckOut} />


              {/* <Route path="/admin" component={Home} /> */}
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
              <Route path="/verify/user/:token" component={Activate} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/reset-password/:token" component={ResetPassword} />
              <Route path="/activate/:token" component={ResetPassword} />
              <ProtectedRoute path="/admin/orders/:orderId" component={OrderDetails} />
              <ProtectedRoute path="/admin/orders" component={AdminOrderComp} />

              <AdminProtectedRoute path="/admin/product-upload" component={ProductUpload} />


              <Route path="/password-recovery-message" component={SentPasswordResetLink} />
              <Route path='/products/:id' component={ProductDetails} />
              {/* <Route path="/admin/product-update/:id" component={ProductUpdate} /> */}
              <Route path="/" exact component={Product} />
              <Route path="*" component={NotFound404} />

            </Switch>
            <Footer />

          </Container>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
