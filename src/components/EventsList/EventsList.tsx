import { Grid } from "@mui/material";
import { EventData } from "../../global/types";
import EventCard from "../EventCard/EventCard";

type EventsListProps = {
  events: EventData[];
  onRegisterEventClick: (eventId: string, eventTitle: string) => void;
  onShowWaitingListClick: (eventId: string, eventTitle: string) => void;
};

const EventsList = ({
  events,
  onRegisterEventClick,
  onShowWaitingListClick,
}: EventsListProps) => (
  <Grid spacing={0} direction="column" alignItems="center" container>
    {events?.map((event) => (
      <div key={event.eventId}>
        <EventCard
          eventData={event}
          onRegisterClick={(eventId: string, eventTitle: string) =>
            onRegisterEventClick(eventId, eventTitle)
          }
          onShowListClick={(eventId: string, eventTitle: string) =>
            onShowWaitingListClick(eventId, eventTitle)
          }
        />
      </div>
    ))}
  </Grid>
);

export default EventsList;
