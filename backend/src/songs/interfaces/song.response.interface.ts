export interface ISongResponse {
  id: number;
  name: string;
  band: {
    id: number;
    name: string;
  };
  year: number;
}
