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
// import { makeid } from "../../../utils/makeRandomId";
import { setConn } from "../../../store/redux/socket/socket.slice";

import { UserData } from "../../../pages/WorkFlowPage/profile/ProfileFormView.tsx";
import { ChooseClient } from "../../../components/molecules/ChooseClient/ChooseClient.tsx";
import { ChooseCountry } from "../../../components/molecules/ChooseCountry/ChooseCountry.tsx";
import { useGetCountriesMutation } from "../../../api/countries/countriesApi.ts";
import { Country } from "../../../components/molecules/Country/Country.tsx";
import { count } from "console";
import { Navigate, useNavigate } from "react-router-dom";

export const MainFormView = () => {
  const navigate = useNavigate();
  const [getCountries, { isLoading }] = useGetCountriesMutation();
  const [countries, setCountries] = useState([]);

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
