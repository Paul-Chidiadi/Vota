"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useGetAllOrganizationQuery } from "../../../../store/api/api.js";
import { getDataFromLocalStorage } from "../../../../utils/localStorage";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const userId = getDataFromLocalStorage("id");

  const {
    data: listData,
    isLoading: listIsLoading,
    error: listError,
  } = useGetAllOrganizationQuery();
  const listOfOrganizations = listData?.data;

  //SEARCH FOR ORGANIZATION BY NAME
  const searchResult =
    listOfOrganizations &&
    listOfOrganizations.filter((item) => {
      return item.companyName.toLowerCase().includes(query.toLowerCase());
    });

  return (
    <section className="org-main-page">
      <div className="notification-section">
        <h1 className="section-title">Your Search Result</h1>
        <small className="small">Click join and request to become a member</small>
        {/* LIST OF ORGANIZATION IN SEARCH IN SEARCH */}
        {listIsLoading ? (
          // IF FETCH IS STILL LOADING
          <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
        ) : listError ? (
          //IF THEIR IS AN ERROR FETCHING
          <>
            <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
            <small style={{ color: "var(--cool-gray-80)" }}>NetworkError</small>
          </>
        ) : searchResult && searchResult.length !== 0 ? (
          <div className="list-of-notifications">
            {searchResult &&
              searchResult.map((item) => {
                return (
                  <div className="notify-item" key={item._id}>
                    <div className="content">
                      <Image
                        className="img prof"
                        src={`https://vota.onrender.com/${item.logo}`}
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
                      {item.members.length === 0 ||
                      item.members.some((mem) => mem._id !== userId) ? (
                        <button className="btn" onClick={() => {}}>
                          join
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="empty-list">
            <i className="bx bxs-binoculars bx-tada"></i>
            <small>
              Your search does not exist <br /> Please try again
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
                      src={`https://vota.onrender.com/${item.logo}`}
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
                    {item.members.length === 0 || item.members.some((mem) => mem._id !== userId) ? (
                      <button className="btn" onClick={() => {}}>
                        join
                      </button>
                    ) : (
                      ""
                    )}
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
