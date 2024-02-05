"use client";
import Link from "next/link";
import { useState } from "react";

export default function Login() {
  return (
    <main>
      <section className="home-page-top">
        <Link className="app-name links" href="/">
          VOTA<span className="material-symbols-outlined">task_alt</span>
        </Link>
      </section>

      <section className="signup-page-body">
        <div className="elect selected">
          <h1>Forgot Password</h1>
          <form className="forms">
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="OTP" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm Password" />
            <button onClick={() => {}} className="btn">
              Reset
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
