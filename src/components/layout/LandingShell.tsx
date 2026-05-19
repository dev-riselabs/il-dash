import { FaFacebookSquare } from "react-icons/fa"
import { FaXTwitter, FaYoutube } from "react-icons/fa6"
import { AiFillInstagram } from "react-icons/ai";
import { Link } from "react-router-dom"
import type { ReactNode } from "react";


interface Props {
  children: ReactNode;
}

function LandingShell({ children }: Props) {
  return (
    <div>
        <header className="flex justify-between gap-30 items-center py-4 px-20 bg-[linear-gradient(90deg,#082250_0%,#0B2760_15%,#001C4A_45%,#052044_65%,#234F72_100%)]">
            <img src="/events-intel.png" alt="" />
            <div className="flex items-center justify-between gap-5 flex-1">
                <ul className="flex items-center gap-8">
                    <Link to='/' className="font-inter text-sm text-white">Welcome</Link>
                    <Link to='/about' className="font-inter text-sm text-white">About us</Link>
                </ul>
                <div className="flex items-center gap-4">
                    <FaFacebookSquare className="text-white w-6 h-6"/>
                    <FaXTwitter className="text-white w-6 h-6"/>
                    <AiFillInstagram className="text-white w-6 h-6"/>
                    <FaYoutube className="text-white w-6 h-6"/>
                </div>
                <div className="flex items-center gap-3.5">
                    <button className="text-sm px-8.5 py-3.5 rounded-md bg-white text-blue600">Deploy EventsIntel for Your Event</button>
                    <button className="text-sm px-8.5 py-3.5 rounded-md bg-pink text-white">Request a Demo</button>
                </div>
            </div>
        </header>
        <main>{children}</main>
        <footer className="bg-oval px-20 pt-20 bg-white flex flex-col gap-12">
            <div className="bg-white rounded-xl flex items-center justify-between gap-10 px-20 py-10 shadow" >
                <h5 className="text-3xl text-pink font-inter max-w-[20ch] leading-12">Become an Insider. Join our Newsletter.</h5>
                <form action="" className="border-2 rounded-md flex gap-5 flex-1 py-1 px-4 border-slate300 ">
                    <input type="email" name="" id="" className="outline-none flex-1" placeholder="Enter your email"/>
                    <button className="px-10 rounded-md bg-pink text-white font-inter py-3">Subscribe Now</button>
                </form>
            </div>
            <div className="flex flex-col md:flex-row md:justify-between border-b border-b-slate300 pb-8">
                <ul className="flex items-center gap-8">
                    <Link to='/' className="text-blue600 text-sm font-inter">Welcome</Link>
                    <Link to='/about' className="text-blue600 text-sm font-inter">About us</Link>
                    <Link to='' className="text-blue600 text-sm font-inter">Contact</Link>
                </ul>
                <div className="flex items-center gap-8">
                    <FaFacebookSquare className="text-blue600 w-6 h-6"/>
                    <FaXTwitter className="text-blue600 w-6 h-6"/>
                    <AiFillInstagram className="text-blue600 w-6 h-6"/>
                    <FaYoutube className="text-blue600 w-6 h-6"/>
                </div>
            </div>
            <div className="flex flex-col gap-4 items-center md:items-center md:flex-row md:justify-between">
                <span className="text-xs font-inter text-slate400">© 2026 Events Intel. All rights reserved.</span>
                <img src="/events-intel.png" alt="" />
                <ul className="flex items-center gap-6">
                    <li className="text-xs font-inter text-slate400">Terms of Service</li>
                    <li className="text-xs font-inter text-slate400">Privacy Policy</li>
                </ul>
            </div>
        </footer>

        

    </div>
  )
}

export default LandingShell