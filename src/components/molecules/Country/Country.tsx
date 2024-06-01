import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCountryByIdMutation,
  useGetEventsMutation,
} from "../../../api/countries/countriesApi";
import { ColumnBox } from "../../atoms/boxes/ColumnBox";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { WorkFlowHarnessWrapper } from "../../atoms/wrappers/WorkFlowHarnessWrapper";
import { WorkFlowSideBar } from "../sidebars/WorkFlowSideBar";
import { themeByMode } from "../../../styles/theme";
import { mainTheme } from "../../../navigation/Router";

interface Country {
  ID: number;
  Name: string;
  Description: string;
  Image: string;
}

interface Event {
  ID: number;
  Name: string;
  Description: string;
  Image: string;
  Date: string;
}

const convDate = (isoDate: string): string => {
  const date = new Date(isoDate);
  const months = [
    "января",
    "февраля",
    "марта",
    "апреля",
    "мая",
    "июня",
    "июля",
    "августа",
    "сентября",
    "октября",
    "ноября",
    "декабря",
  ];
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
};

export const Country = () => {
  const [getCountryById, { isLoading }] = useGetCountryByIdMutation();
  const [getEvents] = useGetEventsMutation();
  const countryId = useParams().id;
  const [countryData, setCountryData] = useState<Country>();
  const [events, setEvents] = useState<Event[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await getCountryById(countryId);
        if ("data" in response) {
          setCountryData(response.data);
        } else if ("error" in response) {
          console.error("Error fetching user data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const fetchEventsData = async () => {
      try {
        const response = await getEvents(countryId);
        if ("data" in response) {
          setEvents(response.data);
          console.log(111, response.data);
        } else if ("error" in response) {
          console.error("Error fetching user data:", response.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchCountryData();
    fetchEventsData();
  }, []);
  return (
    <ThemeProvider theme={themeByMode("light")}>
      <WorkFlowHarnessWrapper
        sx={{
          background: mainTheme.workFlowPages.mainContent.bgGradient,
        }}
      >
        <WorkFlowSideBar />
        <ColumnBox>
          <div className="country__head">
            <div style={{ padding: "20px 60px 20px 40px" }}>
              <h2 className="country__name">
                {countryData && countryData.Name}
              </h2>
              <p className="country__desc">
                {countryData && countryData.Description}
              </p>
              <button
                className="btn"
                onClick={() => {
                  window.location.href = `/chat/${countryId}`;
                  // navigate(`/chat/${countryId}`);
                }}
              >
                Перейти к обсуждению
              </button>
            </div>
            <img
              src={countryData && countryData.Image}
              alt="Cover Country"
              className="country__cover"
            />
          </div>
          <ul className="country__events">
            {events &&
              events.map((event) => (
                <li className="country__event event" key={event.ID}>
                  <button className="event__btn">
                    <img src={event.Image} alt="" className="event__image" />
                    <p className="event__date">{convDate(event.Date)}</p>
                    <h3 className="event__name">{event.Name}</h3>
                    <p className="event__desc">{event.Description}</p>
                  </button>
                </li>
              ))}
          </ul>
        </ColumnBox>
      </WorkFlowHarnessWrapper>
    </ThemeProvider>
  );
};
