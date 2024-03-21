"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../../components/global/orgpage.css";
import { useRouter } from "next/navigation";
import { useGetOrganizationQuery } from "../../../../store/api/api.js";
import { getDataFromLocalStorage } from "../../../../utils/localStorage";

const Orgpage = () => {
  const [ongoing, setOngoing] = useState(true);
  const [pub, setPub] = useState(false);
  const [future, setFuture] = useState(false);
  const [history, setHistory] = useState(false);
  const myElementRef = useRef(null);
  const router = useRouter();
  const userId = getDataFromLocalStorage("id");

  const {
    data: organizationData,
    isLoading: organizationIsLoading,
    error: organizationError,
  } = useGetOrganizationQuery(userId);
  const events = organizationData?.data?.arrayOfEvents;

  //SET CURRENT TIME TO USE FOR CHECKING TIME FOR ONGOING EVENTS
  // Get the current date and time
  const currentDateTime = new Date();

  // Get the TIME part from the current date and time
  const currentDateTimeString = currentDateTime.toISOString();

  return (
    <section className="org-main-page">
      {/* top section */}
      <div className="org-single-top">
        <div className="parted">
          <h1>CREATE NEW EVENT</h1>
          <small>{organizationData?.data?.organization?.email}</small>
          <i
            className="bx bx-plus"
            onClick={() => {
              router.push("/dashboard/organization/newevent");
            }}></i>
        </div>
      </div>

      {/* body section */}
      <div className="org-single-body">
        <div className="navigation">
          <h3
            style={
              ongoing
                ? { fontWeight: "bold", color: "black", borderBottom: "3px solid orange" }
                : {}
            }
            onClick={() => {
              setOngoing(true);
              setPub(false);
              setFuture(false);
              setHistory(false);
              myElementRef.current.style.transform = `translateX(-0%)`;
            }}>
            {" "}
            ONGOING
          </h3>
          <h3
            style={
              pub ? { fontWeight: "bold", color: "black", borderBottom: "3px solid orange" } : {}
            }
            onClick={() => {
              setOngoing(false);
              setPub(true);
              setFuture(false);
              setHistory(false);
              myElementRef.current.style.transform = `translateX(-100%)`;
            }}>
            PUBLIC
          </h3>
          <h3
            style={
              future ? { fontWeight: "bold", color: "black", borderBottom: "3px solid orange" } : {}
            }
            onClick={() => {
              setOngoing(false);
              setPub(false);
              setFuture(true);
              setHistory(false);
              myElementRef.current.style.transform = `translateX(-200%)`;
            }}>
            FUTURE
          </h3>
          <h3
            style={
              history
                ? { fontWeight: "bold", color: "black", borderBottom: "3px solid orange" }
                : {}
            }
            onClick={() => {
              setOngoing(false);
              setPub(false);
              setFuture(false);
              setHistory(true);
              myElementRef.current.style.transform = `translateX(-300%)`;
            }}>
            HISTORY
          </h3>
        </div>

        <div className="slider" id="myElement" ref={myElementRef}>
          {/* ONGOING */}
          <div className="slide">
            <div className="event-list">
              {/* checking if data exists */}
              {organizationIsLoading ? (
                // IF FETCH IS STILL LOADING
                <div className="empty-list" style={{ height: "250px" }}>
                  <i
                    className="bx bx-loader-alt bx-spin"
                    style={{ color: "var(--cool-gray-60)" }}></i>
                </div>
              ) : organizationError ? (
                //IF THEIR IS AN ERROR FETCHING
                <div className="empty-list" style={{ height: "250px" }}>
                  <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
                  <small>NetworkError</small>
                </div>
              ) : events &&
                events.length !== 0 &&
                events.some(
                  (item) => item.status === "ongoing" && item.schedule <= currentDateTimeString
                ) ? (
                events.map((item) => {
                  //if events are ongoing then display them
                  return item.status === "ongoing" && item.schedule <= currentDateTimeString ? (
                    <div
                      key={item._id}
                      className="event-item"
                      onClick={() =>
                        router.push(`/dashboard/organization/singleevent?id=${item._id}`)
                      }>
                      <div className="event-org">
                        <small>{item.schedule}</small>
                        <i className="bx bxs-circle"></i>
                      </div>
                      <div className="event-name">
                        <i className="bx bx-dots-vertical-rounded"></i>
                        <h5>{item.eventName}</h5>
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                })
              ) : (
                <div className="empty-list">
                  <i className="bx bxs-binoculars bx-tada"></i>
                  <small>
                    You have <br /> no ongoing event
                  </small>
                </div>
              )}
            </div>
          </div>

          {/* PUBLIC */}
          <div className="slide">
            <div className="event-list">
              {/* checking if data exists */}
              {organizationIsLoading ? (
                // IF FETCH IS STILL LOADING
                <div className="empty-list" style={{ height: "250px" }}>
                  <i
                    className="bx bx-loader-alt bx-spin"
                    style={{ color: "var(--cool-gray-60)" }}></i>
                </div>
              ) : organizationError ? (
                //IF THEIR IS AN ERROR FETCHING
                <div className="empty-list" style={{ height: "250px" }}>
                  <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
                  <small>NetworkError</small>
                </div>
              ) : events && events.length !== 0 && events.some((item) => item.isPublic === true) ? (
                events.map((item) => {
                  //if events are public then display them
                  return item.isPublic === true ? (
                    <div
                      key={item._id}
                      className="event-item"
                      onClick={() =>
                        router.push(`/dashboard/organization/singleevent?id=${item._id}`)
                      }>
                      <div className="event-org">
                        <small>{item.schedule}</small>
                      </div>
                      <div className="event-name">
                        <i className="bx bx-dots-vertical-rounded"></i>
                        <h5>{item.eventName}</h5>
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                })
              ) : (
                <div className="empty-list">
                  <i className="bx bxs-binoculars bx-tada"></i>
                  <small>
                    You have <br /> no public event
                  </small>
                </div>
              )}
            </div>
          </div>

          {/* FUTURE */}
          <div className="slide">
            <div className="event-list">
              {/* checking if data exists */}
              {organizationIsLoading ? (
                // IF FETCH IS STILL LOADING
                <div className="empty-list" style={{ height: "250px" }}>
                  <i
                    className="bx bx-loader-alt bx-spin"
                    style={{ color: "var(--cool-gray-60)" }}></i>
                </div>
              ) : organizationError ? (
                //IF THEIR IS AN ERROR FETCHING
                <div className="empty-list" style={{ height: "250px" }}>
                  <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
                  <small>NetworkError</small>
                </div>
              ) : events &&
                events.length !== 0 &&
                events.some(
                  (item) =>
                    item.status === "future" ||
                    (item.status === "ongoing" && item.schedule > currentDateTimeString)
                ) ? (
                events.map((item) => {
                  //if events are future then display them
                  return item.status === "future" ||
                    (item.status === "ongoing" && item.schedule > currentDateTimeString) ? (
                    <div
                      key={item._id}
                      className="event-item"
                      onClick={() =>
                        router.push(`/dashboard/organization/singleevent?id=${item._id}`)
                      }>
                      <div className="event-org">
                        <small>{item.schedule}</small>
                      </div>
                      <div className="event-name">
                        <i className="bx bx-dots-vertical-rounded"></i>
                        <h5>{item.eventName}</h5>
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                })
              ) : (
                <div className="empty-list">
                  <i className="bx bxs-binoculars bx-tada"></i>
                  <small>
                    You have <br /> no future event
                  </small>
                </div>
              )}
            </div>
          </div>

          {/* HISTORY */}
          <div className="slide">
            <div className="event-list">
              {/* checking if data exists */}
              {organizationIsLoading ? (
                // IF FETCH IS STILL LOADING
                <div className="empty-list" style={{ height: "250px" }}>
                  <i
                    className="bx bx-loader-alt bx-spin"
                    style={{ color: "var(--cool-gray-60)" }}></i>
                </div>
              ) : organizationError ? (
                //IF THEIR IS AN ERROR FETCHING
                <div className="empty-list" style={{ height: "250px" }}>
                  <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
                  <small>NetworkError</small>
                </div>
              ) : events &&
                events.length !== 0 &&
                events.some((item) => item.status === "history") ? (
                events.map((item) => {
                  //if events are history then display them
                  return item.status === "history" ? (
                    <div
                      className="event-item"
                      key={item._id}
                      onClick={() =>
                        router.push(`/dashboard/organization/singleevent?id=${item._id}`)
                      }>
                      <div className="event-org">
                        <small>{item.schedule}</small>
                      </div>
                      <div className="event-name">
                        <i className="bx bx-dots-vertical-rounded"></i>
                        <h5>{item.eventName}</h5>
                      </div>
                    </div>
                  ) : (
                    ""
                  );
                })
              ) : (
                <div className="empty-list">
                  <i className="bx bxs-binoculars bx-tada"></i>
                  <small>
                    You have <br /> no history event
                  </small>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orgpage;
