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
        <h1 className="section-title">Search for Members</h1>
        <small className="small">Click add and invite them to join your organization </small>
        {/* LIST OF MEMBERS IN SEARCH */}
        <div className="list-of-notifications">
          <div className="notify-item">
            <div className="content">
              <Image
                className="img"
                src="/images/Get-Close.png"
                width={80}
                height={80}
                alt="image"
                onClick={() => router.push('/dashboard/organization/elect')}
              />
              <div className="text">
                <h1 onClick={() => router.push('/dashboard/organization/elect')}>Paul Chidiadi</h1>
                <small>paulchidiadi@gmail.com</small>
              </div>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => {}}>
                invite
              </button>
            </div>
          </div>
          <div className="notify-item">
            <div className="content">
              <Image
                className="img"
                src="/images/answer-chat-in-mobile-c.png"
                width={80}
                height={80}
                alt="image"
                onClick={() => router.push('/dashboard/organization/elect')}
              />
              <div className="text">
                <h1 onClick={() => router.push('/dashboard/organization/elect')}>Kevin Lance</h1>
                <small>kevinlance@gmail.com</small>
              </div>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => {}}>
                invite
              </button>
            </div>
          </div>
        </div>

        {/* when search is not found */}
        <div className="empty-list">
          <i className="bx bxs-binoculars bx-tada"></i>
          <small>
            Your search does not exist <br /> Please try again
          </small>
        </div>
      </div>
    </section>
  );
}
