import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Enquirys from "./pages/Enquirys";
import BlogList from "./pages/BlogList";
import AddBlog from "./pages/AddBlog";
import AddBlogcty from "./pages/AddBlogcty";
import AddBrand from "./pages/AddBrand";
import AddColor from "./pages/AddColor";
import AddProductcty from "./pages/AddProductcty";
import AddProduct from "./pages/AddProduct";
import Customers from "./pages/Customers";
import ProductsList from "./pages/ProductsList";
import BrandList from "./pages/BrandList";
import Catagorylist from "./pages/Categorylist";
import Blogcatlist from "./pages/Blogcatlist";
import ColorList from "./pages/ColorList";
import Orders from "./pages/Orders";
import AddCoupon from "./pages/AddCoupon";
import CouponList from "./pages/CouponList";
import ViewEnquiry from "./pages/ViewEnquiry";
import ViewOrder from "./pages/ViewOrder";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/admin">
          <Route element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="enquiries" element={<Enquirys />} />
            <Route path="enquiries/:id" element={<ViewEnquiry />} />
            <Route path="blog-list" element={<BlogList />} />
            <Route path="blog" element={<AddBlog />} />
            <Route path="blog/:id" element={<AddBlog />} />
            <Route path="blog-category" element={<AddBlogcty />} />
            <Route path="blog-category/:id" element={<AddBlogcty />} />
            <Route path="brand" element={<AddBrand />} />
            <Route path="brand/:id" element={<AddBrand />} />
            <Route path="color" element={<AddColor />} />
            <Route path="color/:id" element={<AddColor />} />
            <Route path="category" element={<AddProductcty />} />
            <Route path="category/:id" element={<AddProductcty />} />
            <Route path="product" element={<AddProduct />} />
            <Route path="customers" element={<Customers />} />
            <Route path="list-product" element={<ProductsList />} />
            <Route path="list-brand" element={<BrandList />} />
            <Route path="list-category" element={<Catagorylist />} />
            <Route path="blog-category-list" element={<Blogcatlist />} />
            <Route path="list-color" element={<ColorList />} />
            <Route path="orders" element={<Orders />} />
            <Route path="orders/:id" element={<ViewOrder />} />
            <Route path="coupon" element={<AddCoupon />} />
            <Route path="coupon/:id" element={<AddCoupon />} />
            <Route path="coupon-list" element={<CouponList />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
