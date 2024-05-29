import { useAppDispatch, useAppSelector } from "../../../store/store";

import { ChooseDoctor } from "../../../components/molecules/ChooseDoctor/ChooseDoctor";
import { useContext, useEffect, useState } from "react";
import {
  useGetClientsMutation,
  useGetMeMutation,
  useGetUsersMutation,
} from "../../../api/users/usersApi";
import { setDoctors } from "../../../store/redux/doctors/doctors.slice";
import {
  useCreateRoomMutation,
  useJoinRoomMutation,
} from "../../../api/chats/chatsApi";
import { getCookie } from "typescript-cookie";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../../store/redux/user/user.slice";
import { makeid } from "../../../utils/makeRandomId";
import { setConn } from "../../../store/redux/socket/socket.slice";

import { UserData } from "../../../pages/WorkFlowPage/profile/ProfileFormView.tsx";
import { ChooseClient } from "../../../components/molecules/ChooseClient/ChooseClient.tsx";

export const MainFormView = () => {
  const dispatch = useAppDispatch();
  const [getUsers, { isLoading }] = useGetUsersMutation();
  const [getClients] = useGetClientsMutation();
  const [getMe] = useGetMeMutation();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [clients, setClients] = useState([]);

  const doctors = useAppSelector((state) => state.doctors.doctors);
  const user = useAppSelector((state) => state.user.user);
  const conn = useAppSelector((state) => state.socket.conn);

  const [createRoom] = useCreateRoomMutation();
  const [joinRoom] = useJoinRoomMutation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await getMe(user.id);
        if ("data" in response) {
          setUserData(response.data);
        } else if ("error" in response) {
          console.error("Error fetching user data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchDoctorsData = async () => {
      try {
        const response = await getUsers({});
        dispatch(setDoctors((response as any).data));
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchClientsData = async () => {
      try {
        const response = await getClients({});
        setClients("data" in response && response.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };

    fetchDoctorsData();
    fetchClientsData();
  }, []);

  const onDoctorClickHandler = async (doctorId: number) => {
    const roomResponse = await createRoom({}).unwrap();
    console.log("Room created: ", roomResponse);
    const roomId = (roomResponse as any).id;

    const ws = new WebSocket(
      `ws://localhost:8080/api/v1/ws/joinRoom/${roomId}?clientId=${user.id}`
    );
    const ows = new WebSocket(
      `ws://localhost:8080/api/v1/ws/joinRoom/${roomId}?clientId=${doctorId}`
    );
    if (ws.OPEN) {
      dispatch(setConn(ws));
      dispatch(setConn(ows));
      console.log(conn);
      console.log(roomId, doctorId);
      // await joinRoom({ roomId: roomId, userId: doctorId });
      window.location.href = `/chat/${roomId}?doctorId=${doctorId}`;
      return;
    }

    // const response = await ws.emit(`joinRoom/${roomId}`, { clientId: user.id });
    // const doctorResponse = await ws.emit(`joinRoom/${roomId}`, { clientId: doctorId });
  };

  const onClientClickHandler = async (doctorId: number) => {
    const roomId = 0;
    window.location.href = `/chat/${roomId}?doctorId=${doctorId}`;
    return;
    // }

    // const response = await joinRoom({ roomId: roomId, userId: user.id });
    // const response = await socket.emit(`joinRoom/${roomId}`, { clientId: user.id });
    // const doctorResponse = await socket.emit(`joinRoom/${roomId}`, { clientId: doctorId });
  };

  return (
    <>
      {" "}
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <>
          {userData && "Role" in userData && userData.Role == 1 ? (
            <ChooseDoctor
              doctors={doctors}
              onDoctorClick={onDoctorClickHandler}
            />
          ) : (
            <ChooseClient
              clients={clients}
              onDoctorClick={onClientClickHandler}
            />
          )}
        </>
      )}
    </>
  );
};
