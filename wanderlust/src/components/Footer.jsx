import { Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 bg-gray-900 text-gray-300">
      <div className="container-xxl py-10 grid md:grid-cols-4 gap-10">
        <div>
          <div className="text-white font-semibold text-lg mb-3">Wanderlust</div>
          <p className="text-sm leading-6">
            Your trusted companion for unforgettable travel experiences.
          </p>
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Quick Links</div>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>Destinations</li>
            <li>Travel Guides</li>
            <li>Blog</li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Support</div>
          <ul className="space-y-2 text-sm">
            <li>Contact Us</li>
            <li>FAQs</li>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </div>

        <div>
          <div className="text-white font-semibold mb-3">Contact</div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-2"><MapPin size={16}/> 123 Travel Street, City</li>
            <li className="flex items-center gap-2"><Mail size={16}/> info@wanderlust.com</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6">
        <div className="container-xxl flex items-center justify-between">
          <p className="text-xs">© 2024 Wanderlust. All rights reserved.</p>
          <div className="flex gap-4 text-gray-400">
            <span>🌐</span><span>🐦</span><span>📸</span><span>💼</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
