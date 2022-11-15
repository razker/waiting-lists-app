import React, { useState } from "react";
import "../App.css";
import Header from "./Header";
import { useEffectOnce } from "usehooks-ts";
import EventsList from "./EventsList/EventsList";
import { Fab, Grid, Typography, useTheme } from "@mui/material";
import { EventsService } from "../services/EventsService";
import RegisterModal from "./RegisterModal/RegisterModal";
import plus from "../static/plus.png";
import AddEventModal from "./AddEventModal/AddEventModal";
import { useTranslation } from "react-i18next";
import { EventData, EventType } from "../global/types";
import dayjs from "dayjs";
import { stringToEventType } from "../global/helpers";
import EventWaitingListModal from "./EventWaitingListModal/EventWaitingListModal";
import { Box } from "@mui/system";

export enum ModalOptions {
  RegisterEvent,
  EventWaitingList,
}

const formatEvents = (events: any) => {
  return events.map((event: any) => ({
    eventDate: dayjs(event.eventDate).format("DD/MM/YYYY"),
    eventType: stringToEventType(event.eventType),
    eventId: event._id,
  }));
};

const Home = () => {
  const [eventsList, setEventsList] = useState<EventData[]>([]);
  const [currentEventData, setCurrentEventData] = useState({
    eventId: "",
    eventTitle: "",
  });
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showEventWaitingListModal, setShowEventWaitingListModal] =
    useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);

  const eventsService = new EventsService();
  const theme = useTheme();
  const { t } = useTranslation();

  const getAllEvents = async () => {
    const events = await eventsService.getEvents();
    setEventsList(formatEvents(events));
  };

  useEffectOnce(() => {
    getAllEvents();
  });

  const eventActionHandler = (
    eventId: string,
    eventTitle: string,
    modalOption: ModalOptions
  ) => {
    setCurrentEventData({ eventId, eventTitle });
    switch (modalOption) {
      case ModalOptions.RegisterEvent:
        setShowRegisterModal(true);
        break;
      case ModalOptions.EventWaitingList:
        setShowEventWaitingListModal(true);
        break;
    }
  };

  const handleModalClose = (modalOption: ModalOptions, reason?: any) => {
    if (reason && reason === "backdropClick") return;
    switch (modalOption) {
      case ModalOptions.RegisterEvent:
        setShowRegisterModal(false);
        break;
      case ModalOptions.EventWaitingList:
        setShowEventWaitingListModal(false);
        break;
    }
  };

  const handleAddEventSubmit = async (
    eventType: EventType,
    eventDate: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const event = await eventsService.createNewEvent(eventType, eventDate);
        getAllEvents();
        resolve(event._id);
      } catch (error) {
        reject(t("add-event.error"));
      }
    });
  };

  const handleRegisterToEventSubmit = async (
    fullName: string,
    phoneNumber: string,
    eventId: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        const waitingListNode = await eventsService.createNewWaitingListNode(
          fullName,
          phoneNumber,
          eventId
        );
        resolve(waitingListNode._id);
      } catch (error) {
        reject(t("register.error-registration"));
      }
    });
  };

  return (
    <div className="App">
      <Header />
      <RegisterModal
        isOpen={showRegisterModal}
        handleClose={handleModalClose}
        eventData={currentEventData}
        handleOnSubmit={handleRegisterToEventSubmit}
      />
      <EventWaitingListModal
        isOpen={showEventWaitingListModal}
        handleClose={handleModalClose}
        eventData={currentEventData}
      />
      <AddEventModal
        isOpen={showAddEventModal}
        handleClose={() => setShowAddEventModal(false)}
        handleOnSubmit={handleAddEventSubmit}
      />
      <Grid
        spacing={0}
        container
        justifyContent={"center"}
        flex-direction={"column"}
      >
        <Fab
          onClick={() => setShowAddEventModal(true)}
          style={{
            position: "fixed",
            top: "40%",
            right: theme.spacing(2),
          }}
          color="primary"
          aria-label="add"
        >
          <img style={{ padding: 3 }} alt={"close"} src={plus} height={30} />
        </Fab>
        <Grid item>
          {eventsList.length === 0 ? (
            <Box sx={{ padding: 5 }}>
              <Typography
                style={{ whiteSpace: "pre-line" }}
                textAlign={"center"}
                variant={"h5"}
                fontWeight={500}
              >
                {t("no-events-to-show")}
              </Typography>
            </Box>
          ) : (
            <EventsList
              events={eventsList}
              onRegisterEventClick={(eventId: string, eventTitle: string) =>
                eventActionHandler(
                  eventId,
                  eventTitle,
                  ModalOptions.RegisterEvent
                )
              }
              onShowWaitingListClick={(eventId: string, eventTitle: string) =>
                eventActionHandler(
                  eventId,
                  eventTitle,
                  ModalOptions.EventWaitingList
                )
              }
            />
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;
