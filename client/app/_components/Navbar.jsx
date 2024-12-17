"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import icon from "../../images/menu_icon.svg";
import cross from "../../images/cross_icon.svg";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const Navbar = () => {
  const [showMenu, setshowMenu] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    console.log("session", session);
    if (showMenu) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMenu]);

  const handleSignOut = async (e) => {
    e.preventDefault();
    const result = await signOut({ redirect: false, callbackUrl: "/" });
  };

  return (
    <div className="absolute top-0 left-0 w-full z-10">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        {/* <img src={controller} alt="logo" />
         */}
        <h1 className="text-xl sm:text-4xl md:text-5xl inline-block max-w-3xl font-semibold pt-10 text-white">
          Soccerbrite
        </h1>
        {session ? (
          <>
            <Link href="/dashboard">
              <button className="hidden md:block bg-white px-8 py-2 rounded-full transition hover:bg-gray-200">
                Dashboard
              </button>
            </Link>
            <button
              className="hidden md:block bg-white px-8 py-2 rounded-full transition hover:bg-gray-200"
              onClick={(e) => handleSignOut(e)}
            >
              Log Out
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="hidden md:block bg-white px-8 py-2 rounded-full transition hover:bg-gray-200">
              Log In
            </button>
          </Link>
        )}
        {/* <button className="hidden md:block bg-white px-8 py-2 rounded-full">Sign Up</button> */}
        <Image
          src={icon}
          onClick={() => setshowMenu(true)}
          alt="icon"
          className="md:hidden w-7 cursor-pointer"
        />
      </div>

      {/* mobile-menu */}

      <div
        className={`md:hidden ${
          showMenu ? "fixed w-full" : "h-0 w-0"
        }   right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
      >
        <div className="flex justify-end p-6 cursor-pointer">
          <Image
            src={cross}
            className="w-6"
            onClick={() => setshowMenu(false)}
            alt="cross"
          />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <a
            onClick={() => setshowMenu(false)}
            href="#Header"
            className="px-4 py-2 rounded-full inline-block"
          >
            Home
          </a>
          <a
            onClick={() => setshowMenu(false)}
            href="#About"
            className="px-4 py-2 rounded-full inline-block"
          >
            About
          </a>
          <a
            onClick={() => setshowMenu(false)}
            href="#Events"
            className="px-4 py-2 rounded-full inline-block"
          >
            Events
          </a>
          <a
            onClick={() => setshowMenu(false)}
            href="#Testimonials"
            className="px-4 py-2 rounded-full inline-block"
          >
            Reviews
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
