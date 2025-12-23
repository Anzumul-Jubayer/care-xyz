import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
export default function Footer() {
  return (
    <footer className="bg-neutral text-neutral-content mt-16">
      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-2xl font-bold text-primary">Care.IO</h2>
          <p className="mt-3 text-sm">
            Trusted baby sitting and elderly care service platform.
          </p>
        </div>

        
        <div>
          <h3 className="footer-title">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a className="link link-hover">Home</a>
            </li>
            <li>
              <a className="link link-hover">Services</a>
            </li>
            <li>
              <a className="link link-hover">My Bookings</a>
            </li>
            <li>
              <a className="link link-hover">Login</a>
            </li>
          </ul>
        </div>

        
        <div>
          <h3 className="footer-title">Contact</h3>

          <p className="text-sm flex items-center gap-2">
            <FaMapMarkerAlt className="text-primary" />
            Bangladesh
          </p>

          <p className="text-sm flex items-center gap-2">
            <FaEnvelope className="text-primary" />
            support@care.io
          </p>

          <p className="text-sm flex items-center gap-2">
            <FaPhoneAlt className="text-primary" />
            +880 1234 567890
          </p>
        </div>
      </div>

      
      <div className="border-t border-neutral-content/20 py-4 text-center text-sm">
        © {new Date().getFullYear()} Care.IO. All rights reserved.
      </div>
    </footer>
  );
}
