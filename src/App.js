import { Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Pages/Login';
import SharedLayout from './components/SharedLayout';
import SharedDashboardLayout from './components/SharedDashboard';
import Dashboard from './components/Pages/Dashboard';
import Safes from './components/Pages/Safes';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Login />} />
          <Route path="dashboard" element={<SharedDashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="safes" element={<Safes />} />
            {/* <Route path="personal" element={<PersonalIndex />} /> */}
            {/* <Route path="profile" element={<ProfileIndex />} /> */}


          </Route>
        </Route>
      </Routes>
    </>
  );
}
export default App;
