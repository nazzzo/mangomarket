import {
  UPDATE_UNREAD_CHAT,
  UPDATE_READ_CHAT,
  UPDATE_RESERVE_CHAT,
} from "./types";

export const updateUnreadChat = (roomId, unreadCount) => ({
  type: UPDATE_UNREAD_CHAT,
  payload: {
    roomId,
    unreadCount
  }
})
export const updateReadChat = () => ({
  type: UPDATE_READ_CHAT,
})
export const updateReserveChat = (data) => ({
  type: UPDATE_RESERVE_CHAT,
  payload: data,
})
