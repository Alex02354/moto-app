import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./pages/Profile";
import Header from "./components/Header";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import Section from "./pages/Section";
import EventDetail from "./pages/EventDetail";
import "./global.css";
import MyEvents from "./pages/MyEvents";
import Wishlist from "./pages/Wishlist";
import Places from "./pages/Places";
import Routes2 from "./pages/Routes2";
import Camps from "./pages/Camps";
import Natural from "./pages/Natural";
import Built from "./pages/Built";
import Views from "./pages/Views";
import Caravan from "./pages/Caravan";
import Offroad from "./pages/Offroad";
import Naturale from "./pages/Naturale";
import Created from "./pages/Created";
import Itinerary from "./pages/Itinerary";
import CookieBanner from "./components/CookieBanner"; // Import CookieBanner
import PrivacyPolicy from "./pages/PrivacyPolicy";

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        {/* Specific section and subsection routes */}
        <Route
          path="/events/camp/natural"
          element={<Naturale section="camp" subsection="natural" />}
        />
        <Route
          path="/events/camp/created"
          element={<Created section="camp" subsection="created" />}
        />
        <Route
          path="/events/route/offroad"
          element={<Offroad section="route" subsection="offroad" />}
        />
        <Route
          path="/events/route/caravan"
          element={<Caravan section="route" subsection="caravan_car" />}
        />
        <Route
          path="/events/places/nature"
          element={<Natural section="places" subsection="nature" />}
        />
        <Route
          path="/events/places/built"
          element={<Built section="places" subsection="built" />}
        />
        <Route
          path="/events/places/views"
          element={<Views section="places" subsection="views" />}
        />
        <Route
          path="/events/route"
          element={
            <Routes2 section="route" subsection={["offroad", "caravan_car"]} />
          }
        />
        <Route
          path="/events/places"
          element={
            <Places
              section="places"
              subsection={["built", "nature", "views", "nature"]}
            />
          }
        />
        <Route
          path="/events/camp"
          element={<Camps section="camp" subsection={["natural", "created"]} />}
        />
        <Route
          path="/events/itinerary"
          element={<Itinerary section="itinerary" subsection="" />}
        />
        <Route
          path="/events/section"
          element={
            <Section section={["itinerary", "places", "route", "camp"]} />
          }
        />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
      <CookieBanner /> {/* Add CookieBanner here */}
      <Footer />
    </BrowserRouter>
  );
}
