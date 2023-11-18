'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const Events = () => {
  const router = useRouter();

  return (
    <>
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
    </>
  );
};

export default Events;
