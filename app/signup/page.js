'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Sign() {
  const [options, setOptions] = useState([
    {
      id: 1,
      text: "I'm an organization, managing a poll.",
      image: '/images/Get-Organized.png',
      isSelected: false,
    },
    {
      id: 2,
      text: "I'm an elector, participating in a poll.",
      image: '/images/Get-Close.png',
      isSelected: false,
    },
  ]);
  const [account, setAccount] = useState('');

  function handleClick(id) {
    if (id === 1) {
      setAccount('Organization');
    } else if (id === 2) {
      setAccount('Elector');
    }
    setOptions((prev) => {
      return prev.map((item) => {
        return item.id === id
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false };
      });
    });
  }

  const optionElements = options.map((option) => {
    return (
      <div
        className={option.isSelected ? 'col selected' : 'col'}
        key={option.id}
        onClick={() => handleClick(option.id)}
      >
        <div className="circle"></div>
        <Image
          className="choose-img"
          src={option.image}
          alt="image info"
          width={100}
          height={70}
        />
        <h4>{option.text}</h4>
      </div>
    );
  });

  return (
    <main>
      <section className="home-page-top">
        <Link className="app-name links" href="/">
          VOTA<span className="material-symbols-outlined">task_alt</span>
        </Link>
      </section>

      <section className="signup-page-body">
        <div className="inner-container">
          <h1>Join as an organization or elector</h1>
          <div className="choose">
            {/* dynamically display options */}
            {optionElements}
          </div>
          {account !== '' && <button className="btn">Create Account</button>}
          <p>
            Already have an account?{' '}
            <Link className="links" href="/login">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
