'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Events from '/components/global/Events.js';
import React, { useState } from 'react';

export default function Page() {
  const router = useRouter();

  return (
    <section className="elector-main-page">
      <div className="my-organization-body">
        <div className="sectioning">
          <h1 className="">My Organizations</h1>
          <small className="small">
            Organizations you belong to show here. You have access to all their activities, and can participate in their
            poll events.
          </small>
          {/* list of organization section */}
          <div className="list-of-orgs sec">
            <div className="list-cards" onClick={() => router.push('/dashboard/elector/orgs')}>
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
            <div className="list-cards" onClick={() => router.push('/dashboard/elector/orgs')}>
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
            <div className="list-cards" onClick={() => router.push('/dashboard/elector/orgs')}>
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
            <div className="list-cards" onClick={() => router.push('/dashboard/elector/orgs')}>
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
            <div className="list-cards" onClick={() => router.push('/dashboard/elector/orgs')}>
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
            <div className="list-cards" onClick={() => router.push('/dashboard/elector/orgs')}>
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
          </div>

          {/* when organization list is empty */}
          <div className="empty-list">
            <i className="bx bxs-binoculars bx-tada"></i>
            <small>
              You have not
              <br /> joined any organization event
            </small>
          </div>
        </div>

        {/* Ongoing items */}
        <Events />
      </div>
    </section>
  );
}
