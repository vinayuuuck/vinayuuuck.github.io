import React from "react";

const Footer: React.FC = () => {
  return (
    <div className="mt-auto">
      <footer className="absolute bottom-0 w-full bg-inherit py-6">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <p>
              &copy; {new Date().getFullYear()} Vinayak Singh Bhadoriya. All
              rights reserved.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://github.com/vinayuuuck"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                GitHub
              </a>
              <a
                href="https://linkedin.com/in/vinayaksbhadoriya"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300"
              >
                LinkedIn
              </a>
              <a
                href="mailto:vinayaksbhadoriya@gmail.com"
                className="hover:text-gray-300"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
