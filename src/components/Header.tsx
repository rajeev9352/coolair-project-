// "use client";

// import { useState, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [isAuthed, setIsAuthed] = useState(false);
//   const router = useRouter();

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10);
//     };
//     document.addEventListener("scroll", handleScroll);
//     return () => {
//       document.removeEventListener("scroll", handleScroll);
//     };
//   }, []);

//   const checkAuthed = () => {
//     const hasCookie = typeof document !== 'undefined' && document.cookie.split('; ').some((c) => c.startsWith('auth='));
//     const hasLocal = typeof window !== 'undefined' && localStorage.getItem('authed') === 'true';
//     return hasCookie || hasLocal;
//   };

//   useEffect(() => {
//     // Initial check and subscribe to changes
//     setIsAuthed(checkAuthed());
//     const onStorage = () => setIsAuthed(checkAuthed());
//     const onVisibility = () => {
//       if (document.visibilityState === 'visible') setIsAuthed(checkAuthed());
//     };
//     window.addEventListener('storage', onStorage);
//     document.addEventListener('visibilitychange', onVisibility);
//     return () => {
//       window.removeEventListener('storage', onStorage);
//       document.removeEventListener('visibilitychange', onVisibility);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const handleSignOut = () => {
//     try {
//       // Clear cookie and local storage
//       document.cookie = 'auth=; Max-Age=0; Path=/';
//       localStorage.removeItem('authed');
//     } catch {}
//     setIsAuthed(false);
//     router.replace('/auth');
//   };

//   return (
//     <header
//       className={`header-light scroll-light ${
//         scrolled ? "sticky" : ""
//       } py-6 md:py-2 bg-white bg-opacity-30 backdrop-blur-md`}
//     >
//       <div className="container">
//         <div className="row">
//           <div className="col-md-12">
//             <div className="de-flex sm-pt10">
//               {/* Logo */}
//               <div className="de-flex-col">
//                 <div id="logo">
//                   <Link href="/home">
//                     <Image
//                       className="logo-main"
//                       src="/images/logo-black.webp"
//                       alt="CoolAir Logo"
//                       width={150}
//                       height={40}
//                     />
//                   </Link>
//                 </div>
//               </div>

//               {/* Menu */}
//               <div className="de-flex-col header-col-mid">
//                 <ul id="mainmenu" className={isMenuOpen ? "active" : ""}>
//                   <li>
//                     <Link className="menu-item" href="/home">
//                       Home
//                     </Link>
//                   </li>
//                   <li className="dropdown">
//                     <span className="menu-item">Services</span>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <Link className="menu-item" href="/services/installation">
//                           Installation
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="menu-item" href="/services/repair">
//                           Repair
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="menu-item" href="/services/maintenance">
//                           Maintenance
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="menu-item" href="/services/pricing-plans">
//                           Pricing Plans
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="menu-item" href="/services/price-list">
//                           Price List
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="menu-item" href="/services/area">
//                           Area We Serve
//                         </Link>
//                       </li>
//                     </ul>
//                   </li>
//                   <li>
//                     <Link className="menu-item" href="/about">
//                       About Us
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="menu-item" href="/projects">
//                       Projects
//                     </Link>
//                   </li>
//                   <li className="dropdown">
//                     <span className="menu-item">Products</span>
//                     <ul className="dropdown-menu">
//                       <li>
//                         <Link className="menu-item" href="/products">
//                           All Products
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="menu-item" href="/products/new">
//                           Product Details New
//                         </Link>
//                       </li>
//                       <li>
//                         <Link className="menu-item" href="/products/simple">
//                           Product Details Simple
//                         </Link>
//                       </li>
//                     </ul>
//                   </li>
//                   <li>
//                     <Link className="menu-item" href="/blog">
//                       Blog
//                     </Link>
//                   </li>
//                   <li>
//                     <Link className="menu-item" href="/contact">
//                       Contact
//                     </Link>
//                   </li>
//                 </ul>
//               </div>

//               {/* Buy Now + Mobile menu button */}
//               <div className="de-flex-col">
//                 <div className="menu_side_area">
//                   <Link href="/buy" className="btn-main bg-color-2 mr-3">
//                     Buy Now
//                   </Link>
//                   {isAuthed && (
//                     <button onClick={handleSignOut} className="btn-main bg-red-500">
//                       Sign out
//                     </button>
//                   )}
//                   <span
//                     id="menu-btn"
//                     onClick={toggleMenu}
//                     className={isMenuOpen ? "active" : ""}
//                   ></span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;







