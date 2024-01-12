"use client";
import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import "../../../../components/global/orgpage.css";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
  const [event, setEvent] = useState({
    status: "future",
    eventType: "Poll",
  });
  const router = useRouter();

  //FAKE DATA TO LOOP THROUGH
  const positions = ["king", "queen"];
  const candidates = [
    { name: "paul", position: "king" },
    { name: "Dan", position: "king" },
    { name: "shedy", position: "king" },
    { name: "chris", position: "king" },
    { name: "joy", position: "queen" },
    { name: "ada", position: "queen" },
    { name: "esther", position: "queen" },
    { name: "fatima", position: "queen" },
  ];
  //FAKE DATA TO LOOP THROUGH

  const title =
    event.eventType === "Poll"
      ? event.status === "future"
        ? "Poll Questions"
        : "Poll Results"
      : event.status === "future"
      ? "Election"
      : "Election Results";

  return (
    <section className="org-main-page">
      {/* top section */}
      <div className="org-single-top">
        <div className="parted">
          <h1>Pointa Axelrod Capitol</h1>
          <small>pointa@gmail.com</small>
          <p>
            <i className="bx bxs-award"></i> Event Name
          </p>
          <p>
            <i className="bx bx-time"></i> Event Schedule
          </p>
          <p>
            <i className="bx bx-poll"></i>{" "}
            <span>
              {event.status === "future"
                ? "Pending"
                : event.status === "ongoing"
                ? "Ongoing"
                : "Completed"}
            </span>
          </p>
          {event.status === "future" ? (
            // if events status is future show nothing
            ""
          ) : event.status === "ongoing" ? (
            <button className="btn" onClick={() => {}}>
              VOTE
            </button>
          ) : (
            // if events status is history show nothing
            ""
          )}
        </div>
      </div>

      {/* body section */}
      <div className="org-single-body">
        <h4 style={{ marginBottom: "10px" }}>{title}</h4>
        {event.eventType === "Poll" ? (
          <div className="poll-view">
            <div>
              <h6>Scientist should be paid above $5000</h6>
              <h1> {event.status === "future" ? "..." : 23}</h1>
            </div>
            <div>
              <h6>Scientist should be paid below $5000</h6>
              <h1> {event.status === "future" ? "..." : "19"}</h1>
            </div>
            <div>
              <h6>Scientist should be paid only $5000</h6>
              <h1> {event.status === "future" ? "..." : 70}</h1>
            </div>
          </div>
        ) : (
          <div className="election-view">
            {positions.map((item) => {
              return (
                <div className="result-display" key={uuidv4()}>
                  <h5>{item}</h5>
                  <div className="card-body">
                    {candidates.map((cand) => {
                      return cand.position === item ? (
                        <div className="candidate-card" key={uuidv4()}>
                          <Image
                            className="cand-pic"
                            src="/images/Get-Close.png"
                            width={60}
                            height={60}
                            alt="vog"
                          />
                          <h1>{cand.name}</h1>
                          <small>pointa@gmail.com</small>
                          <h4>{event.status === "future" ? "..." : "60"}</h4>
                        </div>
                      ) : (
                        ""
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Page;
