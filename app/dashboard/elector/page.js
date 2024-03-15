"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Events from "/components/global/Events.js";
import React, { useState, useEffect } from "react";
import { useGetElectorQuery, useGetAllOrganizationQuery } from "../../../store/api/api.js";
import { getDataFromLocalStorage } from "../../../utils/localStorage";

export default function Page() {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const userId = getDataFromLocalStorage("id");

  const {
    data: electorData,
    isLoading: electorIsLoading,
    error: electorError,
  } = useGetElectorQuery(userId);
  const electorsOrganizations = electorData?.data?.elector?.organizations;
  const electorsEvents = electorData?.data?.eventData;

  const {
    data: listData,
    isLoading: listIsLoading,
    error: listError,
  } = useGetAllOrganizationQuery();
  const listOfOrganizations = listData?.data;

  return (
    <section className="elector-main-page">
      {/* top section */}
      <div className="elector-top-section">
        <div className="ad-section">
          <div className="divide">
            <div className="col">
              <h1>Let's get you started on VOTA</h1>
              <p>
                Welcome to our vibrant community! Engage in dynamic poll events, become a part of an
                organization, explore ongoing and upcoming activities. Dive into the exciting world
                of participation and discovery. Join us on this journey where your voice matters,
                connections thrive, and the future unfolds. Start exploring now!
              </p>
              <Link className="btn links" href="#orgss">
                Explore Vota
              </Link>
            </div>
            <div className="col-2">
              <Image
                className="img"
                src="/images/Get-Close.png"
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
                searchText !== "" ? router.push(`/dashboard/elector/list?q=${searchText}`) : ""
              }></i>
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
        <Events
          data={electorsEvents}
          isLoading={electorIsLoading}
          error={electorError}
          role="elector"
        />
      </div>

      {/* list of organization section */}
      <div className="elector-body-section" id="orgss">
        <h1 className="section-title">Organizations</h1>
        <small>
          These organizations use vota for their poll processes. You can view these organizations,
          their public poll events, request to join organizations which you belong to and follow up
          with their poll events.
        </small>
        {electorIsLoading ? (
          // IF FETCH IS STILL LOADING
          <div className="empty-list" style={{ height: "250px" }}>
            <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
          </div>
        ) : electorError ? (
          //IF THEIR IS AN ERROR FETCHING
          <div className="empty-list" style={{ height: "250px" }}>
            <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
            <small style={{ color: "var(--cool-gray-80)" }}>NetworkError</small>
          </div>
        ) : electorsOrganizations && electorsOrganizations.length !== 0 ? (
          <div className="list-of-orgs">
            {electorsOrganizations.map((item, index) => {
              return (
                <div
                  key={index}
                  className="list-cards"
                  onClick={() => router.push(`/dashboard/elector/orgs?id=${item._id}`)}>
                  <Image
                    className="img list"
                    src={`https://vota.onrender.com/${item.logo}`}
                    width={65}
                    height={65}
                    alt={item.companyName[0] + item.companyName[1]}
                  />
                  <div>
                    <h4>{item.companyName}</h4>
                    <small>
                      {item.email}
                      <i className="bx bx-poll">
                        {" "}
                        <span>{item.companyName[0] + item.companyName[1]}</span>
                      </i>
                    </small>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="empty-list" style={{ height: "250px" }}>
            <i className="bx bxs-binoculars bx-tada"></i>
            <small style={{ color: "var(--cool-gray-80)" }}>
              You have <br /> no organizations yet
            </small>
          </div>
        )}
      </div>

      <div className="notification-section">
        <h1 className="section-title">Organizations You may know</h1>
        <small className="small">Click join and request to become a member</small>
        {/* LIST OF ORGANIZATION IN SEARCH IN SEARCH */}
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
          ) : listOfOrganizations && listOfOrganizations.length !== 0 ? (
            listOfOrganizations.map((item) => {
              return (
                <div className="notify-item" key={item._id}>
                  <div className="content">
                    <Image
                      className="img prof"
                      src={
                        item && (item.logo === undefined || item.logo === "nil")
                          ? "/images/profile.jpeg"
                          : `https://vota.onrender.com/${item.logo}`
                      }
                      width={80}
                      height={80}
                      alt={item.companyName[0] + item.companyName[1]}
                      onClick={() => router.push(`/dashboard/elector/orgs?id=${item._id}`)}
                    />
                    <div className="text">
                      <h1 onClick={() => router.push(`/dashboard/elector/orgs?id=${item._id}`)}>
                        {item.companyName}
                      </h1>
                      <small>{item.email}</small>
                    </div>
                  </div>
                  <div className="actions">
                    {/* {item.members.length === 0 || item.members.some((mem) => mem._id !== userId) ? (
                      <button
                        className="btn"
                        disabled={isLoading ? true : false}
                        onClick={() => joinOrganization(item._id)}>
                        {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "JOIN"}
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
                No organization <br /> available yet
              </small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
