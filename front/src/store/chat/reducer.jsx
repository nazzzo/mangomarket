import {
  UPDATE_UNREAD_CHAT,
  UPDATE_RESERVE_CHAT,
} from "./types";

const initialState = {
  isLoading: true,
  isError: null,
  chats: [
    {
      roomId:"",
      unreadCount: 0,
    }
  ],
  isReserved: [
    {
      chatid:"",
      state:"",
    },
  ]
};

export const chat = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_UNREAD_CHAT:
      return {
        ...state,
        isLoading: false,
        isError: null,
        chats: [
          {
            roomId: action.payload,
            unreadCount: action.payload,
          },
        ]
      };
      case UPDATE_RESERVE_CHAT:
        console.log(action.payload)
        return {
          ...state,
          isLoading: false,
          isError: null,
          isReserved: action.payload,
        };
    default:
      return state;
  }
};
