import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  createRoutesFromElements,
  Route,
  ScrollRestoration,
  Navigate,
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
import OneCartFullLife from "./pages/campaigns/OneCartFullLife";
import SmartestCartChallenge from "./pages/campaigns/SmartestCartChallenge";
import TrackOrder from "./pages/TrackOrder";
import EmailSignupPopup from "./components/EmailSignupPopup";
import WelcomeStripPopup from "./components/WelcomeStripPopup";
import ChallengePeekPopup from "./components/ChallengePeekPopup";
import ExitIntentPopup from "./components/ExitIntentPopup";
import WhatsAppFloat from "./components/WhatsAppFloat";
import RouteAnalytics from "./components/RouteAnalytics";

const Layout = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <RouteAnalytics />
      <Navbar />
      <ScrollRestoration />
      <main className="flex-1 pb-28 md:pb-24">
        <Outlet />
      </main>
      <Footer />
      <WelcomeStripPopup />
      <ChallengePeekPopup />
      <ExitIntentPopup />
      <EmailSignupPopup />
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
        <Route path="/campaigns/one-cart-full-life" element={<OneCartFullLife />} />
        <Route path="/campaigns/smartest-cart-challenge" element={<SmartestCartChallenge />} />
        <Route path="/campaigns/found-it-week" element={<Navigate to="/campaigns/one-cart-full-life" replace />} />
        <Route path="/campaigns/campus-cart-challenge" element={<Navigate to="/campaigns/smartest-cart-challenge" replace />} />
        <Route path="/track-order" element={<TrackOrder />} />
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
