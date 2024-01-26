"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "../../../../components/global/orgpage.css";

export default function Page() {
  const router = useRouter();

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
            <i className="bx bxs-camera" onClick={() => {}}></i>
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
            <button onClick={() => {}} className="btn edits">
              <i className="bx bx-pencil"></i> Edit Email
            </button>
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="New Password" />
            <input type="password" placeholder="Confirm Password" />
            <button onClick={() => {}} className="btn edits">
              <i className="bx bx-pencil"></i> Edit password
            </button>
          </form>
        </div>
      </>
    </section>
  );
}
