'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Events from '/components/global/Events.js';
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
              <Link className="btn links" href="#orgss">
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
        {/* ongoing events section */}
        <Events />
      </div>

      {/* list of organization section */}
      <div className="elector-body-section" id="orgss">
        <h1 className="section-title">Organizations</h1>
        <small>
          These organizations use vota for their poll processes. You can view these organizations, their public poll
          events, request to join organizations which you belong to and follow up with their poll events.
        </small>
        <div className="list-of-orgs">
          <div className="list-cards" onClick={() => router.push('/')}>
            <Image className="img" src="/images/icon.png" width={65} height={65} alt="Get-in-Front" />
            <div>
              <h4>Axelrod Capitol</h4>
              <small>
                axelrod@gmail.com
                <i className="bx bx-poll">
                  {' '}
                  <span>10</span>
                </i>
              </small>
            </div>
          </div>
          <div className="list-cards" onClick={() => router.push('/')}>
            <Image className="img" src="/images/logo.png" width={65} height={65} alt="Get-in-Front" />
            <div>
              <h4>Wryte</h4>
              <small>
                wryte@gmail.com
                <i className="bx bx-poll">
                  {' '}
                  <span>9</span>
                </i>
              </small>
            </div>
          </div>
          <div className="list-cards" onClick={() => router.push('/')}>
            <Image className="img" src="/images/pay_logo.png" width={65} height={65} alt="Get-in-Front" />
            <div>
              <h4>Paystack</h4>
              <small>
                paystack@gmail.com
                <i className="bx bx-poll">
                  {' '}
                  <span>13</span>
                </i>
              </small>
            </div>
          </div>
          <div className="list-cards" onClick={() => router.push('/')}>
            <Image className="img" src="/images/rbicon.png" width={65} height={65} alt="Get-in-Front" />
            <div>
              <h4>RB properties</h4>
              <small>
                rbproperties@gmail.com
                <i className="bx bx-poll">
                  {' '}
                  <span>7</span>
                </i>
              </small>
            </div>
          </div>
          <div className="list-cards" onClick={() => router.push('/')}>
            <Image className="img" src="/images/icon2.jpg" width={65} height={65} alt="Get-in-Front" />
            <div>
              <h4>Pointa</h4>
              <small>
                pointapointa@gmail.com
                <i className="bx bx-poll">
                  {' '}
                  <span>20</span>
                </i>
              </small>
            </div>
          </div>
          <div className="list-cards" onClick={() => router.push('/')}>
            <Image className="img" src="/images/VOG.png" width={65} height={65} alt="Get-in-Front" />
            <div>
              <h4>VOG</h4>
              <small>
                vogigal@gmail.com
                <i className="bx bx-poll">
                  {' '}
                  <span>5</span>
                </i>
              </small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
