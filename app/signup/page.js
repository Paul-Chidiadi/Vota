"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Sign() {
  const [options, setOptions] = useState([
    {
      id: 1,
      text: "I'm an organization, managing a poll.",
      image: "/images/Get-Organized.png",
      isSelected: false,
    },
    {
      id: 2,
      text: "I'm an elector, participating in a poll.",
      image: "/images/Get-Close.png",
      isSelected: false,
    },
  ]);
  const [account, setAccount] = useState("");
  const [selectAccountClassName, setSelectAccountClassName] = useState(
    "inner-container selected"
  );
  const [orgClassName, setOrgClassName] = useState("org");
  const [electClassName, setElectClassName] = useState("elect");

  //HANDLE SELECTION FUNCTION
  function handleClick(id) {
    if (id === 1) {
      setAccount("Organization");
    } else if (id === 2) {
      setAccount("Elector");
    }
    setOptions((prev) => {
      return prev.map((item) => {
        return item.id === id
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false };
      });
    });
  }

  //HANDLE SWITCH FUNCTION
  function handleSwitch() {
    if (account === "Organization") {
      setAccount("Elector");
      setOrgClassName("org");
      setElectClassName("elect selected");
    } else if (account === "Elector") {
      setAccount("Organization");
      setElectClassName("elect");
      setOrgClassName("org selected");
    }
  }

  //HANDLE JOIN FUNCTION
  function joinNow() {
    if (account === "Organization") {
      setSelectAccountClassName("inner-container");
      setOrgClassName("org selected");
    } else if (account === "Elector") {
      setSelectAccountClassName("inner-container");
      setElectClassName("elect selected");
    }
  }

  const optionElements = options.map((option) => {
    return (
      <div
        className={option.isSelected ? "col selected" : "col"}
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
        {/* SELECT ACCOUNT SECTION */}
        <div className={selectAccountClassName}>
          <h1>Join as an organization or elector</h1>
          <div className="choose">
            {/* dynamically display options */}
            {optionElements}
          </div>
          {account !== "" && (
            <button onClick={joinNow} className="btn">
              Join as an {account}
            </button>
          )}
          <p>
            Already have an account?{" "}
            <Link className="links" href="/login">
              Login
            </Link>
          </p>
        </div>

        {/* ORGANIZATION SECTION */}
        <div className={orgClassName}>
          <h1>Joining as an {account}</h1>
          <form className="forms">
            <input type="name" placeholder="Organization Name" />
            <input type="email" placeholder="Work Email Address" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button onClick={() => {}} className="btn">
              Create my account
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link className="links" href="/login">
              Login
            </Link>
          </p>
          <p onClick={handleSwitch}>
            <Link className="links" href="/signup">
              Join as an Elector.
            </Link>
          </p>
        </div>

        {/* ELECTOR SECTION */}
        <div className={electClassName}>
          <h1>Joining as an {account}</h1>
          <form className="forms">
            <input type="name" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm Password" />
            <button onClick={() => {}} className="btn">
              Create my account
            </button>
          </form>
          <p>
            Already have an account?{" "}
            <Link className="links" href="/login">
              Login
            </Link>
          </p>
          <p onClick={handleSwitch}>
            <Link className="links" href="/signup">
              Join as an Organization.
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
