'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import './navbar.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  return (
    <>
      <section className="dashboard-page-top">
        <Link className="app-name links" href="/">
          VOTA<span className="material-symbols-outlined">task_alt</span>
        </Link>
        <div className="nav-search">
          <i className="bx bx-search" onClick={() => router.push(`/dashboard/elector/orglist?q=${searchText}`)}></i>
          <input
            type="text"
            placeholder="Search for organizations..."
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </div>
        <div className="nav-menu">
          <i className="bx bx-bell bx-tada-hover" onClick={() => router.push('/signup')}></i>
          <i className="bx bx-grid-alt" onClick={() => router.push('/signup')}></i>
          <div className="profile-img-container">
            <Image className="img" src="/images/Get-Close.png" width={50} height={50} alt="Get-in-Front" />
          </div>
          <button className="btn" onClick={() => router.push('/signup')}>
            Logout
          </button>
        </div>
      </section>
    </>
  );
};

export default Navbar;
