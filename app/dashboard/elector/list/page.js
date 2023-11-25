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
        <h1 className="section-title">Search for Organizations</h1>
        <small className="small">Click join and request to become a member</small>
        {/* LIST OF ORGANIZATION IN SEARCH IN SEARCH */}
        <div className="list-of-notifications">
          <div className="notify-item">
            <div className="content">
              <Image
                className="img"
                src="/images/icon2.jpg"
                width={80}
                height={80}
                alt="image"
                onClick={() => router.push('/dashboard/elector/orgs')}
              />
              <div className="text">
                <h1 onClick={() => router.push('/dashboard/elector/orgs')}>Pointa</h1>
                <small>Pointa@gmail.com</small>
              </div>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => {}}>
                join
              </button>
            </div>
          </div>
          <div className="notify-item">
            <div className="content">
              <Image
                className="img"
                src="/images/icon.png"
                width={80}
                height={80}
                alt="image"
                onClick={() => router.push('/dashboard/elector/orgs')}
              />
              <div className="text">
                <h1 onClick={() => router.push('/dashboard/elector/orgs')}>Axelrod Capitol</h1>
                <small>axelrodcapitol@gmail.com</small>
              </div>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => {}}>
                join
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
