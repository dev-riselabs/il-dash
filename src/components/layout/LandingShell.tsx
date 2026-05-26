import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter, FaYoutube } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";

interface Props {
  children: ReactNode;
}

function LandingShell({ children }: Props) {
  const [showMenu, setShowMenu] = useState(false);

  function toggleShowMenu() {
    setShowMenu((prev) => !prev);
  }
  return (
    <div onClick={()=> setShowMenu(false)}>
      <header className="flex justify-between gap-30 items-center py-4 px-4 md:px-10 lg:px-20 bg-[linear-gradient(90deg,#082250_0%,#0B2760_15%,#001C4A_45%,#052044_65%,#234F72_100%)]">
        <Link to="/">
          <img src="/events-intel.png" alt="" className="w-20" />
        </Link>
        <button onClick={toggleShowMenu} className="cursor-pointer lg:hidden">
          <Menu className="text-white w-7 h-7" />
        </button>
        <div className="lg:flex items-center justify-between gap-5 flex-1 hidden">
          <ul className="flex items-center gap-8">
            <Link to="/" className="font-inter text-sm text-white">
              Welcome
            </Link>
            <Link to="/about" className="font-inter text-sm text-white">
              About us
            </Link>
          </ul>
          <div className="flex items-center gap-4">
            <FaFacebookSquare className="text-white w-6 h-6" />
            <FaXTwitter className="text-white w-6 h-6" />
            <AiFillInstagram className="text-white w-6 h-6" />
            <FaYoutube className="text-white w-6 h-6" />
          </div>
          <div className="flex items-center gap-3.5">
            <Link
              to="/investlagos"
              className="text-sm px-8.5 py-3.5 rounded-md bg-white text-blue600 hover:bg-white/95 hover:font-medium transition-all"
            >
              Deploy EventsIntel for Your Event
            </Link>
            <Link
              to="/demo-form"
              className="text-sm px-8.5 py-3.5 rounded-md bg-pink text-white hover:bg-pink/90 transition-all"
            >
              Request a Demo
            </Link>
          </div>
        </div>

        <div onClick={(e)=> e.stopPropagation()}
          className={`flex flex-col px-6 gap-16 w-3/4 z-10 bg-black/50 backdrop-blur-sm lg:hidden py-16  ${
            showMenu ? "fixed top-0 h-screen right-0" : "hidden"
          }`}
        >
          <button
            onClick={toggleShowMenu}
            className="absolute top-3 right-4 cursor-pointer"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <ul className="flex flex-col gap-8">
            <Link to="/" className="font-inter text-sm text-white">
              Welcome
            </Link>
            <Link to="/about" className="font-inter text-sm text-white">
              About us
            </Link>
          </ul>
          <div className="flex items-center gap-4">
            <FaFacebookSquare className="text-white w-6 h-6" />
            <FaXTwitter className="text-white w-6 h-6" />
            <AiFillInstagram className="text-white w-6 h-6" />
            <FaYoutube className="text-white w-6 h-6" />
          </div>
          <div className="flex flex-col gap-5">
            <button className="text-sm px-5.5 py-3.5 rounded-md bg-white text-blue600 text-center">
              Deploy EventsIntel for Your Event
            </button>
            <Link
              to="/demo-form"
              className="text-sm px-8.5 py-3.5 rounded-md bg-pink text-white text-center"
            >
              Request a Demo
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="bg-oval px-4 md:px-10 lg:px-20 pt-20 bg-white flex flex-col gap-12 pb-7">
        <div className="bg-white rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-5 md:gap-10 px-5 lg:px-10 py-5 md:py-10 shadow">
          <h5 className="text-xl md:text-3xl text-pink font-inter font-semibold md:max-w-[20ch] lg:max-w-full leading-8 md:leading-12 flex-1">
            Become an Insider. Join our Newsletter.
          </h5>
          <form
            action=""
            className="border-2 rounded-md flex gap-2 md:gap-5 flex-1 py-1 px-1 lg:px-4 border-slate300"
          >
            <input
              type="email"
              name=""
              id=""
              className="outline-none w-full"
              placeholder="Enter your email"
            />
            <button className="px-1 font-medium md:px-2 lg:px-7 rounded-md bg-pink text-xs sm:text-[10px] lg:text-base text-white font-inter py-2 md:py-3 cursor-pointer shrink-0">
              Subscribe <span className="hidden md:inline">Now</span>
            </button>
          </form>
        </div>
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between border-b border-b-slate300 pb-8">
          <ul className="flex items-center gap-8">
            <Link to="/" className="text-blue600 text-sm font-inter">
              Welcome
            </Link>
            <Link to="/about" className="text-blue600 text-sm font-inter">
              About us
            </Link>
            {/* <Link to='' className="text-blue600 text-sm font-inter">Contact</Link> */}
          </ul>
          <div className="flex items-center gap-8">
            <FaFacebookSquare className="text-blue600 w-6 h-6" />
            <FaXTwitter className="text-blue600 w-6 h-6" />
            <AiFillInstagram className="text-blue600 w-6 h-6" />
            <FaYoutube className="text-blue600 w-6 h-6" />
          </div>
        </div>
        <div className="flex flex-col gap-4 items-center md:items-center md:flex-row md:justify-between">
          <span className="text-xs font-inter text-slate400">
            © 2026 Events Intel. All rights reserved.
          </span>
          <Link to="/">
            <img src="/events-intel.png" alt="" />
          </Link>
          <ul className="flex items-center gap-6">
            <li className="text-xs font-inter text-slate400">
              Terms of Service
            </li>
            <li className="text-xs font-inter text-slate400">Privacy Policy</li>
          </ul>
        </div>
      </footer>
    </div>
  );
}

export default LandingShell;
