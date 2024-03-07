"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Events = ({ data, isLoading, error, role }) => {
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
          {/* checking if data exists */}
          {isLoading ? (
            // IF FETCH IS STILL LOADING
            <div className="empty-list" style={{ height: "250px" }}>
              <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
            </div>
          ) : error ? (
            //IF THEIR IS AN ERROR FETCHING
            <div className="empty-list" style={{ height: "250px" }}>
              <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
              <small>NetworkError</small>
            </div>
          ) : data && data.length !== 0 && data.some((item) => item.status === "ongoing") ? (
            data.map((item) => {
              //if events are ongoing then display them
              return item.status === "ongoing" ? (
                <div
                  key={item._id}
                  className="event-item"
                  onClick={() =>
                    router.push(
                      `/dashboard/${
                        role === "elector" ? "elector" : "organization"
                      }/singleevent?id=${item._id}`
                    )
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
    </>
  );
};

export default Events;
