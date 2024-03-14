"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { ref, onChildAdded } from "firebase/database";
import firebaseDB from "../../../../utils/firebase";
import { getDataFromLocalStorage } from "../../../../utils/localStorage";

export default function Page() {
  const router = useRouter();
  const userId = getDataFromLocalStorage("id");
  const [data, setData] = useState([]);
  //RETURN DATA THAT BELONGS TO THIS USER AND THAT HAS NOT BEEN SETTLED
  const filteredData = data
    .filter((item) => {
      return (
        item.isSettled === false &&
        (item.recipientId === userId ||
          (item.recipientId === "undefined" && item.notificationType !== "Create Event"))
      );
    })
    .reverse();

  useEffect(() => {
    const notificationsRef = ref(firebaseDB, "notifications");

    const notificationsAddedListener = onChildAdded(notificationsRef, (snapshot) => {
      const notificationData = snapshot.val();
      console.log(snapshot.val());
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
                    <button className="btn ignore" onClick={() => router.push("/")}>
                      ignore
                    </button>
                    <button className="btn" onClick={() => router.push("/")}>
                      accept
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
