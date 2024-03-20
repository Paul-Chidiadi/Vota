"use client";
import React, { useState, useEffect } from "react";
import { ref, onChildAdded } from "firebase/database";
import firebaseDB from "../../../../utils/firebase";
import Link from "next/link";
import Image from "next/image";
import "../../../../components/global/orgpage.css";
import { useRouter, useSearchParams } from "next/navigation";
import Notification from "../../../../components/global/Notification.js";
import { useGetEventQuery, useSendDataMutation } from "../../../../store/api/api.js";
import { v4 as uuidv4 } from "uuid";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = String(searchParams.get("id"));
  const [fbData, setFbData] = useState([]);
  const [notification, setNotification] = useState({
    message: "",
    status: "",
    show: false,
  });

  //GET THIS PARTICULAR EVENT FROM FIRBASE DATA BY IT'S
  const particularEvent = fbData.filter((item) => item.id === id);

  //SET CURRENT TIME TO USE FOR CHECKING TIME FOR ONGOING EVENTS
  // Get the current date and time
  const currentDateTime = new Date();

  // Get the TIME part from the current date and time
  const currentDateTimeString = currentDateTime.toISOString();

  const { data: eventData, isLoading: eventIsLoading, error: eventError } = useGetEventQuery(id);
  const event = eventData?.data;

  /* ------------------------RESULT CALCULATIONS------------------------------------- */
  // Check if all objects have the same voteCount value
  const allHaveSameVoteCount =
    event &&
    event.pollQuestions &&
    event.pollQuestions.every((obj) => obj.voteCount === event.pollQuestions[0].voteCount);
  //GET POLLQUESTION WITH HIGHEST VOTES
  const maxPollVote =
    event &&
    event.pollQuestions &&
    event.pollQuestions.reduce((maxObj, currentObj) => {
      return currentObj.voteCount > maxObj.voteCount ? currentObj : maxObj;
    }, event.pollQuestions[0]);
  //GET THE SUM OF ALL VOTES FOR POLLQUESTIONS
  const totalVotes =
    event &&
    event.pollQuestions &&
    event.pollQuestions.reduce((sum, currentObj) => {
      return sum + currentObj.voteCount;
    }, 0);

  // GET RESULTS FOR ELECTION TYPE
  const result = [];
  // Iterate over positions
  event &&
    event.positions.forEach((position) => {
      // Filter objects for the current position
      const positionVotes = event && event.candidates.filter((obj) => obj.runfor === position);

      // Find the object with the highest voteCount for the current position
      const maxVoteObject = positionVotes.reduce((maxObj, currentObj) => {
        return currentObj.voteCount > maxObj.voteCount ? currentObj : maxObj;
      }, positionVotes[0]);

      // Store the result for the current position
      result.push(maxVoteObject);
    });
  //GET THE SUM OF ALL VOTES FOR ELECTION
  const totalElectionVotes =
    event &&
    event.candidates &&
    event.candidates.reduce((sum, currentObj) => {
      return sum + currentObj.voteCount;
    }, 0);
  /* ------------------------RESULT CALCULATIONS------------------------------------- */

  const title =
    event && event.eventType === "Poll"
      ? event && event.status === "future"
        ? "Poll Questions"
        : "Poll Results"
      : event && event.status === "future"
      ? "Election"
      : "Election Results";

  const [vote, { isLoading, reset }] = useSendDataMutation();

  //CAST VOTE
  async function castVote(voteId) {
    const request = await vote({
      url: `elector/vote/${id}`,
      data: event && event.eventType === "Poll" ? { questionId: voteId } : { positionId: voteId },
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
    const eventsRef = ref(firebaseDB, "events");

    const eventsAddedListener = onChildAdded(eventsRef, (snapshot) => {
      const eventData = snapshot.val();
      setFbData((prevData) => {
        return [...prevData, eventData];
      });
    });
    return () => {
      eventsAddedListener();
    };
  }, []);

  return (
    <section className="org-main-page">
      {/* top section */}
      {eventIsLoading ? (
        <div className="org-single-top">
          <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
        </div>
      ) : eventError ? (
        <div className="org-single-top">
          <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
          <small style={{ color: "var(--cool-gray-80)" }}>NetworkError</small>
        </div>
      ) : (
        <div className="org-single-top">
          <div className="parted">
            <h1>{event && event?.owner?.companyName}</h1>
            <small>{event && event?.owner?.email}</small>
            <p>
              <i className="bx bxs-award"></i> {event && event?.eventName}
            </p>
            <p>
              <i className="bx bx-time"></i> {event && event?.schedule}
            </p>
            <p>
              <i className="bx bx-poll"></i>{" "}
              <span>
                {event.status === "future" ||
                (event.status === "ongoing" && event.schedule > currentDateTimeString)
                  ? "Pending"
                  : event.status === "ongoing" && event.schedule <= currentDateTimeString
                  ? "Ongoing"
                  : "Completed"}
              </span>
            </p>
          </div>
        </div>
      )}

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

      {/* body section */}
      <div className="org-single-body">
        {eventIsLoading ? (
          <i className="bx bx-loader-alt bx-spin" style={{ color: "var(--cool-gray-60)" }}></i>
        ) : eventError ? (
          <>
            <i className="bx bx-wifi" style={{ color: "var(--cool-gray-60)" }}></i>
            <small style={{ color: "var(--cool-gray-80)" }}>NetworkError</small>
          </>
        ) : event && event.eventType === "Poll" ? (
          <>
            <h4 style={{ marginBottom: "10px" }}>{title}</h4>
            <div className="poll-view">
              {particularEvent[0] &&
                JSON.parse(particularEvent[0].pollQuestions).map((item) => {
                  return (
                    <div key={item._id}>
                      <h6>{item.question}</h6>
                      <h1>
                        {" "}
                        {(event && event.status === "future") ||
                        (event.status === "ongoing" && event.schedule > currentDateTimeString)
                          ? "..."
                          : item.voteCount}
                      </h1>
                      {event &&
                        event.status === "ongoing" &&
                        event.schedule <= currentDateTimeString && (
                          <button
                            className="vote-btn"
                            disabled={isLoading ? true : false}
                            onClick={() => castVote(item._id)}>
                            {isLoading ? <i className="bx bx-loader-alt bx-spin"></i> : "vote"}
                          </button>
                        )}
                    </div>
                  );
                })}
            </div>
          </>
        ) : (
          <div className="election-view">
            {event &&
              event.positions.map((item) => {
                return (
                  <div className="result-display" key={uuidv4()}>
                    <h5>{item}</h5>
                    <div className="card-body">
                      {event &&
                        event.candidates.map((cand) => {
                          return cand.runfor === item ? (
                            <div className="candidate-card" key={uuidv4()}>
                              <Image
                                className="cand-pic prof"
                                src={
                                  cand &&
                                  (cand?.candidateId?.displayPicture === undefined ||
                                    cand?.candidateId?.displayPicture === "nil")
                                    ? "/images/profile.jpeg"
                                    : `https://vota.onrender.com/${cand?.candidateId?.displayPicture}`
                                }
                                width={60}
                                height={60}
                                alt={
                                  cand?.candidateId
                                    ? `${cand?.candidateId?.fullName[0]}${cand?.candidateId?.fullName[1]}`
                                    : ""
                                }
                              />
                              <h1>{cand?.candidateId?.fullName}</h1>
                              <small>{cand?.candidateId?.email}</small>
                              <h4>{event.status === "future" ? "..." : cand?.voteCount}</h4>
                              {event.status === "ongoing" && (
                                <button
                                  className="vote-btn"
                                  disabled={isLoading ? true : false}
                                  onClick={() => castVote(item._id)}>
                                  {isLoading ? (
                                    <i className="bx bx-loader-alt bx-spin"></i>
                                  ) : (
                                    "vote"
                                  )}
                                </button>
                              )}
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

      {/* THIS SECTION DISPLAYS ONLY WHEN THE STATUS OF THE EVENT IS HISTORY */}
      {event && event.status === "history" ? (
        <div className="org-single-body">
          <h4 style={{ marginBottom: "10px" }}>Final Result</h4>
          <h5>
            Total number of votes: {event.eventType === "Poll" ? totalVotes : totalElectionVotes}
          </h5>
          {event && event.eventType === "Poll" ? (
            allHaveSameVoteCount ? (
              <div className="poll-view">
                <div>
                  <h6>We have a tile. All questions have same votes</h6>
                  <h1>{maxPollVote.voteCount}</h1>
                </div>
              </div>
            ) : (
              <div className="poll-view">
                <div>
                  <h6>{maxPollVote.question}</h6>
                  <h1>{maxPollVote.voteCount}</h1>
                </div>
              </div>
            )
          ) : (
            <div className="election-view">
              <div className="card-body">
                {result &&
                  result.map((item) => {
                    return (
                      <div key={uuidv4()}>
                        <h5>{item.runfor}</h5>
                        <div className="candidate-card" key={uuidv4()}>
                          <Image
                            className="cand-pic prof"
                            src={`https://vota.onrender.com/${item?.candidateId?.displayPicture}`}
                            width={60}
                            height={60}
                            alt={
                              item?.candidateId
                                ? `${item?.candidateId?.fullName[0]}${item?.candidateId?.fullName[1]}`
                                : ""
                            }
                          />
                          <h1>{item?.candidateId?.fullName}</h1>
                          <small>{item?.candidateId?.email}</small>
                          <h4>{event.status === "future" ? "..." : item?.voteCount}</h4>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}
        </div>
      ) : (
        ""
      )}
    </section>
  );
};

export default Page;