"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isAuthed, setIsAuthed] = useState(false);
  const router = useRouter();

  // ✅ Check if logged in (cookie or localStorage)
  const checkAuthed = () => {
    if (typeof document === "undefined") return false;
    const hasCookie = document.cookie
      .split("; ")
      .some((c) => c.startsWith("auth="));
    const hasLocal =
      typeof window !== "undefined" &&
      localStorage.getItem("authed") === "true";
    return hasCookie || hasLocal;
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    document.addEventListener("scroll", handleScroll);
    return () => document.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const checkAndUpdate = () => setIsAuthed(checkAuthed());

    // Initial check
    checkAndUpdate();

    // Re-check when storage changes (other tab or same tab)
    window.addEventListener("storage", checkAndUpdate);

    // Re-check when tab becomes active
    const handleVisibility = () => {
      if (document.visibilityState === "visible") checkAndUpdate();
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // Re-check when route/page changes (DOM mutation observer trick)
    const observer = new MutationObserver(checkAndUpdate);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("storage", checkAndUpdate);
      document.removeEventListener("visibilitychange", handleVisibility);
      observer.disconnect();
    };
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // ✅ Sign out clears auth + redirect
  const handleSignOut = () => {
    try {
      document.cookie = "auth=; Max-Age=0; Path=/";
      localStorage.removeItem("authed");
    } catch {}
    setIsAuthed(false);
    router.replace("/auth");
  };

  return (
    <header
      className={`header-light scroll-light ${
        scrolled ? "sticky" : ""
      } py-6 md:py-2 bg-white bg-opacity-30 backdrop-blur-md`}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="de-flex sm-pt10">
              {/* Logo */}
              <div className="de-flex-col">
                <div id="logo">
                  <Link href="/home">
                    <Image
                      className="logo-main"
                      src="/images/logo-black.webp"
                      alt="CoolAir Logo"
                      width={150}
                      height={40}
                    />
                  </Link>
                </div>
              </div>

              {/* Menu */}
              <div className="de-flex-col header-col-mid">
                <ul id="mainmenu" className={isMenuOpen ? "active" : ""}>
                  <li>
                    <Link className="menu-item" href="/home">
                      Home
                    </Link>
                  </li>
                  <li className="dropdown">
                    <span className="menu-item">Services</span>
                    <ul className="dropdown-menu">
                      <li>
                        <Link
                          className="menu-item"
                          href="/services/installation"
                        >
                          Installation
                        </Link>
                      </li>
                      <li>
                        <Link className="menu-item" href="/services/repair">
                          Repair
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-item"
                          href="/services/maintenance"
                        >
                          Maintenance
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="menu-item"
                          href="/services/pricing-plans"
                        >
                          Pricing Plans
                        </Link>
                      </li>
                      <li>
                        <Link className="menu-item" href="/services/price-list">
                          Price List
                        </Link>
                      </li>
                      <li>
                        <Link className="menu-item" href="/services/area">
                          Area We Serve
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="menu-item" href="/about">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link className="menu-item" href="/projects">
                      Projects
                    </Link>
                  </li>
                  <li className="dropdown">
                    <span className="menu-item">Products</span>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="menu-item" href="/all-products">
                          All Products
                        </Link>
                      </li>
                      <li>
                        <Link className="menu-item" href="/product-details-new">
                          Product Details New
                        </Link>
                      </li>
                      <li>
                        <Link className="menu-item" href="/product-details-simple">
                          Product Details Simple
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <Link className="menu-item" href="/blog">
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link className="menu-item" href="/contact">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Right side: Buy Now + Auth button */}
              <div className="de-flex-col">
                <div className="menu_side_area flex items-center gap-3">
                  {/* Buy Now Button */}
                  {/*  */}

                  {/* Auth Button */}
                  {!isAuthed ? (
                    <Link 
                      href="/auth" 
                      className="group relative bg-white hover:bg-gray-50 text-blue-600 hover:text-blue-700 border-2 border-blue-600 hover:border-blue-700 px-6 py-3 rounded-lg font-semibold transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                        </svg>
                        Sign In
                      </span>
                    </Link>
                  ) : (
                    <button
                      onClick={handleSignOut}
                      className="group relative bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-3 rounded-lg font-semibold transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:border-red-300"
                    >
                      <span className="flex items-center gap-2 relative z-10">
                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                      {/* Shine effect */}
                      <div className="absolute inset-0 -left-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:left-full transition-all duration-500 ease-out"></div>
                    </button>
                  )}

                  {/* Mobile menu button */}
                  <button
                    id="menu-btn"
                    onClick={toggleMenu}
                    className={`relative ml-2 p-2 rounded-lg transition-all duration-300 hover:bg-gray-100 ${isMenuOpen ? "bg-gray-100" : ""}`}
                  >
                    <div className="w-6 h-6 flex flex-col justify-center items-center">
                      <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
                      <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                      <span className={`bg-gray-700 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
