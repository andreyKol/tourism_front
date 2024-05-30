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
import { ChooseCountry } from "../../../components/molecules/ChooseCountry/ChooseCountry.tsx";
import { useGetCountriesMutation } from "../../../api/countries/countriesApi.ts";
import { Country } from "../../../components/molecules/Country/Country.tsx";
import { count } from "console";
import { Navigate, useNavigate } from "react-router-dom";

const isEmptyObject = (obj: object) => {
  return Object.keys(obj).length === 0;
};

export const MainFormView = () => {
  // const dispatch = useAppDispatch();
  // const [getUsers, { isLoading }] = useGetUsersMutation();
  // const [getClients] = useGetClientsMutation();
  const navigate = useNavigate();
  const [getCountries, { isLoading }] = useGetCountriesMutation();
  // const [getMe] = useGetMeMutation();
  // const [userData, setUserData] = useState<UserData | null>(null);
  // const [clients, setClients] = useState([]);
  const [countries, setCountries] = useState([]);
  const [selectCountry, setSelectCountry] = useState({});

  // const doctors = useAppSelector((state) => state.doctors.doctors);
  // const user = useAppSelector((state) => state.user.user);
  // const conn = useAppSelector((state) => state.socket.conn);

  // const [createRoom] = useCreateRoomMutation();
  // const [joinRoom] = useJoinRoomMutation();

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const response = await getMe(user.id);
  //       if ("data" in response) {
  //         setUserData(response.data);
  //       } else if ("error" in response) {
  //         console.error("Error fetching user data:", response.error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await getCountries(0);
        if ("data" in response) {
          console.log(response.data);
          setCountries(response.data);
        } else if ("error" in response) {
          console.error("Error fetching country data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountriesData();
  }, []);

  // useEffect(() => {
  //   const fetchDoctorsData = async () => {
  //     try {
  //       const response = await getUsers({});
  //       dispatch(setDoctors((response as any).data));
  //     } catch (error) {
  //       console.error("Error fetching doctors:", error);
  //     }
  //   };

  //   const fetchClientsData = async () => {
  //     try {
  //       const response = await getClients({});
  //       setClients("data" in response && response.data);
  //     } catch (error) {
  //       console.error("Error fetching clients:", error);
  //     }
  //   };

  //   fetchDoctorsData();
  //   fetchClientsData();
  // }, []);

  // const onDoctorClickHandler = async (doctorId: number) => {
  //   const roomResponse = await createRoom({}).unwrap();
  //   console.log("Room created: ", roomResponse);
  //   const roomId = (roomResponse as any).id;

  //   const ws = new WebSocket(
  //     `ws://localhost:8080/api/v1/ws/joinRoom/${roomId}?clientId=${user.id}`
  //   );
  //   const ows = new WebSocket(
  //     `ws://localhost:8080/api/v1/ws/joinRoom/${roomId}?clientId=${doctorId}`
  //   );
  //   if (ws.OPEN) {
  //     dispatch(setConn(ws));
  //     dispatch(setConn(ows));
  //     console.log(conn);
  //     console.log(roomId, doctorId);
  //     // await joinRoom({ roomId: roomId, userId: doctorId });
  //     window.location.href = `/chat/${roomId}?doctorId=${doctorId}`;
  //     return;
  //   }

  //   // const response = await ws.emit(`joinRoom/${roomId}`, { clientId: user.id });
  //   // const doctorResponse = await ws.emit(`joinRoom/${roomId}`, { clientId: doctorId });
  // };

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
    <div style={{ width: "100%" }}>
      {" "}
      {isLoading ? (
        <p>Загрузка...</p>
      ) : (
        <ChooseCountry
          countries={countries}
          onCountryClick={(obj) => {
            navigate(`/countries/${obj.ID}`);
          }}
        />
      )}
    </div>
  );
};
