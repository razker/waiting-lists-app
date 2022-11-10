import { EventType } from "./types";

export const eventTypeToString = (eventType: EventType) => {
  switch (eventType) {
    case EventType.Depth:
      return "depth";
    case EventType.Pool:
      return "pool";
  }
};

export const stringToEventType = (eventTypeString: string) => {
  switch (eventTypeString) {
    case "depth":
      return EventType.Depth;
    case "pool":
      return EventType.Pool;
  }
};
