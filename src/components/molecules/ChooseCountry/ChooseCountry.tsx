import { ColumnBox } from "../../atoms/boxes/ColumnBox";
import { RowBox } from "../../atoms/boxes/RowBox";
import { TextTypography } from "../../atoms/typographies/TextTypography";

import { InfoCard } from "../cards/InfoCard";

interface Country {
  ID: number;
  Name: string;
  Description: string;
  Image: string;
}

interface Props {
  countries: Country[];
  onCountryClick: (country: Country) => void;
}

export const ChooseCountry = ({ countries, onCountryClick }: Props) => {
  return (
    <ColumnBox>
      <RowBox
        sx={{
          height: "max-content",
          padding: "15px",
          marginTop: "12px",
          boxSizing: "border-box",
          borderBottom: "1px solid lightgray",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TextTypography
          sx={{
            fontWeight: "600",
            fontSize: "26px",
          }}
        >
          {"Выберите страну для путешествия"}
        </TextTypography>
        <button
          onClick={() => (window.location.href = "/landing")}
          className="btn"
        >
          Лендинг
        </button>
      </RowBox>
      <RowBox
        sx={{
          height: "max-content",
          padding: "15px",
          boxSizing: "border-box",
          gap: "10px",
          flexWrap: "wrap",
          //   justifyContent: 'center',
        }}
      >
        <ul className="cards">
          {countries?.map((country) => (
            <li className="cards__item" key={country.ID}>
              <button className="card" onClick={() => onCountryClick(country)}>
                <h2 className="card__title">{country.Name}</h2>
                <p className="card__desc">{country.Description}</p>
                <img
                  src={country.Image}
                  alt="BG country"
                  className="card__image"
                />
              </button>
            </li>
          ))}
        </ul>
      </RowBox>
    </ColumnBox>
  );
};
