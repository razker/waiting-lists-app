import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { EventData, EventType } from "../../global/types";
import depthSession from "../../static/depth-session.png";
import poolSession from "../../static/pool-session.png";

type EventCardProps = {
  eventData: EventData;
  onRegisterClick: (eventId: string, eventTitle: string) => void;
  onShowListClick: (eventId: string, eventTitle: string) => void;
};

const getEventTranslationByType = (eventType: EventType) => {
  switch (eventType) {
    case EventType.Depth:
      return "depth-session";
    case EventType.Pool:
      return "pool-session";
  }
};

const EventCard = ({
  eventData,
  onRegisterClick,
  onShowListClick,
}: EventCardProps) => {
  const { eventType, eventDate, eventId } = eventData;
  const { t } = useTranslation();
  const theme = useTheme();

  const eventTitle = `${t(
    getEventTranslationByType(eventType)
  )} - ${eventDate}`;

  return (
    <Card sx={{ minWidth: 300, padding: 2, margin: theme.spacing(3, 2) }}>
      <CardMedia
        component="img"
        height="140"
        src={eventType === EventType.Pool ? poolSession : depthSession}
        alt="card-image"
      />
      <CardContent>
        <Typography fontWeight={500} variant="h5">
          {eventTitle}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          onClick={() => onRegisterClick(eventId, eventTitle)}
          variant="contained"
        >
          <Typography>{t("register-button")}</Typography>
        </Button>
        <Button
          variant="outlined"
          onClick={() => onShowListClick(eventId, eventTitle)}
        >
          <Typography>{t("show-list-button")}</Typography>
        </Button>
      </CardActions>
    </Card>
  );
};

export default EventCard;
