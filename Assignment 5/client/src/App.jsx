import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LoginSignup from './pages/LoginSignup';
import Packages from './pages/Packages';
import PackageDetails from './pages/PackageDetails';
import BookingForm from './pages/BookingForm';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/packages/:id" element={<PackageDetails />} />
            <Route path="/book/:id" element={<BookingForm />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
