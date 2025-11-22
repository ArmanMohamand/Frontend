import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      id="footer"
      className="footer bg-[#323232] text-[#d9d9d9] px-6 md:px-[8vw] py-10 mt-24 flex flex-col items-center gap-10"
    >
      <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-10 md:gap-20">
        <div className="Ft-left flex flex-col gap-5">
          <h1 className="text-[#bfb5b3e9] text-4xl md:text-5xl font-semibold">
            FitZilla
          </h1>
          <p className="text-sm leading-relaxed">
            Fresh flavors crafted daily with care and passion. Serving wholesome
            meals that delight your taste buds, bringing comfort, joy, and
            satisfaction to every plate. Order now and enjoy food made with
            love, delivered fast
          </p>

          <div className="social_icon flex gap-4">
            <a
              href="https://www.instagram.com/__armankhan_786/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7a8ed0]"
            >
              <FaInstagram className="text-2xl" />
            </a>
            <a
              href="https://www.linkedin.com/in/arman-mohamand-15003828b"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7a8ed0]"
            >
              <FaLinkedin className="text-2xl" />
            </a>

            <a
              href="https://github.com/ArmanMohamand"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7a8ed0]"
            >
              <FaGithub className="text-2xl" />
            </a>
          </div>
        </div>

        <div className="Ft-center flex flex-col gap-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#7a8ed0]">
            COMPANY
          </h2>
          <ul className="text-sm space-y-2.5">
            <li className="cursor-pointer hover:text-white">Home</li>
            <li className="cursor-pointer hover:text-white">About us</li>
            <li className="cursor-pointer hover:text-white">Delivery</li>
            <li className="cursor-pointer hover:text-white">Privacy policy</li>
          </ul>
        </div>

        <div className="Ft-right flex flex-col gap-5">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#7a8ed0]">
            Get In Touch
          </h2>
          <ul className="text-sm space-y-2.5">
            <a
              href="tel:+6376999821"
              className="cursor-pointer hover:text-white"
            >
              +91-6376999821
            </a>
            <li className="cursor-pointer hover:text-white">
              fitzilladel@gmail.com
            </li>
          </ul>
        </div>
      </div>
      <hr className="w-full h-0.5 bg-[#808080] border-none" />

      <p className="text-center text-sm text-[#7a8ed0] tracking-wide">
        Copyright © {new Date().getFullYear()} FitZilla . All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
