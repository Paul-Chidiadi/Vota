'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Page() {
  const router = useRouter();

  return (
    <section className="elector-main-page">
      <div className="notification-section">
        <h1 className="section-title">My Notifications</h1>
        <small className="small">Notifications about invites, events and other activities appear here.</small>
        <div className="list-of-notifications">
          {/* request */}
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
                <p>wants you to join their organization</p>
                <small>pointa@gmail.com</small>
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
          {/* new event */}
          <div className="notify-item">
            <div className="content">
              <Image
                className="img"
                src="/images/logo.png"
                width={80}
                height={80}
                alt="image"
                onClick={() => router.push('/dashboard/elector/orgs')}
              />
              <div className="text">
                <h1 onClick={() => router.push('/dashboard/elector/orgs')}>Wryte</h1>
                <p>New upcoming event created.</p>
                <small>wryte@gmail.com</small>
              </div>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => router.push('/')}>
                view event
              </button>
            </div>
          </div>
          {/* confirmation */}
          <div className="notify-item">
            <div className="content">
              <Image
                className="img"
                src="/images/rbicon.png"
                width={80}
                height={80}
                alt="image"
                onClick={() => router.push('/dashboard/elector/orgs')}
              />
              <div className="text">
                <h1 onClick={() => router.push('/dashboard/elector/orgs')}>RB properties</h1>
                <p>Request to join this organization has been confirmed</p>
                <small>You are now a member of rbproperties@gmail.com</small>
              </div>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => router.push('/')}>
                view details
              </button>
            </div>
          </div>
          {/* reschedule */}
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
                <p>There is a reshedule on an upcoming event.</p>
                <small>axelrodcapitol@gmail.com</small>
              </div>
            </div>
            <div className="actions">
              <button className="btn" onClick={() => router.push('/')}>
                view update
              </button>
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
