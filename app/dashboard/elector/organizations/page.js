"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Events from "/components/global/Events.js";
import React, { useState } from "react";
import { useGetElectorQuery } from "../../../../store/api/api.js";
import { getDataFromLocalStorage } from "../../../../utils/localStorage";

export default function Page() {
  const router = useRouter();
  const userId = getDataFromLocalStorage("id");

  const {
    data: electorData,
    isLoading: electorIsLoading,
    error: electorError,
  } = useGetElectorQuery(userId);
  const electorsOrganizations = electorData?.data?.elector?.organizations;
  const electorsEvents = electorData?.data?.eventData;

  return (
    <section className="elector-main-page">
      <div className="my-organization-body">
        <div className="sectioning">
          <h1 className="">My Organizations</h1>
          <small className="small">
            Organizations you belong to show here. You have access to all their activities, and can
            participate in their poll events.
          </small>
          {/* list of organization section */}
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
              {electorsOrganizations.map((item) => {
                return (
                  <div
                    key={item._id}
                    className="list-cards"
                    onClick={() => router.push(`/dashboard/elector/orgs?id=${item._id}`)}>
                    <Image
                      className="img list"
                      src={
                        item && (item.logo === undefined || item.logo === "nil")
                          ? "/images/profile.jpeg"
                          : `https://vota.onrender.com/${item && item.logo}`
                      }
                      width={65}
                      height={65}
                      alt={
                        item && item.companyName ? item.companyName[0] + item.companyName[1] : ""
                      }
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

        {/* Ongoing items */}
        <Events data={electorsEvents} isLoading={electorIsLoading} error={electorError} />
      </div>
    </section>
  );
}
