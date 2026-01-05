import laga from "../assets/laga.png";

function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 py-4">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-6">
        
        
        <div>
          <div className="flex items-center space-x-2">
            <img src={laga} alt="" className="h-10 w-10" />
            <span className="font-semibold text-gray-800">Engineering Blog</span>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            © 2025 Engineering Blog. All rights reserved.
          </p>
        </div>

        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Links</h4>
          <ul className="space-y-1 text-sm text-gray-600">
            <li><a href="#" className="hover:text-gray-900">Home</a></li>
            <li><a href="#" className="hover:text-gray-900">About</a></li>
            <li><a href="#" className="hover:text-gray-900">Blog</a></li>
          </ul>
        </div>

        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Contact</h4>
          <p className="text-sm text-gray-600 leading-5">
            Engineering Blog HQ<br />
            123 Innovation Street,<br />
            Pune, Maharashtra 411001, India
          </p>
          <p className="mt-1 text-sm text-gray-600 leading-5">
            Email: contact@engineeringblog.com<br />
            Phone: +91 46464666
          </p>
        </div>

        
        <div>
          <h4 className="font-semibold text-gray-800 mb-2">Follow Us</h4>
          <div className="flex space-x-3">
            <h1>facebook</h1>
            <h1>linkdein</h1>
            
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
