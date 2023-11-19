'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './orgpage.css';
import { useRouter } from 'next/navigation';

const Orgpage = () => {
  const [ongoing, setOngoing] = useState(true);
  const [pub, setPub] = useState(false);
  const [future, setFuture] = useState(false);
  const [history, setHistory] = useState(false);
  const myElementRef = useRef(null);
  const router = useRouter();

  return (
    <>
      {/* top section */}
      <div className="org-single-top">
        <Image className="img" src="/images/icon2.jpg" width={150} height={150} alt="vog" />
        <div className="parted">
          <h1>Pointa Axelrod Capitol</h1>
          <small>pointa@gmail.com</small>
          <p>
            <i className="bx bx-poll"></i> <span>20</span> events conducted
          </p>
          <p>
            <i className="bx bx-poll"></i> <span>5</span> events ongoing
          </p>
          <button className="btn" onClick={() => {}}>
            JOIN
          </button>
        </div>
      </div>

      {/* body section */}
      <div className="org-single-body">
        <div className="navigation">
          <h3
            style={ongoing ? { fontWeight: 'bold', color: 'black', borderBottom: '3px solid orange' } : {}}
            onClick={() => {
              setOngoing(true);
              setPub(false);
              setFuture(false);
              setHistory(false);
              myElementRef.current.style.transform = `translateX(-0%)`;
            }}
          >
            {' '}
            ONGOING
          </h3>
          <h3
            style={pub ? { fontWeight: 'bold', color: 'black', borderBottom: '3px solid orange' } : {}}
            onClick={() => {
              setOngoing(false);
              setPub(true);
              setFuture(false);
              setHistory(false);
              myElementRef.current.style.transform = `translateX(-100%)`;
            }}
          >
            PUBLIC
          </h3>
          <h3
            style={future ? { fontWeight: 'bold', color: 'black', borderBottom: '3px solid orange' } : {}}
            onClick={() => {
              setOngoing(false);
              setPub(false);
              setFuture(true);
              setHistory(false);
              myElementRef.current.style.transform = `translateX(-200%)`;
            }}
          >
            FUTURE
          </h3>
          <h3
            style={history ? { fontWeight: 'bold', color: 'black', borderBottom: '3px solid orange' } : {}}
            onClick={() => {
              setOngoing(false);
              setPub(false);
              setFuture(false);
              setHistory(true);
              myElementRef.current.style.transform = `translateX(-300%)`;
            }}
          >
            HISTORY
          </h3>
        </div>

        <div className="slider" id="myElement" ref={myElementRef}>
          {/* ONGOING */}
          <div className="slide">
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
              {/* when event list is empty */}
              <div className="empty-list">
                <i className="bx bxs-binoculars bx-tada"></i>
                <small>No ongoing event</small>
              </div>
            </div>
          </div>

          {/* PUBLIC */}
          <div className="slide">
            <div className="event-list">
              {/* when event list is full */}
              <div className="event-item">
                <div className="event-org">
                  <small>Axelrod Capitol</small>
                  <small>9am. Mon 16th Nov, 2023</small>
                </div>
                <div className="event-name">
                  <i className="bx bx-dots-vertical-rounded"></i>
                  <h5>2023/2024 Election 6</h5>
                </div>
              </div>
              {/* when event list is empty */}
              <div className="empty-list">
                <i className="bx bxs-binoculars bx-tada"></i>
                <small>No Public event</small>
              </div>
            </div>
          </div>

          {/* FUTURE */}
          <div className="slide">
            <div className="event-list">
              {/* when event list is full */}
              <div className="event-item">
                <div className="event-org">
                  <small>Axelrod Capitol</small>
                  <small>9am. Mon 16th Nov, 2023</small>
                </div>
                <div className="event-name">
                  <i className="bx bx-dots-vertical-rounded"></i>
                  <h5>2023/2024 Election 6</h5>
                </div>
              </div>
              {/* when event list is empty */}
              <div className="empty-list">
                <i className="bx bxs-binoculars bx-tada"></i>
                <small>No Future event</small>
              </div>
            </div>
          </div>

          {/* HISTORY */}
          <div className="slide">
            <div className="event-list">
              {/* when event list is full */}
              <div className="event-item">
                <div className="event-org">
                  <small>Axelrod Capitol</small>
                  <small>9am. Mon 16th Nov, 2023</small>
                </div>
                <div className="event-name">
                  <i className="bx bx-dots-vertical-rounded"></i>
                  <h5>2023/2024 Election 6</h5>
                </div>
              </div>
              {/* when event list is empty */}
              <div className="empty-list">
                <i className="bx bxs-binoculars bx-tada"></i>
                <small>No history event</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Orgpage;
