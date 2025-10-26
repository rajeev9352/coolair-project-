"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setMessage("");

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setMessage("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/newsletter/subscribe",
        { email }
      );
      setMessage(res.data.message);
      setEmail("");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Subscription failed");
    } finally {
      setLoading(false);
    }
  };

  const footerLinks = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "About Us", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Products", href: "/all-products" },
        { name: "Blog", href: "/blog" },
        { name: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Our Services",
      links: [
        { name: "AC Installation", href: "/services/installation" },
        { name: "Repair & Maintenance", href: "/services/repair" },
        { name: "Duct Cleaning", href: "/services/duct-cleaning" },
        { name: "Energy Audits", href: "/services/energy-audits" },
        { name: "Commercial HVAC", href: "/services/commercial" },
        { name: "24/7 Emergency Service", href: "/services/emergency" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "FAQs", href: "/support/faqs" },
        { name: "Warranty", href: "/support/warranty" },
        { name: "Track Service", href: "/support/track-service" },
        { name: "User Manuals", href: "/support/manuals" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "https://facebook.com", label: "Facebook" },
    { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter" },
    { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram" },
    { icon: <FaYoutube />, href: "https://youtube.com", label: "YouTube" },
    { icon: <FaLinkedin />, href: "https://linkedin.com", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and About */}
          <div>
            <div className="mb-6">
              <Link href="/" className="inline-block">
                <Image
                  src="/images/logo.webp"
                  alt="CoolAir Logo"
                  width={160}
                  height={45}
                  className="h-11 w-auto"
                />
              </Link>
            </div>
            <p className="mb-6 text-gray-400">
              CoolAir is a leading provider of high-quality air conditioning
              solutions, offering installation, maintenance, and repair services
              for residential and commercial clients.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors text-xl"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {footerLinks.map((section, index) => (
            <div key={index}>
              <h3 className="text-white text-lg font-semibold mb-6 relative pb-2">
                {section.title}
                <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
              </h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Info + Newsletter */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-6 relative pb-2">
              Contact Us
              <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-primary"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <FaMapMarkerAlt className="text-primary mt-1 mr-3 flex-shrink-0" />
                <span>
                  123 Cooling Street, Suite 101<br />New York, NY 10001, USA
                </span>
              </li>
              <li className="flex items-center">
                <FaPhone className="text-primary mr-3" />
                <a
                  href="tel:+11234567890"
                  className="hover:text-white transition-colors"
                >
                  +1 (123) 456-7890
                </a>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-primary mr-3" />
                <a
                  href="mailto:info@coolair.com"
                  className="hover:text-white transition-colors"
                >
                  info@coolair.com
                </a>
              </li>
            </ul>

            {/* Newsletter Form */}
            <div className="mt-6">
              <h4 className="text-white font-medium mb-3">Newsletter</h4>
              <p className="text-sm text-gray-400 mb-3">
                Subscribe to get updates on new products and special offers
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 w-full bg-gray-800 text-white border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
                <button
                  onClick={handleSubscribe}
                  className={`bg-primary text-white px-4 rounded-r-lg transition-colors ${
                    loading ? "opacity-70 cursor-not-allowed" : "hover:bg-primary/90"
                  }`}
                  disabled={loading}
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>
              {message && (
                <p
                  className={`mt-2 text-sm ${
                    message.includes("successfully")
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm mb-4 md:mb-0">
              &copy; {currentYear} CoolAir. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/privacy-policy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Terms of Service
              </Link>
              <span className="text-gray-600">|</span>
              <Link
                href="/sitemap"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Sitemap
              </Link>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500 text-sm">We accept:</span>
                <div className="flex space-x-2">
                  <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                  <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                  <div className="w-8 h-5 bg-gray-700 rounded-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}