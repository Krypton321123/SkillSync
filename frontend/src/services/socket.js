import { io } from "socket.io-client";
import { socketAtom } from "../store/atoms/chatAtoms.js";
import { useSetRecoilState } from "recoil";
import {useEffect} from "react";

const useSocket = () => {
    const setSocket = useSetRecoilState(socketAtom);

    useEffect(() => {

        const socket = io("http://localhost:8000", {
            auth: {
                token: localStorage.getItem("accessToken"),
            },
        });


        setSocket(socket);


        return () => {
            socket.disconnect();
        };
    }, [setSocket]);

};

export default useSocket;

