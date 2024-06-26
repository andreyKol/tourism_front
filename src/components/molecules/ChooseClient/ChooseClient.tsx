import { ColumnBox } from "../../atoms/boxes/ColumnBox";
import { RowBox } from "../../atoms/boxes/RowBox";
import { TextTypography } from "../../atoms/typographies/TextTypography";

import avatar1 from "../../../assets/svg/avatars/avatar1.svg";
import avatar2 from "../../../assets/svg/avatars/avatar2.svg";
import avatar3 from "../../../assets/svg/avatars/avatar3.svg";
import avatar4 from "../../../assets/svg/avatars/avatar4.svg";
import avatar5 from "../../../assets/svg/avatars/avatar5.svg";

import { InfoCard } from "../cards/InfoCard";

interface Props {
  clients: {
    ID: number;
    Name: string;
    Surname: string;
    Age: number;
    Email: string;
    Phone: string;
    LastOnline: string;
    Patronymic: string;
    Role: number;
  }[];
  onDoctorClick: (doctorId: number) => void;
}

export const ChooseClient = ({ clients, onDoctorClick }: Props) => {
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
          {"Выборите страну для путешествия"}
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
        {clients?.map((client) => (
          <InfoCard onClick={onDoctorClick} doctor={client} key={client.ID} />
        ))}
      </RowBox>
    </ColumnBox>
  );
};
