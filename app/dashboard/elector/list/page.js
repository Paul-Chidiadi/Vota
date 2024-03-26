"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useGetAllOrganizationQuery, useSendDataMutation } from "../../../../store/api/api.js";
import { getDataFromLocalStorage } from "../../../../utils/localStorage";
import Notification from "../../../../components/global/Notification.js";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const userId = getDataFromLocalStorage("id");
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });

  const {
    data: listData,
    isLoading: listIsLoading,
    error: listError,
  } = useGetAllOrganizationQuery();
  const listOfOrganizations = listData?.data;

  //SEARCH FOR ORGANIZATION BY NAME
  const searchResult =
    listOfOrganizations &&
    query &&
    listOfOrganizations.filter((item) => {
      return item.companyName.toLowerCase().includes(query.toLowerCase());
    });

  const [makeRequest, { isLoading, reset }] = useSendDataMutation();

  //REQUEST TO JOIN ORGANIZATION
  async function joinOrganization(joinId) {
    const request = await makeRequest({
      url: `elector/joinOrganizationRequest/${joinId}`,
      type: "POST",
    });
    if (request?.data) {
      const { data, message, success } = request?.data;
      setNotification({
        message: message,
        status: "success",
        show: true,
      });
    } else {
      setNotification({
        message: request?.error?.data?.error
          ? request?.error?.data?.error
          : "Check Internet Connection and try again",
        status: "error",
        show: true,
      });
    }
  }

  //REQUEST TO LEAVE ORGANIZATION
  async function leaveOrganization(leaveId) {
    const request = await makeRequest({
      url: `elector/leaveOrganization/${leaveId}`,
      type: "PATCH",
    });
    if (request?.data) {
      const { data, message, success } = request?.data;
      setNotification({
        message: message,
        status: "success",
        show: true,
      });
    } else {
      setNotification({
        message: request?.error?.data?.error
          ? request?.error?.data?.error
          : "Check Internet Connection and try again",
        status: "error",
        show: true,
      });
    }
  }

  return (
    <section className="org-main-page">
      {/* DISPLAY NOTIFICATION TO USER IF IT EXISTS */}
      {notification.show ? (
        <Notification
          status={notification.status}
          message={notification.message}
          switchShowOff={() => {
            setNotification((prev) => {
              return { ...prev, show: false };
            });
          }}
        />
      ) : (
        ""
      )}

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
                      {item.members.length !== 0 && item.members.some((mem) => mem === userId) ? (
                        <button
                          className="btn"
                          disabled={isLoading ? true : false}
                          onClick={() => leaveOrganization(item._id)}>
                          {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "LEAVE"}
                        </button>
                      ) : (
                        <button
                          className="btn"
                          disabled={isLoading ? true : false}
                          onClick={() => joinOrganization(item._id)}>
                          {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "JOIN"}
                        </button>
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
                    {item.members.length !== 0 && item.members.some((mem) => mem === userId) ? (
                      <button
                        className="btn"
                        disabled={isLoading ? true : false}
                        onClick={() => leaveOrganization(item._id)}>
                        {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "LEAVE"}
                      </button>
                    ) : (
                      <button
                        className="btn"
                        disabled={isLoading ? true : false}
                        onClick={() => joinOrganization(item._id)}>
                        {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "JOIN"}
                      </button>
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
