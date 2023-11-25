'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Page() {
  const router = useRouter();

  return (
    <section className="org-main-page">
      <div className="notification-section">
        <h1 className="section-title">My Notifications</h1>
        <small className="small">
          Notifications about request to join your organization, events and other activities appear here.
        </small>
        <div className="list-of-notifications">
          {/* request */}
          <div className="notify-item">
            <div className="content">
              <Image className="img" src="/images/Get-Close.png" width={80} height={80} alt="" />
              <div className="text">
                <h1 className="">Paul Chidiadi</h1>
                <p>wants to join your organization</p>
                <small>paulchidiadi@gmail.com</small>
              </div>
            </div>
            <div className="actions">
              <button className="btn ignore" onClick={() => router.push('/')}>
                ignore
              </button>
              <button className="btn" onClick={() => router.push('/')}>
                accept
              </button>
            </div>
          </div>
          {/* confirmation */}
          <div className="notify-item">
            <div className="content">
              <Image className="img" src="/images/answer-chat-in-mobile-c.png" width={80} height={80} alt="" />
              <div className="text">
                <h1 className="">Kevin Lance</h1>
                <p>has accepted your your invite to join your organization</p>
                <small>kevinlance@gmail.com is now a member of your organizattion</small>
              </div>
            </div>
          </div>
        </div>

        {/* when notification list is empty */}
        <div className="empty-list">
          <i className="bx bxs-binoculars bx-tada"></i>
          <small>
            You do not
            <br />
            have any notifications yet
          </small>
        </div>
      </div>
    </section>
  );
}
