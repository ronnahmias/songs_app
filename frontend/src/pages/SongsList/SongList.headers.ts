import { ITableHeaders } from "../../components/DataTable/TableHeaders.interface";

export const songsListHeaders: Array<ITableHeaders> = [
  {
    name: "Song Name",
    table: "name",
  },
  {
    name: "Band Name",
    table: "band.name",
  },
  {
    name: "Year Released",
    table: "year",
  },
];
