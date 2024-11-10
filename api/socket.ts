import { URL_CONSTANST } from "@/constants/api";
import { io } from "socket.io-client";

export const chatSocket = io(URL_CONSTANST.CHAT_SOCKET);
