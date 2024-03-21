"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import "./navbar.css";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/slices/isAuthSlice";
import { useRouter } from "next/navigation";
import { useGetElectorQuery, useGetOrganizationQuery } from "../../store/api/api.js";
import { getDataFromLocalStorage } from "../../utils/localStorage";

const Navbar = ({ userRole }) => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [menu, setMenu] = useState(false);
  const dispatch = useDispatch();
  const overlayRef = useRef(null);

  const styleMenuOn = menu ? { display: "none" } : { display: "block" };
  const styleMenuOff = menu ? { display: "block" } : { display: "none" };
  const menuSideBar = menu ? { display: "flex" } : { display: "none" };
  const userId = getDataFromLocalStorage("id");

  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = userRole === "elector" ? useGetElectorQuery(userId) : useGetOrganizationQuery(userId);
  const user = userRole === "elector" ? userData?.data?.elector : userData?.data?.organization;

  function toggleMenu() {
    setMenu((prev) => {
      if (prev === true) {
        return false;
      } else if (prev === false) {
        return true;
      }
    });
  }

  //CHECK IF USER IS AUTHENTICATED BASED ON WHAT IS STORED ON LOCAL STORAGE
  const isAuthenticated = useSelector((state) => state.isAuth.isAuth);

  useEffect(() => {
    isAuthenticated ? "" : router.push(`/login`);
  }, [isAuthenticated]);

  return (
    <>
      {/* POP UP */}
      <div className="overlay" id="logoutOverlay" ref={overlayRef}>
        <div className="popup">
          <span className="close-btn" onClick={() => (overlayRef.current.style.display = `none`)}>
            &times;
          </span>
          <h1>Confirm Logout</h1>
          <small>Do you wish to continue to logout</small>
          <div className="logout-btns">
            <button onClick={() => (overlayRef.current.style.display = `none`)} className="btn">
              cancel
            </button>
            <button
              onClick={() => {
                dispatch(logOut());
                router.push("/login");
              }}
              className="btn">
              continue
            </button>
          </div>
        </div>
      </div>

      <section className="dashboard-page-top">
        <Link
          className="app-name links"
          href={userRole === "elector" ? "/dashboard/elector" : "/dashboard/organization"}>
          VOTA<span className="material-symbols-outlined">task_alt</span>
        </Link>
        <div className="nav-search">
          <i
            className="bx bx-search"
            onClick={() =>
              searchText !== "" ? router.push(`/dashboard/${userRole}/list?q=${searchText}`) : ""
            }></i>
          <input
            type="text"
            placeholder={userRole === "elector" ? "Search for organizations" : "Search for elector"}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                searchText !== "" ? router.push(`/dashboard/${userRole}/list?q=${searchText}`) : "";
              }
            }}
          />
        </div>
        {userRole === "elector" ? (
          // Electors menu options
          <div className="nav-menu">
            <i
              className="bx bx-bell bx-tada-hover"
              onClick={() => router.push("/dashboard/elector/notifications")}></i>
            <i
              className="bx bx-grid-alt"
              onClick={() => router.push("/dashboard/elector/organizations")}></i>
            <div className="profile-img-container">
              <Image
                onClick={() => router.push("/dashboard/elector/profile")}
                className="img prof"
                src={
                  user && (user?.displayPicture === undefined || user?.displayPicture === "nil")
                    ? "/images/profile.jpeg"
                    : `https://vota.onrender.com/${user && user?.displayPicture}`
                }
                width={50}
                height={50}
                alt={user && user.fullName ? user.fullName[0] + user.fullName[1] : ""}
              />
            </div>
            <button
              className="btn"
              onClick={() => {
                overlayRef.current.style.display = `flex`;
              }}>
              Logout
            </button>
          </div>
        ) : (
          // Organization menu options
          <div className="nav-menu">
            <i
              className="bx bx-poll bx-rotate-270"
              onClick={() => router.push("/dashboard/organization/events")}></i>
            <i
              className="bx bx-bell bx-tada-hover"
              onClick={() => router.push("/dashboard/organization/notifications")}></i>
            <div className="profile-img-container">
              <Image
                onClick={() => router.push("/dashboard/organization/profile")}
                className="img prof"
                src={
                  user && (user?.logo === undefined || user?.logo === "nil")
                    ? "/images/profile.jpeg"
                    : `https://vota.onrender.com/${user && user.logo}`
                }
                width={50}
                height={50}
                alt={user && user.companyName ? user.companyName[0] + user.companyName[1] : ""}
              />
            </div>
            <button
              className="btn"
              onClick={() => {
                overlayRef.current.style.display = `flex`;
              }}>
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
            className="img prof"
            src={`https://vota.onrender.com/${
              (user && user.displayPicture) || (user && user.logo)
            }`}
            width={50}
            height={50}
            alt={
              user && user.fullName
                ? user.fullName[0] + user.fullName[1]
                : user && user.companyName
                ? user.companyName[0] + user.companyName[1]
                : ""
            }
          />
          <div className="hover-name">
            {user && user.fullName
              ? user.fullName[0] + user.fullName[1]
              : user && user.companyName
              ? user.companyName[0] + user.companyName[1]
              : ""}
          </div>
        </div>
        <h3>{user && user.email}</h3>
        <div className="nav-search">
          <i
            className="bx bx-search"
            onClick={() => {
              router.push(`/dashboard/${userRole}/list?q=${searchText}`);
              toggleMenu();
            }}></i>
          <input
            type="text"
            placeholder={
              userRole === "elector" ? "Search for organizations" : "Search for electors"
            }
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                searchText !== "" ? router.push(`/dashboard/${userRole}/list?q=${searchText}`) : "";
                toggleMenu();
              }
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
              }}>
              <span>Notifications</span>
            </i>
            <i
              className="bx bx-grid-alt"
              onClick={() => {
                router.push("/dashboard/elector/organizations");
                toggleMenu();
              }}>
              <span>Organizations</span>
            </i>
            <button
              className="btn"
              onClick={() => {
                overlayRef.current.style.display = `flex`;
              }}>
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
              }}>
              <span>Events</span>
            </i>
            <i
              className="bx bx-bell"
              onClick={() => {
                router.push("/dashboard/organization/notifications");
                toggleMenu();
              }}>
              <span>Notifications</span>
            </i>
            <button
              className="btn"
              onClick={() => {
                overlayRef.current.style.display = `flex`;
              }}>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
