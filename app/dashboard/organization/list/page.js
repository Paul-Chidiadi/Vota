"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useGetAllElectorQuery, useSendDataMutation } from "../../../../store/api/api.js";
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

  const { data: listData, isLoading: listIsLoading, error: listError } = useGetAllElectorQuery();
  const listOfElectors = listData?.data;

  //SEARCH FOR ELECTOR BY NAME
  const searchResult =
    listOfElectors &&
    query &&
    listOfElectors.filter((item) => {
      return item.fullName.toLowerCase().includes(query.toLowerCase());
    });

  const [makeRequest, { isLoading, reset }] = useSendDataMutation();

  //REQUEST TO INVITE A MEMBER
  async function inviteMember(inviteId) {
    const request = await makeRequest({
      url: `organization/addMemberRequest/${inviteId}`,
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
        <h1 className="section-title">Search Result for Members</h1>
        <small className="small">Click add and invite them to join your organization </small>
        {/* LIST OF MEMBERS IN SEARCH */}
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
                            : `https://vota.onrender.com/${item.displayPicture}`
                        }
                        width={80}
                        height={80}
                        alt={item.fullName[0] + item.fullName[1]}
                        onClick={() => router.push(`/dashboard/organization/elect?id=${item._id}`)}
                      />
                      <div className="text">
                        <h1
                          onClick={() =>
                            router.push(`/dashboard/organization/elect?id=${item._id}`)
                          }>
                          {item.fullName}
                        </h1>
                        <small>{item.email}</small>
                      </div>
                    </div>
                    <div className="actions">
                      {item.organizations.length !== 0 &&
                      item.organizations.some((orgs) => orgs === userId) ? (
                        ""
                      ) : (
                        <button
                          className="btn"
                          disabled={isLoading ? true : false}
                          onClick={() => inviteMember(item._id)}>
                          {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "invite"}
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
                    {item.organizations.length !== 0 &&
                    item.organizations.some((orgs) => orgs === userId) ? (
                      ""
                    ) : (
                      <button
                        className="btn"
                        disabled={isLoading ? true : false}
                        onClick={() => inviteMember(item._id)}>
                        {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "invite"}
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
                No elector <br /> available yet
              </small>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
