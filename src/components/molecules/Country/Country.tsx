import { ColumnBox } from "../../atoms/boxes/ColumnBox";

interface Props {
  country: {
    ID: number;
    Name: string;
    Description: string;
  };
}

export const Country = ({ country }: Props) => {
  return <ColumnBox>{country.Name}</ColumnBox>;
};
