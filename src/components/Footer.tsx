import React from "react";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaTelegram,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div>
          <h1 className="text-2xl font-bold">WEARPLUS</h1>
          <p className="text-sm text-gray-400 mt-2">
            Quality and Original products, Pupular Brands
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h2 className="text-lg font-semibold mb-2">More</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/shoes">All Products</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/stationary-shop">Stationary</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
          </ul>
        </div>

        {/* Follow Us */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Follow Us</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaFacebook />
              <a href="https://www.facebook.com/cheng.menglay" target="_blank">
                Facebook
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaInstagram />
              <a href="https://www.instagram.com/chengmenglay/" target="_blank">
                Instagram
              </a>
            </li>
            <li className="flex items-center gap-2">
              <FaTelegram />
              <a href="https://t.me/Cheng_Meglay" target="_blank">
                Telegram
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact Us</h2>
          <ul className="space-y-2 text-sm text-gray-300">
            <li className="flex items-center gap-2">
              <FaEnvelope />
              cheng.menglay79@gmail.com
            </li>
            <li className="flex items-center gap-2">
              <FaPhone /> +855 892 407 66
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 mt-8">
        &copy; {new Date().getFullYear()} WEARPLUS. All rights reserved.
      </div>
    </footer>
  );
}
