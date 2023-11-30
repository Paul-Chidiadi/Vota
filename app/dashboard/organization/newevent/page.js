'use client';
import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import '../../../../components/global/orgpage.css';
import { useRouter } from 'next/navigation';

const page = () => {
  const router = useRouter();
  const myElementRef = useRef(null);
  const [eventDetails, setEventDetails] = useState({
    eventName: '',
    schedule: '',
    public: false,
    eventType: '',
    positions: [],
    candidates: [],
    pollQuestions: [],
  });
  const [slideNum, setSlideNum] = useState(1);

  function nextSlide() {
    if (slideNum < 4) {
      const translateNumber = slideNum * (100 + 6);
      myElementRef.current.style.transform = `translateX(-${translateNumber}%)`;
      setSlideNum((prev) => prev + 1);
    }
  }
  function prevSlide() {
    if (slideNum === 2) {
      myElementRef.current.style.transform = `translateX(-0%)`;
      setSlideNum((prev) => prev - 1);
    } else if (slideNum === 3) {
      myElementRef.current.style.transform = `translateX(-100%)`;
      setSlideNum((prev) => prev - 1);
    } else if (slideNum === 4) {
      myElementRef.current.style.transform = `translateX(-200%)`;
      setSlideNum((prev) => prev - 1);
    }
  }

  //SET EVENT TYPE STATE AND VARIABLES
  const [options, setOptions] = useState([
    {
      id: 1,
      title: 'Poll',
      text: 'Set up Poll where members can choose from different options.',
      image: '/images/Get-Organized.png',
      isSelected: false,
    },
    {
      id: 2,
      title: 'Election',
      text: 'Set up Election where members choose a candidate for different positions',
      image: '/images/Get-in-Front.png',
      isSelected: false,
    },
  ]);
  const [account, setAccount] = useState('');
  const optionElements = options.map((option) => {
    return (
      <div
        className={option.isSelected ? 'col selected' : 'col'}
        key={option.id}
        onClick={() => handleClick(option.id)}
      >
        <div className="circle"></div>
        <Image className="choose-img" src={option.image} alt="image info" width={100} height={70} />
        <h4>{option.text}</h4>
      </div>
    );
  });
  //HANDLE SELECTION FUNCTION
  function handleClick(id) {
    setEventDetails((prev) => {
      return { ...prev, eventType: id === 1 ? 'Poll' : 'Election' };
    });
    setOptions((prev) => {
      return prev.map((item) => {
        return item.id === id ? { ...item, isSelected: true } : { ...item, isSelected: false };
      });
    });
  }

  return (
    <section className="org-main-page">
      <div className="new-event-section" id="myElement" ref={myElementRef}>
        {/* set name section */}
        <div className="flow set-name">
          <div>
            <h3>Set Event Name</h3>
            <input
              type="text"
              name="eventName"
              value={eventDetails.eventName}
              placeholder="Set Name for your event"
              onChange={(e) => {
                setEventDetails((prev) => {
                  return { ...prev, eventName: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <h3>Schedule</h3>
            <input
              type="text"
              name="schedule"
              value={eventDetails.schedule}
              placeholder="Time and Date"
              onChange={(e) => {
                setEventDetails((prev) => {
                  return { ...prev, schedule: e.target.value };
                });
              }}
            />
          </div>
          <div>
            <h3>Do you want this event to be public?</h3>
            <small>
              Events set to public are visible to everyone(this includes people who are not members of your
              Organization). Every user can participate and view your event process when it is live.
            </small>{' '}
            <div className="checkbox">
              <input
                type="checkbox"
                id="isPublic"
                name="public"
                checked={eventDetails.public}
                onChange={(e) => {
                  setEventDetails((prev) => {
                    return { ...prev, public: e.target.checked };
                  });
                }}
              />
              <label htmlFor="isPublic">Yes, I want this Event to be Public</label>
            </div>
          </div>
          <button
            className="btnn"
            onClick={nextSlide}
            style={
              eventDetails.eventName === '' || eventDetails.schedule === ''
                ? { color: 'var(--black-a30)' }
                : { color: 'var(--blue-70)' }
            }
            disabled={eventDetails.eventName === '' || eventDetails.schedule === '' ? true : false}
          >
            NEXT {'>'}
          </button>
        </div>

        {/* set event type section */}
        <div className="flow set-type">
          <h1>Choose Event Type</h1>
          <small>Choose which event type you are creating. Poll event or Election event proper</small>
          <div className="inner-container selected">
            <div className="choose">
              {/* dynamically display options */}
              {optionElements}
            </div>
          </div>
          <div className="actions">
            <button className="btnn" onClick={prevSlide}>
              {'<'} PREV
            </button>
            <button
              className="btnn"
              onClick={nextSlide}
              style={eventDetails.eventType === '' ? { color: 'var(--black-a30)' } : {}}
              disabled={eventDetails.eventType === '' ? true : false}
            >
              NEXT {'>'}
            </button>
          </div>
        </div>
        <div className="flow">three</div>
        <div className="flow">four</div>
      </div>
    </section>
  );
};

export default page;
