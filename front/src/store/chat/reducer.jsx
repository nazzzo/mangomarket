import {
  UPDATE_UNREAD_CHAT,
} from "./types";

const initialState = {
  chats: [
    {
      roomId:"",
      unreadCount: 0,
    }
  ]
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_UNREAD_CHAT:
      return {
        ...state,
        chats: [
          {
            roomId: action.payload,
            unreadCount: action.payload,
          },
        ]
      };
    default:
      return state;
  }
};
