import axios from "axios";
import { EventType } from "../global/types";

export class EventsService {
  public async getEvents(): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_WAITING_SERVICE_URL}/api/events`
        );
        resolve(response?.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async createNewEvent(
    eventType: EventType,
    eventDate: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_WAITING_SERVICE_URL}/api/event`,
          {
            eventType,
            eventDate,
          }
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async createNewWaitingListNode(
    fullName: string,
    phoneNumber: string,
    eventId: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_WAITING_SERVICE_URL}/api/waiting-list/${eventId}`,
          {
            fullName,
            phoneNumber,
          }
        );
        resolve(response);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async getEventWaitingList(eventId: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_WAITING_SERVICE_URL}/api/waiting-list/${eventId}`
        );
        resolve(response?.data);
      } catch (error) {
        reject(error);
      }
    });
  }

  public async deleteEventWaitingListNode(
    waitingListNodeId: string,
    exchangeName?: string
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.put(
          `${process.env.REACT_APP_WAITING_SERVICE_URL}/api/waiting-list/${waitingListNodeId}`,
          { isActive: false, exchangeName }
        );
        resolve(response?.data);
      } catch (error) {
        reject(error);
      }
    });
  }
}
