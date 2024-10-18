import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Welcome from './components/welcome/Welcome';
import SignUp from './components/useraccess/SignUp';
import SignIn from './components/useraccess/SignIn';
import AboutUs from './components/aboutus/AboutUs';
import ContactUs from './components/contactus/ContactUs';
import GuestLayout from './components/layout/GuestLayout';
import UserLayout from './components/layout/UserLayout';
import Dashboard from './components/dashboard/Dashboard';
import Expense from './components/dashboard/expensesmenu/Expense';
import ManageExpense from './components/dashboard/expensesmenu/ManageExpense';
import Lending from './components/dashboard/lendingmenu/Lending';
import ManageLending from './components/dashboard/lendingmenu/ManageLending';
import Report from './components/dashboard/reportmenu/Report';
import Setting from './components/dashboard/settingmenu/Setting';

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

        {/* User routes with fixed layout (LeftNav + Header) */}
        <Route element={<UserLayout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/expensesmenu/Expense" element={<Expense />} />
          <Route path="/expensesmenu/ManageExpense" element={<ManageExpense />} />
          <Route path="/lendingmenu/Lending" element={<Lending />} />
          <Route path="/lendingmenu/ManageLending" element={<ManageLending />} />
          <Route path="/reportmenu/Report" element={<Report />} />
          <Route path="/settingmenu/Setting" element={<Setting />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
