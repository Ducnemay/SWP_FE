import { Navigate, Routes, Route } from "react-router-dom";
import Header from "./page/rolepage/moderatorPage/components/Header";
import { Outlet } from "react-router-dom";
import Body from "./page/rolepage/moderatorPage/components/Body";
import ProductPageDetail from "./page/rolepage/moderatorPage/components/ProductPageDetail";
import Report from "./page/rolepage/moderatorPage/components/Report";
import RequireAuth from "./components/ReqAuth/RequireAuth";
import Layout from "./components/layout/Layout";
import Layoutguest from "./components/layout/Layoutguest";
import HomePage from "./page/HomePage";
import Order from "./page/Order";
import CagePage from "./page/productpage/CagePage";
import FoodPage from "./page/productpage/FoodPage";
import AccessoriesToysPage from "./page/productpage/AccessoriesToysPage";
import BlogPage from "./page/BlogPage";
import BlogContentPage from "./page/BlogContentPage";
import SpeciesPage from "./page/SpeciesPage";
import ItemInformation from "./page/ItemInformationPage";
import AboutPage from "./page/AboutPage";
import CartPage from "./page/CartPage";
import LogInPage from "./page/authenticationpage/LogInPage";
import QuestionPage from "./page/authenticationpage/forgotpasswordpage/QuestionPage";
import ResetPasswordPage from "./page/authenticationpage/forgotpasswordpage/ResetPasswordPage";
import SignUpPage from "./page/authenticationpage/SignUpPage";
import UpdateInformationPage from "./page/authenticationpage/UpdateInformationPage";
import "./App.css";
import UserPage from "./page/UserPage";
import SettingInformationPage from "./page/SettingInformationPage";
import SavePage from "./page/SavePage";

import CreateVoucherPage from "./page/rolepage/managerpage/CreateVoucherPage";
import ShapePage from "./page/custompage/ShapePage";
import SizePage from "./page/custompage/SizePage";
import MaterialPage from "./page/custompage/MaterialPage";
import ColorPage from "./page/custompage/ColorPage";
import TotalPage from "./page/custompage/TotalPage";
import RoleLayout from "./components/layout/RoleLayout";
import StaffPage from "./page/rolepage/staffpage/StaffPage";
import ManagerPage from "./page/rolepage/managerpage/ManagerPage";
import AdminPage from "./page/rolepage/adminpage/AdminPage";
import ViewOrderPage from "./page/rolepage/staffpage/ViewOrderPage";
import AnnounceOrderPage from "./page/rolepage/staffpage/AnnounceOrderPage";
import FeedbackPage from "./page/rolepage/staffpage/FeedbackPage";
import ProductPage from "./page/rolepage/managerpage/ProductPage";
import VoucherPage from "./page/rolepage/managerpage/VoucherPage";
import ManageAccount from "./page/rolepage/adminpage/ManageAccount";
import CreateUser from "./page/rolepage/adminpage/CreateUser";
import AddProductPage from "./page/rolepage/managerpage/AddProductPage";
import BlogForm from "./page/rolepage/staffpage/CreateBlog";
import ConfirmPage from "./page/ConfirmPage";
import WaitingOrderPage from "./page/WaitingOrderPage";
import Page from "./page/Page";
import Premium from "./page/Premium";
import TransactionHistory from "./page/TransactionHistory"
import Napage from "./page/Napage";
import Cpage from "./page/Cpage";
import Editpage from "./page/Editpage";
import PaymentPage from "./page/PaymentPage";
import Detailpage from "./page/Detailpage";
import Paymentblogpage from "./page/Paymentblogpage";
import Insight from "./page/Insight";
import Transfer from "./page/rolepage/moderatorPage/components/Transfer";
import PaymentBank from "./page/PaymentBank";
import Send from "./page/rolepage/moderatorPage/components/Send";
import PaymentPremium from "./page/PaymentPremium";


import React, { useState } from 'react';



