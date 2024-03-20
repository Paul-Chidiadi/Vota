"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "./orgpage.css";
import { useRouter, useSearchParams } from "next/navigation";
import Notification from "../../components/global/Notification.js";
import {
  useGetElectorQuery,
  useGetOrganizationQuery,
  useSendDataMutation,
} from "../../store/api/api.js";
import { getDataFromLocalStorage } from "../../utils/localStorage";

const Orgpage = ({ userRole }) => {
  const [ongoing, setOngoing] = useState(true);
  const [pub, setPub] = useState(false);
  const [future, setFuture] = useState(false);
  const [history, setHistory] = useState(false);
  const myElementRef = useRef(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = String(searchParams.get("id"));
  const userId = getDataFromLocalStorage("id");
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });

  //IF USER IS ELECTOR THEN WE ARWE FETCHING ORGANIZATION DATA ELSE WE ARE FETCHING ELECTOR DATA
  const {
    data: userData,
    isLoading: userIsLoading,
    error: userError,
  } = userRole === "elector" ? useGetOrganizationQuery(id) : useGetElectorQuery(id);
  const user = userRole === "elector" ? userData?.data?.organization : userData?.data?.elector;
  const events = userRole === "elector" ? userData?.data?.arrayOfEvents : "";
  const organizationList = userRole === "elector" ? "" : userData?.data?.elector?.organizations;

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

  //REQUEST TO REMOVE A MEMBER
  async function removeMember(inviteId) {
    const request = await makeRequest({
      url: `organization/removeMember/${inviteId}`,
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
    <>
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

      {userRole === "elector" ? (
        <>
          {/* top section for elector */}
          {userIsLoading ? (
            <div className="org-single-top">
              <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
            </div>
          ) : userError ? (
            <div className="org-single-top">
              <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
              <small style={{ color: "var(--cool-gray-80)" }}>NetworkError</small>
            </div>
          ) : (
            <div className="org-single-top">
              <Image
                className="img prof"
                src={
                  user && (user?.logo === undefined || user?.logo === "nil")
                    ? "/images/profile.jpeg"
                    : `https://vota.onrender.com/${user && user.logo}`
                }
                width={50}
                height={50}
                alt={user && user.companyName ? user.companyName[0] + user.companyName[1] : ""}
              />
              <div className="parted">
                <h1>{user && user.companyName}</h1>
                <small>{user && user.email}</small>
                <p>
                  <i className="bx bx-poll"></i> <span>20</span> events conducted
                </p>
                <p>
                  <i className="bx bx-poll"></i> <span>5</span> events ongoing
                </p>
                {user.members.length === 0 || user.members.some((mem) => mem._id !== userId) ? (
                  <button
                    className="btn"
                    disabled={isLoading ? true : false}
                    onClick={() => joinOrganization(user._id)}>
                    {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "JOIN"}
                  </button>
                ) : (
                  <button
                    className="btn"
                    disabled={isLoading ? true : false}
                    onClick={() => leaveOrganization(user._id)}>
                    {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "LEAVE"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* body section for elector */}
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
                  pub
                    ? { fontWeight: "bold", color: "black", borderBottom: "3px solid orange" }
                    : {}
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
                  future
                    ? { fontWeight: "bold", color: "black", borderBottom: "3px solid orange" }
                    : {}
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
                  {userIsLoading ? (
                    // IF FETCH IS STILL LOADING
                    <div className="empty-list" style={{ height: "250px" }}>
                      <i
                        className="bx bx-loader-alt bx-spin"
                        style={{ color: "var(--cool-gray-60)" }}></i>
                    </div>
                  ) : userError ? (
                    //IF THEIR IS AN ERROR FETCHING
                    <div className="empty-list" style={{ height: "250px" }}>
                      <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
                      <small>NetworkError</small>
                    </div>
                  ) : events &&
                    events.length !== 0 &&
                    events.some((item) => item.status === "ongoing") ? (
                    events.map((item) => {
                      //if events are ongoing then display them
                      return item.status === "ongoing" ? (
                        <div
                          key={item._id}
                          className="event-item"
                          onClick={() =>
                            router.push(`/dashboard/elector/singleevent?id=${item._id}`)
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
                        Organization has <br /> no ongoing event
                      </small>
                    </div>
                  )}
                </div>
              </div>

              {/* PUBLIC */}
              <div className="slide">
                <div className="event-list">
                  {/* checking if data exists */}
                  {userIsLoading ? (
                    // IF FETCH IS STILL LOADING
                    <div className="empty-list" style={{ height: "250px" }}>
                      <i
                        className="bx bx-loader-alt bx-spin"
                        style={{ color: "var(--cool-gray-60)" }}></i>
                    </div>
                  ) : userError ? (
                    //IF THEIR IS AN ERROR FETCHING
                    <div className="empty-list" style={{ height: "250px" }}>
                      <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
                      <small>NetworkError</small>
                    </div>
                  ) : events &&
                    events.length !== 0 &&
                    events.some((item) => item.isPublic === true) ? (
                    events.map((item) => {
                      //if events are public then display them
                      return item.isPublic === true ? (
                        <div
                          key={item._id}
                          className="event-item"
                          onClick={() =>
                            router.push(`/dashboard/elector/singleevent?id=${item._id}`)
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
                        Organization has <br /> no public event
                      </small>
                    </div>
                  )}
                </div>
              </div>

              {/* FUTURE */}
              <div className="slide">
                <div className="event-list">
                  {/* checking if data exists */}
                  {userIsLoading ? (
                    // IF FETCH IS STILL LOADING
                    <div className="empty-list" style={{ height: "250px" }}>
                      <i
                        className="bx bx-loader-alt bx-spin"
                        style={{ color: "var(--cool-gray-60)" }}></i>
                    </div>
                  ) : userError ? (
                    //IF THEIR IS AN ERROR FETCHING
                    <div className="empty-list" style={{ height: "250px" }}>
                      <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
                      <small>NetworkError</small>
                    </div>
                  ) : events &&
                    events.length !== 0 &&
                    events.some((item) => item.status === "future") ? (
                    events.map((item) => {
                      //if events are future then display them
                      return item.status === "future" ? (
                        <div
                          key={item._id}
                          className="event-item"
                          onClick={() =>
                            router.push(`/dashboard/elector/singleevent?id=${item._id}`)
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
                        Organization has <br /> no ongoing event
                      </small>
                    </div>
                  )}
                </div>
              </div>

              {/* HISTORY */}
              <div className="slide">
                <div className="event-list">
                  {/* checking if data exists */}
                  {userIsLoading ? (
                    // IF FETCH IS STILL LOADING
                    <div className="empty-list" style={{ height: "250px" }}>
                      <i
                        className="bx bx-loader-alt bx-spin"
                        style={{ color: "var(--cool-gray-60)" }}></i>
                    </div>
                  ) : userError ? (
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
                            router.push(`/dashboard/elector/singleevent?id=${item._id}`)
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
                        Organization has <br /> no ongoing event
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* top section for organization */}
          {userIsLoading ? (
            <div className="org-single-top">
              <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
            </div>
          ) : userError ? (
            <div className="org-single-top">
              <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
              <small style={{ color: "var(--cool-gray-80)" }}>NetworkError</small>
            </div>
          ) : (
            <div className="org-single-top">
              <Image
                className="img prof"
                src={
                  user && (user?.displayPicture === undefined || user?.displayPicture === "nil")
                    ? "/images/profile.jpeg"
                    : `https://vota.onrender.com/${user && user.displayPicture}`
                }
                width={50}
                height={50}
                alt={user && user.fullName ? user.fullName[0] + user.fullName[1] : ""}
              />
              <div className="parted">
                <h1>{user && user.fullName}</h1>
                <small>{user && user.email}</small>
                <p>
                  <i className="bx bx-poll"></i> <span>20</span> events conducted
                </p>
                <p>
                  <i className="bx bx-poll"></i> <span>5</span> events ongoing
                </p>
                {user.organizations.length === 0 ||
                user.organizations.some((mem) => mem._id !== userId) ? (
                  <button
                    className="btn"
                    disabled={isLoading ? true : false}
                    onClick={() => inviteMember(user._id)}>
                    {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "invite"}
                  </button>
                ) : (
                  <button
                    className="btn"
                    disabled={isLoading ? true : false}
                    onClick={() => removeMember(user._id)}>
                    {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "remove"}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* body section for organization */}
          <div className="elector-body-section" id="orgss">
            <h1 className="section-title">Member's Organizations</h1>
            <small>This elector is a member of the following organizations</small>

            {/* list of organization section */}
            {userIsLoading ? (
              // IF FETCH IS STILL LOADING
              <div className="empty-list" style={{ height: "250px" }}>
                <i
                  className="bx bx-loader-alt bx-spin"
                  style={{ color: "var(--cool-gray-60)" }}></i>
              </div>
            ) : userError ? (
              //IF THEIR IS AN ERROR FETCHING
              <div className="empty-list" style={{ height: "250px" }}>
                <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
                <small style={{ color: "var(--cool-gray-80)" }}>NetworkError</small>
              </div>
            ) : organizationList && organizationList.length !== 0 ? (
              <div className="list-of-orgs">
                {organizationList.map((item) => {
                  return (
                    <div className="list-cards" key={item._id}>
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
              // when member's organization list is empty
              <div className="empty-list organ">
                <i className="bx bxs-binoculars bx-tada"></i>
                <small>
                  This user has not
                  <br /> joined any organization yet
                </small>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Orgpage;
