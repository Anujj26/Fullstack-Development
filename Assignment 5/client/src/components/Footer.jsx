import { Plane } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Plane className="h-6 w-6 text-blue-500" />
              <span className="font-bold text-xl text-white">AstraVoyage</span>
            </div>
            <p className="text-sm">Your trusted partner for memorable and seamless travel experiences around the world.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/" className="hover:text-blue-400">Home</a></li>
              <li><a href="/packages" className="hover:text-blue-400">Packages</a></li>
              <li><a href="/login" className="hover:text-blue-400">Login</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Destinations</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/packages" className="hover:text-blue-400">Goa</a></li>
              <li><a href="/packages" className="hover:text-blue-400">Kashmir</a></li>
              <li><a href="/packages" className="hover:text-blue-400">Kerala</a></li>
              <li><a href="/packages" className="hover:text-blue-400">Udaipur</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@astravoyage.com</li>
              <li>Phone: +91 98765 43210</li>
              <li>Address: 123 MG Road, Bangalore, India</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center text-slate-400">
          &copy; {new Date().getFullYear()} AstraVoyage Tours & Travels. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
