import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer"; // Import the Footer component
import PrivateRoute from "./components/PrivateRoute";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import "./global.css";
import MyEvents from "./pages/MyEvents";
import Country from "./pages/Country";
import Favourites from "./pages/Favourites";

export default function App() {
  return (
    <BrowserRouter>
      {/* Header */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/events" element={<Events />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/country" element={<Country />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      {/* Footer */}
      <Footer />
    </BrowserRouter>
  );
}
