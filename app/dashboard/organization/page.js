"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Events from "/components/global/Events.js";
import React, { useState, useEffect } from "react";
import { useGetOrganizationQuery, useGetAllElectorQuery } from "../../../store/api/api.js";
import { getDataFromLocalStorage } from "../../../utils/localStorage";

export default function Page() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const userId = getDataFromLocalStorage("id");

  const {
    data: organizationData,
    isLoading: organizationIsLoading,
    error: organizationError,
  } = useGetOrganizationQuery(userId);
  const organizationsMembers = organizationData?.data?.organization?.members;
  const organizationsEvents = organizationData?.data?.arrayOfEvents;

  const { data: listData, isLoading: listIsLoading, error: listError } = useGetAllElectorQuery();
  const listOfElectors = listData?.data;

  return (
    <section className="org-main-page">
      {/* top section */}
      <div className="elector-top-section">
        <div className="ad-section">
          <div className="divide">
            <div className="col">
              <h1>Let's get you started on VOTA</h1>
              <p>
                Welcome to our vibrant community! Conduct dynamic poll events, manage an
                organization, create ongoing and upcoming poll events. Dive into the exciting world
                of management and discovery where you can set your events public so anyone can view
                and participate. Join us on this journey where individual voices matter, connections
                thrive, and the future unfolds. Start exploring now!
              </p>
              <Link className="btn links" href="#orgss">
                Explore Vota
              </Link>
            </div>
            <div className="col-2">
              <Image
                className="img"
                src="/images/Get-in-Front.png"
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
              onClick={() =>
                searchText !== "" ? router.push(`/dashboard/organization/list?q=${searchText}`) : ""
              }></i>
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
        <Events
          data={organizationsEvents}
          isLoading={organizationIsLoading}
          error={organizationError}
          role="Organization"
        />
      </div>

      {/* list of organization section */}
      <div className="elector-body-section" id="orgss">
        <h1 className="section-title">Members</h1>
        <small>
          People who belong to your organization show here. They have access to all your activities,
          and can participate in your poll events. You can also set your events public so anyone can
          participate or view them.
        </small>
        {organizationIsLoading ? (
          // IF FETCH IS STILL LOADING
          <div className="empty-list" style={{ height: "250px" }}>
            <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
          </div>
        ) : organizationError ? (
          //IF THEIR IS AN ERROR FETCHING
          <div className="empty-list" style={{ height: "250px" }}>
            <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
            <small style={{ color: "var(--cool-gray-80)" }}>NetworkError</small>
          </div>
        ) : organizationsMembers && organizationsMembers.length !== 0 ? (
          <div className="list-of-orgs">
            {organizationsMembers.map((item, index) => {
              return (
                <div
                  key={index}
                  className="member-cards"
                  onClick={() => router.push(`/dashboard/organization/elect?id=${item._id}`)}>
                  <Image
                    className="img list"
                    src={
                      item && (item.logo === undefined || item.logo === "nil")
                        ? "/images/profile.jpeg"
                        : `https://vota.onrender.com/${item.displayPicture}`
                    }
                    width={65}
                    height={65}
                    alt={item && item.fullName[0] + item.fullName[1]}
                  />
                  <div>
                    <h4>{item.fullName}</h4>
                    <small>{item.email}</small>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-list organ">
            <i className="bx bxs-binoculars bx-tada"></i>
            <small>You have no members yet</small>
          </div>
        )}
      </div>

      <div className="notification-section">
        <h1 className="section-title">Members You may know</h1>
        <small className="small">Click add and invite them to join your organization </small>
        {/* LIST OF MEMBERS IN SEARCH */}
        <div className="list-of-notifications">
          {listIsLoading ? (
            // IF FETCH IS STILL LOADING
            <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
          ) : listError ? (
            //IF THEIR IS AN ERROR FETCHING
            <>
              <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
              <small style={{ color: "var(--cool-gray-80)" }}>NetworkError</small>
            </>
          ) : listOfElectors && listOfElectors.length !== 0 ? (
            listOfElectors.map((item) => {
              return (
                <div className="notify-item" key={item._id}>
                  <div className="content">
                    <Image
                      className="img prof"
                      src={
                        item && (item.logo === undefined || item.logo === "nil")
                          ? "/images/profile.jpeg"
                          : `https://vota.onrender.com/${item.displayPicture}`
                      }
                      width={80}
                      height={80}
                      alt={item.fullName[0] + item.fullName[1]}
                      onClick={() => router.push(`/dashboard/organization/elect?id=${item._id}`)}
                    />
                    <div className="text">
                      <h1
                        onClick={() => router.push(`/dashboard/organization/elect?id=${item._id}`)}>
                        {item.fullName}
                      </h1>
                      <small>{item.email}</small>
                    </div>
                  </div>
                  <div className="actions">
                    {/* {item.organizations.length === 0 ||
                    item.organizations.some((orgs) => orgs._id !== userId) ? (
                      <button
                        className="btn"
                        disabled={isLoading ? true : false}
                        onClick={() => inviteMember(item._id)}>
                        {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "invite"}
                      </button>
                    ) : (
                      ""
                    )} */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="empty-list">
              <i className="bx bxs-binoculars bx-tada"></i>
              <small>
                No elector <br /> available yet
              </small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
