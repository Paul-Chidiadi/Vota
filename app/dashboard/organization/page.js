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
    <section className="org-main-page">
      {/* top section */}
      <div className="elector-top-section">
        <div className="ad-section">
          <div className="divide">
            <div className="col">
              <h1>Let's get you started on VOTA</h1>
              <p>
                Welcome to our vibrant community! Conduct dynamic poll events, manage an organization, create ongoing
                and upcoming poll events. Dive into the exciting world of management and discovery where you can set
                your events public so anyone can view and participate. Join us on this journey where individual voices
                matter, connections thrive, and the future unfolds. Start exploring now!
              </p>
              <Link className="btn links" href="#orgss">
                Explore Vota
              </Link>
            </div>
            <div className="col-2">
              <Image className="img" src="/images/Get-in-Front.png" width={200} height={200} alt="Get-in-Front" />
            </div>
          </div>
          {/* SEARCH SECTION */}
          <div className="nav-search">
            <i
              className="bx bx-search"
              onClick={() => (searchText !== '' ? router.push(`/dashboard/organization/list?q=${searchText}`) : '')}
            ></i>
            <input
              type="text"
              placeholder="Search for members..."
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
        <h1 className="section-title">Members</h1>
        <small>
          People who belong to your organization show here. They have access to all your activities, and can participate
          in your poll events. You can also set your events public so anyone can participate or view them.
        </small>
        <div className="list-of-orgs">
          <div className="member-cards">
            <Image className="img" src="/images/Get-Close.png" width={65} height={65} alt="member-pics" />
            <div>
              <h4>Micheal Kate</h4>
              <small>paulchidiadi@gmail.com</small>
            </div>
          </div>
          <div className="member-cards">
            <Image className="img" src="/images/Get-Close.png" width={65} height={65} alt="member-pics" />
            <div>
              <h4>Micheal Kate</h4>
              <small>chidiadinwaokocha@gmail.com</small>
            </div>
          </div>
          <div className="member-cards">
            <Image className="img" src="/images/Get-Close.png" width={65} height={65} alt="member-pics" />
            <div>
              <h4>Micheal Kate</h4>
              <small>michealkate@gmail.com</small>
            </div>
          </div>
          <div className="member-cards">
            <Image className="img" src="/images/Get-Close.png" width={65} height={65} alt="member-pics" />
            <div>
              <h4>Micheal Kate</h4>
              <small>michealkate@gmail.com</small>
            </div>
          </div>
          <div className="member-cards">
            <Image className="img" src="/images/Get-Close.png" width={65} height={65} alt="member-pics" />
            <div>
              <h4>Micheal Kate</h4>
              <small>michealkate@gmail.com</small>
            </div>
          </div>
          <div className="member-cards">
            <Image className="img" src="/images/Get-Close.png" width={65} height={65} alt="member-pics" />
            <div>
              <h4>Micheal Kate</h4>
              <small>michealkate@gmail.com</small>
            </div>
          </div>
          <div className="member-cards">
            <Image className="img" src="/images/Get-Close.png" width={65} height={65} alt="member-pics" />
            <div>
              <h4>Micheal Kate</h4>
              <small>michealkate@gmail.com</small>
            </div>
          </div>
          <div className="member-cards">
            <Image className="img" src="/images/Get-Close.png" width={65} height={65} alt="member-pics" />
            <div>
              <h4>Micheal Kate</h4>
              <small>michealkate@gmail.com</small>
            </div>
          </div>
        </div>
        {/* when members list is empty */}
        {/* <div className="empty-list organ">
          <i className="bx bxs-binoculars bx-tada"></i>
          <small>You have no members added yet</small>
        </div> */}
      </div>
    </section>
  );
}
