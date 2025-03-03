import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Hospitals from './pages/Hospitals';
import Hospital from './pages/Hospital';
import CreateHospital from './pages/CreateHospital';
import EditHospital from './pages/EditHospital';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import AllHospitals from './pages/AllHospitals';

function App() {
  return (
    <AuthProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/hospitals/:city" element={<Hospitals />} />
          <Route path="/hospital/:id" element={<Hospital />} />
          <Route path="/create" element={<CreateHospital />} />
          <Route path="/edit/:id" element={<EditHospital />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/hospitals" element={<AllHospitals />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;