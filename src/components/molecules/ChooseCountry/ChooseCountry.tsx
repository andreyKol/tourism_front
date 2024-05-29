import { ColumnBox } from "../../atoms/boxes/ColumnBox";
import { RowBox } from "../../atoms/boxes/RowBox";
import { TextTypography } from "../../atoms/typographies/TextTypography";

import { InfoCard } from "../cards/InfoCard";

interface Props {
  countries: {
    ID: number;
    Name: string;
    Description: string;
  }[];
  onCountryClick: (countryId: number) => void;
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
              <button className="card" onClick={() => onCountryClick}>
                <h2 className="card__title">{country.Name}</h2>
                <p className="card__desc">{country.Description}</p>
              </button>
            </li>
          ))}
        </ul>
      </RowBox>
    </ColumnBox>
  );
};
