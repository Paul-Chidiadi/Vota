'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

export default function Page() {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  return (
    <section className="elector-main-page">
      {/* top section */}
      <div className="elector-top-section">
        <div className="ad-section">
          <div className="divide">
            <div className="col">
              <h1>Let's get you started on VOTA</h1>
              <p>
                Welcome to our vibrant community! Engage in dynamic poll events, become a part of an organization,
                explore ongoing and upcoming activities. Dive into the exciting world of participation and discovery.
                Join us on this journey where your voice matters, connections thrive, and the future unfolds. Start
                exploring now!
              </p>
              <Link className="btn links" href="/signup">
                Explore Vota
              </Link>
            </div>
            <div className="col-2">
              <Image
                className="img"
                src="/images/answer-chat-in-mobile-c.png"
                width={200}
                height={200}
                alt="Get-in-Front"
              />
            </div>
          </div>
          {/* SEARCH SECTION */}
          <div className="nav-search">
            <i
              className="bx bx-search"
              onClick={() => (searchText !== '' ? router.push(`/dashboard/elector/list?q=${searchText}`) : '')}
            ></i>
            <input
              type="text"
              placeholder="Search for organizations..."
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="ongoing-event">
          <div className="ongoing-top">
            <h4>Ongoing Events</h4>
            <i className="bx bx-poll bx-rotate-270"></i>
          </div>
          {/* LIST OF EVENTS */}
          <div className="event-list">
            {/* when event list is full */}
            <div className="event-item">
              <div className="event-org">
                <small>Axelrod Capitol</small>
                <i className="bx bxs-circle"></i>
              </div>
              <div className="event-name">
                <i className="bx bx-dots-vertical-rounded"></i>
                <h5>2023/2024 Election 6</h5>
              </div>
            </div>
            <div className="event-item">
              <div className="event-org">
                <small>Axelrod Capitol</small>
                <i className="bx bxs-circle"></i>
              </div>
              <div className="event-name">
                <i className="bx bx-dots-vertical-rounded"></i>
                <h5>2023/2024 Election 6</h5>
              </div>
            </div>
            {/* when event list is empty */}
            <div className="empty-list">
              <i className="bx bxs-binoculars bx-tada"></i>
              <small>
                You have <br /> no ongoing event
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* list of organization section */}
      <div className="elector-body-section"></div>
    </section>
  );
}
