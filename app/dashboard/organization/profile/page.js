"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useRef } from "react";
import "../../../../components/global/orgpage.css";
import Uploadimage from "../../../../components/global/Uploadimage.js";

export default function Page() {
  const router = useRouter();
  const overlayRef = useRef(null);
  const [edit, setEdit] = useState();

  return (
    <section className="profile-page">
      <>
        {/* top section */}
        <div className="org-single-top">
          <Image
            className="img"
            src="/images/Get-Organized.png"
            width={150}
            height={150}
            alt="profile"
          />
          <div className="parted">
            <h1>Pointa</h1>
            <small>pointa@gmail.com</small>
            <p>
              <i className="bx bx-poll"></i> <span>20</span> events conducted
            </p>
            <p>
              <i className="bx bx-poll"></i> <span>5</span> events ongoing
            </p>
            <i
              className="bx bxs-camera"
              onClick={() => {
                setEdit(() => "image");
                overlayRef.current.style.display = `flex`;
              }}
            ></i>
          </div>
        </div>

        {/* body section */}
        <div className="profile-section">
          {/* Edit profile */}
          <form className="profile-forms">
            <h1 className="edit-profile">
              Edit Profile <i className="bx bx-pencil"></i>
            </h1>
            <input type="text" placeholder="Organization Name" />
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="Contact Number" />
            <input type="number" placeholder="Number of Staff" />
            <input type="text" placeholder="Location" />
            <button onClick={() => {}} className="btn">
              confirm
            </button>
          </form>

          {/* Edit account settings */}
          <form className="profile-forms">
            <h1 className="edit-profile">
              Edit Account Settings <i className="bx bx-pencil"></i>
            </h1>
            <input type="email" placeholder="Organization Email" />
            <button
              onClick={(e) => {
                e.preventDefault();
                setEdit(() => "email");
                overlayRef.current.style.display = `flex`;
              }}
              className="btn edits"
            >
              <i className="bx bx-pencil"></i> Edit Email
            </button>
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm Password" />
            <button
              onClick={(e) => {
                e.preventDefault();
                setEdit(() => "password");
                overlayRef.current.style.display = `flex`;
              }}
              className="btn edits"
            >
              <i className="bx bx-pencil"></i> Edit password
            </button>
          </form>
        </div>

        {/* POP UP */}
        <div className="overlay" id="overlay" ref={overlayRef}>
          <div className="popup">
            <span
              className="close-btn"
              onClick={() => (overlayRef.current.style.display = `none`)}
            >
              &times;
            </span>
            {edit === "image" ? (
              <Uploadimage />
            ) : (
              <>
                <h1>Confirm Request</h1>
                <small>An OTP was sent to your mail</small>
                <form className="forms">
                  <input type="text" placeholder="OTP" />{" "}
                  <button onClick={() => {}} className="btn">
                    Confirm
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </>
    </section>
  );
}
