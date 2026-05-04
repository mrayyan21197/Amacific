import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import MailchimpSignupForm from "./MailchimpSignupForm";
import { trackEvent } from "../utils/analytics";

const Footer = () => {
  const socialClass =
    "w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-lg hover:bg-orange-500 hover:scale-105 transition-all border border-white/10";

  const onSocial = (platform) => trackEvent("referral_link_click", { target: platform, placement: "footer_bar" });

  return (
    <footer className="w-full bg-gradient-to-b from-navy-deep to-[#2e1065] text-white pt-16 pb-6">
      <div className="max-w-container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-bold font-titleFont mb-2">Amacific</h3>
          <p className="text-orange-200 text-sm font-semibold mb-3">You want it, we have it</p>
          <p className="text-zinc-400 text-sm leading-relaxed max-w-xs">
            Pakistan&apos;s youth-first one-stop marketplace — fashion, tech, beauty, stationery &amp; essentials in one cart.
            COD &amp; digital wallets nationwide.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold font-titleFont mb-4 text-violet-300">About Amacific</h4>
          <ul className="flex flex-col gap-3 text-zinc-400 text-sm">
            <li>
              <Link to="/about" className="hover:text-white">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">
                Help Center
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:text-white">
                Return Policy
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:text-white">
                Track Order
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact / WhatsApp Support
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold font-titleFont mb-4 text-violet-300">Campaigns &amp; shop</h4>
          <ul className="flex flex-col gap-3 text-zinc-400 text-sm">
            <li>
              <Link to="/campaigns/one-cart-full-life" className="hover:text-white">
                One Cart, Full Life
              </Link>
            </li>
            <li>
              <Link to="/campaigns/smartest-cart-challenge" className="hover:text-white">
                Smartest Cart Challenge
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-white">
                All products
              </Link>
            </li>
            <li>
              <Link to="/deals" className="hover:text-white">
                Deals Under PKR 999
              </Link>
            </li>
            <li>
              <Link to="/student-essentials" className="hover:text-white">
                Student Essentials
              </Link>
            </li>
          </ul>
          <h4 className="text-lg font-bold font-titleFont mt-8 mb-3 text-violet-300">Payment methods</h4>
          <p className="text-xs text-zinc-500">COD · JazzCash · Easypaisa · Raast · Visa / Mastercard</p>
        </div>

        <div>
          <h4 className="text-lg font-bold font-titleFont mb-4 text-violet-300">Newsletter</h4>
          <p className="text-zinc-400 text-sm mb-4">First-order tips, deals under PKR 999, and challenge updates.</p>
          <MailchimpSignupForm tag="footer_newsletter" audience="general" buttonLabel="Sign up" />
          <p className="text-xs text-zinc-500 mt-4">
            <a href="mailto:support@amacific.pk" className="hover:text-violet-300">
              support@amacific.pk
            </a>
          </p>
        </div>
      </div>

      <div className="max-w-container mx-auto px-4 mt-14 pt-10 border-t border-white/10">
        <p className="text-center text-sm font-semibold text-violet-200 mb-4 tracking-wide uppercase">Social media</p>
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          <a
            href="https://www.facebook.com/amacific.pk"
            target="_blank"
            rel="noopener noreferrer"
            className={socialClass}
            aria-label="Facebook"
            onClick={() => onSocial("facebook")}
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/amacific.pk"
            target="_blank"
            rel="noopener noreferrer"
            className={socialClass}
            aria-label="Instagram"
            onClick={() => onSocial("instagram")}
          >
            <FaInstagram />
          </a>
          <a
            href="https://www.tiktok.com/@amacific.pk"
            target="_blank"
            rel="noopener noreferrer"
            className={socialClass}
            aria-label="TikTok"
            onClick={() => onSocial("tiktok")}
          >
            <SiTiktok />
          </a>
          <a
            href="https://www.youtube.com/@amacificpk"
            target="_blank"
            rel="noopener noreferrer"
            className={socialClass}
            aria-label="YouTube"
            onClick={() => onSocial("youtube")}
          >
            <FaYoutube />
          </a>
          <a
            href="https://wa.me/923001234567"
            target="_blank"
            rel="noopener noreferrer"
            className={`${socialClass} hover:bg-[#25D366] hover:border-[#25D366]`}
            aria-label="WhatsApp"
            onClick={() => onSocial("whatsapp")}
          >
            <FaWhatsapp className="text-xl" />
          </a>
        </div>
        <p className="text-center text-zinc-500 text-xs leading-relaxed">
          © 2026 Amacific. Karachi · Lahore · Islamabad · Faisalabad · Multan · Hyderabad
        </p>
      </div>
    </footer>
  );
};

export default Footer;
