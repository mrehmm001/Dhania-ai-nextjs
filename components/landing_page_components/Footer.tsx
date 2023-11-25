// Define the Footer component
const Footer = () => {
  return (
    <footer className="border-t border-gray-600 py-4 absolute bottom-0 left-0 right-0">
      <div className="mx-4">
        <p className="text-gray-600">&copy; {new Date().getFullYear()} @Dhania.ai. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
