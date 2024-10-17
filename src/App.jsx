import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS
import Welcome from './components/welcome/Welcome';
import Dashboard from './components/dashboard/Dashboard';
import SignUp from './components/useraccess/SignUp';
import SignIn from './components/useraccess/SignIn';
import AboutUs from './components/aboutus/AboutUs';
import ContactUs from './components/contactus/ContactUs';
import GuestLayout from './components/layout/GuestLayout';


function App() {
  return (
    <Router basename="/Group-1-ETS-Final/">
      <Routes>
        {/* Guest routes */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/ContactUs" element={<ContactUs />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/SignIn" element={<SignIn />} />
        </Route>

        {/* User routes */}
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;