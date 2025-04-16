
import { Link } from "react-router-dom";
import { BookOpen, Github, Mail, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-quiz-gradient flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <span className="text-xl font-bold text-quiz-dark">QuizQuest</span>
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              Test your knowledge and compete with others in various quiz categories.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="https://twitter.com" className="text-gray-500 hover:text-quiz-primary">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="https://github.com" className="text-gray-500 hover:text-quiz-primary">
                <Github className="w-5 h-5" />
              </a>
              <a href="mailto:info@quizquest.com" className="text-gray-500 hover:text-quiz-primary">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Categories</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/quizzes" className="text-gray-600 hover:text-quiz-primary">
                  Science & Technology
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-gray-600 hover:text-quiz-primary">
                  History
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-gray-600 hover:text-quiz-primary">
                  Movies & TV
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-gray-600 hover:text-quiz-primary">
                  Geography
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-gray-600 hover:text-quiz-primary">
                  Music
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Account</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-quiz-primary">
                  Profile
                </Link>
              </li>
              <li>
                <Link to="/quizzes" className="text-gray-600 hover:text-quiz-primary">
                  My Quizzes
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-quiz-primary">
                  Settings
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-600 hover:text-quiz-primary">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-quiz-primary">
                  Register
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-span-1">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Resources</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-quiz-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-quiz-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-quiz-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-quiz-primary">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-600 hover:text-quiz-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} QuizQuest. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/" className="text-sm text-gray-500 hover:text-quiz-primary">
              Privacy Policy
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-quiz-primary">
              Terms of Service
            </Link>
            <Link to="/" className="text-sm text-gray-500 hover:text-quiz-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
