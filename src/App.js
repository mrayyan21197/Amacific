import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Gadgets from "./pages/Gadgets";
import Clothing from "./pages/Clothing";
import Toys from "./pages/Toys";
import Beauty from "./pages/Beauty";
import Stationery from "./pages/Stationery";
import HomeLiving from "./pages/HomeLiving";
import Essentials from "./pages/Essentials";
import Blogs from "./pages/Blogs";
import BlogDetails from "./pages/BlogDetails";
import Shop from "./pages/Shop/Shop";
import ProductDetails from "./pages/ProductDetails/ProductDetails";
import Cart from "./pages/Cart/Cart";
import SignIn from "./pages/Account/SignIn";
import SignUp from "./pages/Account/SignUp";
import About from "./pages/About/About";
import FAQTrust from "./pages/FAQTrust";
import ContactSupport from "./pages/ContactSupport";
import Checkout from "./pages/Checkout";
import Deals from "./pages/Deals";
import StudentEssentials from "./pages/StudentEssentials";
import FoundItWeek from "./pages/campaigns/FoundItWeek";
import CampusCartChallenge from "./pages/campaigns/CampusCartChallenge";
import EmailSignupPopup from "./components/EmailSignupPopup";
import ExitIntentPopup from "./components/ExitIntentPopup";
import WhatsAppFloat from "./components/WhatsAppFloat";
import RouteAnalytics from "./components/RouteAnalytics";

const Layout = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <RouteAnalytics />
      <Navbar />
      <ScrollRestoration />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {/* Welcome / FOUND200 email capture ~4.5s after load (session dismiss via EmailSignupPopup) */}
      <EmailSignupPopup />
      {/* Desktop-ish exit-intent (pointer leaves top of viewport); uses sessionStorage */}
      <ExitIntentPopup />
      <WhatsAppFloat />
    </div>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/gadgets" element={<Gadgets />} />
        <Route path="/clothing" element={<Clothing />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/stationery" element={<Stationery />} />
        <Route path="/home-living" element={<HomeLiving />} />
        <Route path="/essentials" element={<Essentials />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/student-essentials" element={<StudentEssentials />} />
        <Route path="/campaigns/found-it-week" element={<FoundItWeek />} />
        <Route path="/campaigns/campus-cart-challenge" element={<CampusCartChallenge />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogDetails />} />
        <Route path="/product/:_id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQTrust />} />
        <Route path="/contact" element={<ContactSupport />} />
      </Route>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/signin" element={<SignIn />} />
    </Route>
  )
);

function App() {
  return (
    <div className="font-bodyFont text-primeColor antialiased">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
