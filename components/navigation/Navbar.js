'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import './navbar.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = ({ userRole }) => {
  userRole = 'elector';
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [menu, setMenu] = useState(false);

  const styleMenuOn = menu ? { display: 'none' } : { display: 'block' };
  const styleMenuOff = menu ? { display: 'block' } : { display: 'none' };
  const menuSideBar = menu ? { display: 'flex' } : { display: 'none' };

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
      <section className="dashboard-page-top">
        <Link className="app-name links" href="/">
          VOTA<span className="material-symbols-outlined">task_alt</span>
        </Link>
        <div className="nav-search">
          <i className="bx bx-search" onClick={() => router.push(`/dashboard/${userRole}/list?q=${searchText}`)}></i>
          <input
            type="text"
            placeholder={userRole === 'elector' ? 'Search for organizations' : 'Search for electors'}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        {userRole === 'elector' ? (
          // Electors menu options
          <div className="nav-menu">
            <i className="bx bx-bell bx-tada-hover" onClick={() => router.push('/')}></i>
            <i className="bx bx-grid-alt" onClick={() => router.push('/')}></i>
            <div className="profile-img-container">
              <Image
                onClick={() => router.push('/')}
                className="img"
                src="/images/Get-Close.png"
                width={50}
                height={50}
                alt="Profile Image"
              />
            </div>
            <button className="btn" onClick={() => router.push('/signup')}>
              Logout
            </button>
          </div>
        ) : (
          // Organization menu options
          <div className="nav-menu">
            <i class="bx bx-poll bx-rotate-270" onClick={() => router.push('/')}></i>
            <i className="bx bx-bell bx-tada-hover" onClick={() => router.push('/')}></i>
            <div className="profile-img-container">
              <Image
                onClick={() => router.push('/')}
                className="img"
                src="/images/Get-Organized.png"
                width={50}
                height={50}
                alt="Profile Image"
              />
            </div>
            <button className="btn" onClick={() => router.push('/signup')}>
              Logout
            </button>
          </div>
        )}
        <div className="menu-icons" onClick={toggleMenu}>
          <i class="bx bx-menu" style={styleMenuOn}></i>
          <i class="bx bx-x" style={styleMenuOff}></i>
        </div>
      </section>

      {/* SLIDE IN MENU SECTION */}
      <div className="slide-in-menu" style={menuSideBar}>
        <div className="profile-img-container">
          <Image
            onClick={() => router.push('/')}
            className="img"
            src="/images/Get-Close.png"
            width={50}
            height={50}
            alt="Profile Image"
          />
        </div>
        <h3>paulchidiadi@gmail.com</h3>
        <div className="nav-search">
          <i className="bx bx-search" onClick={() => router.push(`/dashboard/${userRole}/list?q=${searchText}`)}></i>
          <input
            type="text"
            placeholder={userRole === 'elector' ? 'Search for organizations' : 'Search for electors'}
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        {userRole === 'elector' ? (
          // Electors menu options
          <div className="nav-sliding-menu">
            <i className="bx bx-bell" onClick={() => router.push('/')}>
              <span>Notifications</span>
            </i>
            <i className="bx bx-grid-alt" onClick={() => router.push('/')}>
              <span>Organizations</span>
            </i>
            <button className="btn" onClick={() => router.push('/signup')}>
              Logout
            </button>
          </div>
        ) : (
          // Organization menu options
          <div className="nav-sliding-menu">
            <i class="bx bx-poll" onClick={() => router.push('/')}>
              <span>Events</span>
            </i>
            <i className="bx bx-bell" onClick={() => router.push('/')}>
              <span>Notifications</span>
            </i>
            <button className="btn" onClick={() => router.push('/signup')}>
              Logout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