const App = () => {
  
  const [savedProducts, setSavedProducts] = useState([
    {
        id: 1,
        name: 'Pintura de aguja',
        author: 'Bélen Rodríguez González',
        price: '€9,300',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.1_eSk3QxQI3d1cTL1PnvjQHaHa&pid=Api&P=0&h=180',
        liked: false,
    },
    {
        id: 2,
        name: 'Ring of Fire No. 2',
        author: 'GC Myers',
        price: 'US$650',
        imageUrl: 'https://a.1stdibscdn.com/hunt-slonem-paintings-matt-for-sale/a_13872/1604085634504/CSR0958_master.jpg',
        liked: false,
    },
    // Add more products as needed
    {
        id: 3,
        name: 'Couleurs Nocturnes',
        author: 'Cathy Tabbakh',
        price: 'US$2,450',
        imageUrl: 'http://www.lucaseilers.com/wp-content/uploads/2014/11/yellow-bunny-612x729.jpg',
        liked: false,
    },
    {
        id: 4,
        name: 'Budapest Pastry XIX',
        author: 'George Bartko',
        price: 'US$1,200',
        imageUrl: 'https://tse3.mm.bing.net/th?id=OIP.NVq_UpwcTtN9BAnbVtSStwHaGD&pid=Api&P=0&h=180',
        liked: false,
    },
   
  ]);
  return (
    
    // <div className="container">
    //   <Header />
    //   {/* <ProductPage/> */}
    //   <Outlet/>
    // </div>
    

    <Routes>
      {/* public routes */}
     
     <Route element={<Layoutguest />}> 
        <Route path="/" element={<Navigate to="/home" />} />
        {/* <Route path="/order" element={<Order />} /> */}
        <Route path="/home" element={<HomePage />} />
        <Route path="/products/cages" element={<CagePage />} />
        <Route path="/products/food" element={<FoodPage />} />
	<Route path="/insight" element={<Insight />} />
       
        
        
        
        <Route
          path="/products/accessories-toys"
          element={<AccessoriesToysPage />}
        />
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blog-content/:blogId" element={<BlogContentPage />} />
        <Route path="/parrot" element={<SpeciesPage />} />
        <Route path="/item-info/:productId" element={<ItemInformation />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/custom-products-shape" element={<ShapePage />} />
        <Route path="/custom-products-size" element={<SizePage />} />
        <Route path="/custom-products-material" element={<MaterialPage />} />
        <Route path="/custom-products-color" element={<ColorPage />} />
        <Route path="/custom-products-end" element={<TotalPage />} />
        <Route path="/order-confirm" element={<ConfirmPage />} />
        <Route path="/order-waiting" element={<WaitingOrderPage />} />
        {/* <Route path="/order-info" element={<Paymentblogpage />} /> */}
        <Route path="/order/:orderId" element={<Order />} />
        <Route path="/order-info/:orderId" element={<Paymentblogpage />} />
        <Route path="/orderprumium-info/:orderPremiumId" element={<PaymentPremium />} />
        <Route path="/paymentbank/:userId/:artworkUserId/:orderId" element={<PaymentBank />} />
        
        
       
      
        
        
      </Route>

      <Route element={<RoleLayout />}>
        <Route path="/voucher" element={<VoucherPage />} />
      </Route>

      {/* user routes */}
      <Route element={<RequireAuth allowedRoles={["1"]} />}>
        <Route element={<Layout />}>
        <Route path="/home" element={<HomePage />} />
          <Route path="/products/cages" element={<CagePage />} />
          <Route path="/products/food" element={<FoodPage />} />
          <Route path="/pre" element={<Premium />} />
          <Route
            path="/products/accessories-toys"
            element={<AccessoriesToysPage />}
          />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/parrot" element={<SpeciesPage />} />
          <Route path="/item-info/:productId" element={<ItemInformation />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/save" element={<SavePage savedProducts={savedProducts} />} />
          <Route path="/transHis" element={<TransactionHistory/>} />
          <Route path="/page-m" element={<Cpage />} />
          <Route path="/na" element={<Napage />} />
          {/* <Route path="/content" element={<Body />}/>
        
        <Route path="/report" element={<Report />}/>
        <Route path="/productPageDetail/:productId" element={<ProductPageDetail />} /> */}

        </Route>
      </Route>

      <Route path="/log-in" element={<LogInPage />} />
      <Route path="/question" element={<QuestionPage />} />
      <Route path="/reset-pass" element={<ResetPasswordPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/update-info" element={<UpdateInformationPage />} />
      <Route path="/page-c" element={<Page />} />
      
      <Route path="/edit" element={<Editpage />} />
      <Route path="/pay" element={<PaymentPage />} />
      <Route path="/detail/:artworkId" element={<Detailpage />} />
      

      
      

      {/* admin routes */}
      <Route element={<RequireAuth allowedRoles={["2"]} />}>
        <Route path="/admin-page" element={<AdminPage />} />
        <Route element={<RoleLayout />}>
          <Route path="/manage-account" element={<ManageAccount />} />
          <Route path="/info-setting" element={<SettingInformationPage />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Route>
      </Route>

      {/* manager routes */}
      {/* <Route element={<RequireAuth allowedRoles={["4"]} />}>
        <Route path="/manager-page" element={<ManagerPage />} />
        <Route element={<RoleLayout />}>
          <Route
            path="/create-voucer/:action"
            element={<CreateVoucherPage />}
          />
          <Route path="/add-product/:action" element={<AddProductPage />} />
          <Route path="/product/:action" element={<ProductPage />} />
          <Route path="/voucher/:action" element={<VoucherPage />} />
        </Route>
      </Route> */}

      {/* staff routes */}
      <Route element={<RequireAuth allowedRoles={["3"]} />}>
        <Route path="/staff-page" element={<StaffPage />} />
        <Route element={<RoleLayout />}>
          <Route path="/create-blog" element={<BlogForm />} />
          <Route path="/manage-blogs/:action" element={<BlogPage />} />
          <Route path="/blog-content/:blogId" element={<BlogContentPage />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/order" element={<ViewOrderPage />} />
          <Route path="/announce-order" element={<AnnounceOrderPage />} />
        </Route>
      </Route>
      {/* moderator routes */}
      <Route element={<RequireAuth allowedRoles={["4"]} />}>
        {/* <Route path="/manager-page" element={<ManagerPage />} /> */}
      <Route path="/content" element={<Body />}/>
      {/* <Route element={<RoleLayout />}>   */}
        <Route path="/report" element={<Report />}/>
        <Route path="/productPageDetail/:productId" element={<ProductPageDetail />} />
        <Route path="/transfer" element={<Transfer />}/>
        <Route path="/send" element={<Send />}/>
        

        </Route>
        {/* </Route> */}
      

      <Route element={<Layoutguest />}> </Route>
      <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
    </Routes>
    
  );
};

export default App;