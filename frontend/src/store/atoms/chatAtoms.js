import { atom } from 'recoil';
import {io} from "socket.io-client";

export const activeChatUserAtom = atom({
    key: 'activeChatUserAtom',
    default: null,
});

export const chatHistoryAtom = atom({
    key: 'chatHistoryAtom',
    default: [],
});

export const socketAtom = atom({
    key: "socketAtom",
    default: null
});