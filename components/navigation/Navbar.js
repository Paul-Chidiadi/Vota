"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import "./navbar.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/slices/isAuthSlice";
import { useRouter } from "next/navigation";

const Navbar = ({ userRole }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const overlayRef = useRef(null);

  const styleMenuOn = menu ? { display: "none" } : { display: "block" };
  const styleMenuOff = menu ? { display: "block" } : { display: "none" };
  const menuSideBar = menu ? { display: "flex" } : { display: "none" };

  function toggleMenu() {
    setMenu((prev) => {
      if (prev === true) {
        return false;
      } else if (prev === false) {
        return true;
      }
    });
  }

  return (
    <>
      {/* POP UP */}
      <div className="overlay" id="logoutOverlay" ref={overlayRef}>
        <div className="popup">
          <span
            className="close-btn"
            onClick={() => (overlayRef.current.style.display = `none`)}
          >
            &times;
          </span>
          <h1>Confirm Logout</h1>
          <small>Do you wish to continue to logout</small>
          <div className="logout-btns">
            <button
              onClick={() => (overlayRef.current.style.display = `none`)}
              className="btn"
            >
              cancel
            </button>
            <button
              onClick={() => {
                dispatch(logOut());
                router.push("/login");
              }}
              className="btn"
            >
              continue
            </button>
          </div>
        </div>
      </div>

      <section className="dashboard-page-top">
        <Link
          className="app-name links"
          href={
            userRole === "elector"
              ? "/dashboard/elector"
              : "/dashboard/organization"
          }
        >
          VOTA<span className="material-symbols-outlined">task_alt</span>
        </Link>
        <div className="nav-search">
          <i
            className="bx bx-search"
            onClick={() =>
              searchText !== ""
                ? router.push(`/dashboard/${userRole}/list?q=${searchText}`)
                : ""
            }
          ></i>
          <input
            type="text"
            placeholder={
              userRole === "elector"
                ? "Search for organizations"
                : "Search for electors"
            }
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        {userRole === "elector" ? (
          // Electors menu options
          <div className="nav-menu">
            <i
              className="bx bx-bell bx-tada-hover"
              onClick={() => router.push("/dashboard/elector/notifications")}
            ></i>
            <i
              className="bx bx-grid-alt"
              onClick={() => router.push("/dashboard/elector/organizations")}
            ></i>
            <div className="profile-img-container">
              <Image
                onClick={() => router.push("/dashboard/elector/profile")}
                className="img"
                src="/images/Get-Close.png"
                width={50}
                height={50}
                alt="Profile Image"
              />
            </div>
            <button
              className="btn"
              onClick={() => {
                overlayRef.current.style.display = `flex`;
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          // Organization menu options
          <div className="nav-menu">
            <i
              className="bx bx-poll bx-rotate-270"
              onClick={() => router.push("/dashboard/organization/events")}
            ></i>
            <i
              className="bx bx-bell bx-tada-hover"
              onClick={() =>
                router.push("/dashboard/organization/notifications")
              }
            ></i>
            <div className="profile-img-container">
              <Image
                onClick={() => router.push("/dashboard/organization/profile")}
                className="img"
                src="/images/Get-Organized.png"
                width={50}
                height={50}
                alt="Profile Image"
              />
            </div>
            <button
              className="btn"
              onClick={() => {
                overlayRef.current.style.display = `flex`;
              }}
            >
              Logout
            </button>
          </div>
        )}
        <div className="menu-icons" onClick={toggleMenu}>
          <i className="bx bx-menu" style={styleMenuOn}></i>
          <i className="bx bx-x" style={styleMenuOff}></i>
        </div>
      </section>

      {/* SLIDE IN MENU SECTION */}
      <div className="slide-in-menu" style={menuSideBar}>
        <div className="profile-img-container">
          <Image
            onClick={() => {
              router.push(`/dashboard/${userRole}/profile`);
              toggleMenu();
            }}
            className="img"
            src="/images/Get-Close.png"
            width={50}
            height={50}
            alt="Profile Image"
          />
          <div className="hover-name">PC</div>
        </div>
        <h3>paulchidiadi@gmail.com</h3>
        <div className="nav-search">
          <i
            className="bx bx-search"
            onClick={() => {
              router.push(`/dashboard/${userRole}/list?q=${searchText}`);
              toggleMenu();
            }}
          ></i>
          <input
            type="text"
            placeholder={
              userRole === "elector"
                ? "Search for organizations"
                : "Search for electors"
            }
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        {userRole === "elector" ? (
          // Electors menu options
          <div className="nav-sliding-menu">
            <i
              className="bx bx-bell"
              onClick={() => {
                router.push("/dashboard/elector/notifications");
                toggleMenu();
              }}
            >
              <span>Notifications</span>
            </i>
            <i
              className="bx bx-grid-alt"
              onClick={() => {
                router.push("/dashboard/elector/organizations");
                toggleMenu();
              }}
            >
              <span>Organizations</span>
            </i>
            <button
              className="btn"
              onClick={() => {
                overlayRef.current.style.display = `flex`;
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          // Organization menu options
          <div className="nav-sliding-menu">
            <i
              className="bx bx-poll"
              onClick={() => {
                router.push("/dashboard/organization/events");
                toggleMenu();
              }}
            >
              <span>Events</span>
            </i>
            <i
              className="bx bx-bell"
              onClick={() => {
                router.push("/dashboard/organization/notifications");
                toggleMenu();
              }}
            >
              <span>Notifications</span>
            </i>
            <button
              className="btn"
              onClick={() => {
                overlayRef.current.style.display = `flex`;
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
