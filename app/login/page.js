'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function Login() {
  const [electClassName, setElectClassName] = useState('elect selected');

  return (
    <main>
      <section className="home-page-top">
        <Link className="app-name links" href="/">
          VOTA<span className="material-symbols-outlined">task_alt</span>
        </Link>
      </section>

      <section className="signup-page-body">
        <div className={electClassName}>
          <h1>Login to Vota</h1>
          <form className="forms">
            <input type="email" placeholder="email" />
            <input type="password" placeholder="password" />
            <button onClick={() => {}} className="btn">
              Login to my account
            </button>
          </form>
          <p>
            Already have an account?{' '}
            <Link className="links" href="/signup">
              Sign Up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
