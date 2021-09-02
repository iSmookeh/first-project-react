import { Button, Carousel } from "antd";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "core/components/private-route/private-route.component";
import WithoutAccessRoute from "core/components/without-access-route/without-access-route.component";

import SignIn from "modules/auth/pages/sign-in/sign-in.component";
import SignUp from "modules/auth/pages/sign-up/sign-up.component";
import Products from "modules/products/pages/products/products.component";
import Users from "modules/users/pages/users/users.component";
import Categories from "modules/categories/pages/categories/categories.component";
import Home from "modules/home/pages/home/home.component";

function App() {
  return (
    <div className="App">
      <Switch>
        <WithoutAccessRoute path="/" component={SignIn} exact />
        <WithoutAccessRoute path="/sign-in" component={SignIn} exact />
        <WithoutAccessRoute path="/sign-up" component={SignUp} exact />
        <PrivateRoute path="/products" component={Products} />
        <PrivateRoute path="/users" component={Users} />
        <PrivateRoute path="/categories" component={Categories} />
        <PrivateRoute path="/home" component={Home} />
      </Switch>
    </div>
  );
}

export default App;
