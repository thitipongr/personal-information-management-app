"use client";

import React, { useEffect, useState } from "react";
import AddEventModal from "../components/AddEventModal";
const mockJournal = [
  {
    title: "1",
    date: 1707350400000,
    description: "des#1",
  },
  {
    title: "2",
    date: 1707350400000,
    description: "des#2",
  },
];

const Page = () => {
  // Schedule
  const [showAddingModal, setShowAddingModal] = useState(false);
  const sendDataToAddingModal = {
    allDay: true,
    startStr: new Date().toLocaleDateString("en-CA"),
    endStr: new Date(
      new Date().setDate(new Date().getDate() + 1)
    ).toLocaleDateString("en-CA"),
  };
  const [calendarEvents, setCalendarEvents] = useState(
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("calendarEvents") || "[{}]")
      : [{}]
  );

  //Journal
  const [journalEvents, setJournalEvents] = useState([{}]);

  useEffect(() => {
    setJournalEvents(
      JSON.parse(localStorage.getItem("journalEvents") || "[{}]")
    );
  }, []);

  return (
    <div>
      <div id="add-journal">
        <button
          className="w-full bg-gray-200 rounded-lg p-2 font-bold"
          onClick={() => setShowAddingModal(true)}
        >
          Add Journal
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6 grid-rows-4 gap-4">
        {Object.keys(journalEvents[0]).length
          ? journalEvents.map(
              (
                object: {
                  date?: number;
                  title?: string;
                  description?: string;
                },
                index?: number
              ) => {
                return (
                  <div
                    key={index}
                    className="w-full rounded-lg pb-2 border space-y-1"
                  >
                    <div className="border-b px-2 py-2 bg-gray-100">
                      {new Date(object.date || 0).toLocaleString("sv-SE")}
                    </div>
                    <div className="w-full p-2">
                      <div className="font-bold truncate">{object.title}</div>
                      <div className="truncate">{object.description}</div>
                    </div>
                  </div>
                );
              }
            )
          : null}
      </div>

      {showAddingModal ? (
        <AddEventModal
          setShowModal={setShowAddingModal}
          getDataToModal={sendDataToAddingModal}
          defaultCheckId={"Journal"}
          calendarEvents={calendarEvents}
          setCalendarEvents={setCalendarEvents}
          journalEvents={journalEvents}
          setJournalEvents={setJournalEvents}
        />
      ) : null}
    </div>
  );
};

export default Page;
