//TODO: import all types from server/service
export type EventData = {
  eventId: string;
  eventType: EventType;
  eventDate: string;
};

export type WaitingListData = {
  _id: string;
  queuePosition: number;
  fullName: string;
  phoneNumber: string;
  isActive: boolean;
  exchangeWith?: string;
};

export enum EventType {
  Depth = "DEPTH",
  Pool = "POOL",
}
