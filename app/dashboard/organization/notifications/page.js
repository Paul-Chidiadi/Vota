"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ref, onChildAdded } from "firebase/database";
import firebaseDB from "../../../../utils/firebase";
import { getDataFromLocalStorage } from "../../../../utils/localStorage";
import { useSendDataMutation } from "../../../../store/api/api.js";
import Notification from "../../../../components/global/Notification.js";

export default function Page() {
  const router = useRouter();
  const userId = getDataFromLocalStorage("id");
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });
  //RETURN DATA THAT BELONGS TO THIS USER AND THAT HAS NOT BEEN SETTLED
  const filteredData = data
    .filter((item) => {
      return (
        item.isSettled === false &&
        item.notificationType !== "Edit Event" &&
        item.notificationType !== "Cancel Event" &&
        item.notificationType !== "Create Event" &&
        (item.recipientId === userId || item.recipientId === "undefined")
      );
    })
    .reverse();

  const [action, { isLoading, reset }] = useSendDataMutation();

  //IGNORE REQUEST
  async function ignore(id) {
    const request = await action({
      url: `organization/ignoreRequest/${id}`,
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

  //ACCEPT REQUEST
  async function accept(id) {
    const request = await action({
      url: `organization/acceptRequest/${id}`,
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

  useEffect(() => {
    const notificationsRef = ref(firebaseDB, "notifications");

    const notificationsAddedListener = onChildAdded(notificationsRef, (snapshot) => {
      const notificationData = snapshot.val();
      setData((prevData) => {
        return [...prevData, notificationData];
      });
    });
    return () => {
      notificationsAddedListener();
    };
  }, []);

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
        <h1 className="section-title">My Notifications</h1>
        <small className="small">
          Notifications about request to join your organization, events and other activities appear
          here.
        </small>
        {data.length === 0 ? (
          <div className="empty-list" style={{ height: "250px" }}>
            <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="empty-list" style={{ height: "250px" }}>
            <i className="bx bxs-binoculars bx-tada"></i>
            <small>
              You do not
              <br />
              have any notifications yet
            </small>
          </div>
        ) : (
          <div className="list-of-notifications">
            {filteredData.map((item, index) => {
              return item.notificationType === "Join Organization Request" ? (
                <div className="notify-item" key={index}>
                  <div className="content">
                    <Image
                      className="img prof"
                      src={`https://vota.onrender.com/${item.senderId.image}`}
                      width={80}
                      height={80}
                      alt={item.senderId.name && item.senderId.name[0] + item.senderId.name[1]}
                      onClick={() =>
                        router.push(`/dashboard/organization/elect?id=${item?.senderId.id}`)
                      }
                    />
                    <div className="text">
                      <h1
                        onClick={() =>
                          router.push(`/dashboard/organization/elect?id=${item?.senderId.id}`)
                        }>
                        {item?.senderId?.name}
                      </h1>
                      <p>{item.notificationMessage}</p>
                      <small>{item?.senderId?.email}</small>
                    </div>
                  </div>
                  <div className="actions">
                    <button
                      className="btn ignore"
                      disabled={isLoading ? true : false}
                      onClick={() => ignore(item.id)}>
                      {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "ignore"}
                    </button>
                    <button
                      className="btn"
                      disabled={isLoading ? true : false}
                      onClick={() => accept(item.id)}>
                      {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "accept"}
                    </button>
                  </div>
                </div>
              ) : item.notificationType === "Accept Request" ? (
                <div className="notify-item" key={index}>
                  <div className="content">
                    <Image
                      className="img prof"
                      src={`https://vota.onrender.com/${item.senderId.image}`}
                      width={80}
                      height={80}
                      alt={item.senderId.name && item.senderId.name[0] + item.senderId.name[1]}
                      onClick={() =>
                        router.push(`/dashboard/organization/elect?id=${item?.senderId.id}`)
                      }
                    />
                    <div className="text">
                      <h1
                        onClick={() =>
                          router.push(`/dashboard/organization/elect?id=${item?.senderId.id}`)
                        }>
                        {item?.senderId?.name}
                      </h1>
                      <p>{item.notificationMessage}</p>
                      <small>{item?.senderId?.email}</small>
                    </div>
                  </div>
                  <div className="actions">
                    {/* <button className="btn ignore" onClick={() => router.push("/")}>
                      ignore
                    </button>
                    <button className="btn" onClick={() => router.push("/")}>
                      accept
                    </button> */}
                  </div>
                </div>
              ) : item.notificationType === "Leave Organization" ? (
                <div className="notify-item" key={index}>
                  <div className="content">
                    <Image
                      className="img prof"
                      src={`https://vota.onrender.com/${item.senderId.image}`}
                      width={80}
                      height={80}
                      alt={item.senderId.name && item.senderId.name[0] + item.senderId.name[1]}
                      onClick={() =>
                        router.push(`/dashboard/organization/elect?id=${item?.senderId.id}`)
                      }
                    />
                    <div className="text">
                      <h1
                        onClick={() =>
                          router.push(`/dashboard/organization/elect?id=${item?.senderId.id}`)
                        }>
                        {item?.senderId?.name}
                      </h1>
                      <p>{item.notificationMessage}</p>
                      <small>{item?.senderId?.email}</small>
                    </div>
                  </div>
                  <div className="actions">
                    {/* <button className="btn ignore" onClick={() => router.push("/")}>
                      ignore
                    </button>
                    <button className="btn" onClick={() => router.push("/")}>
                      accept
                    </button> */}
                  </div>
                </div>
              ) : (
                ""
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
