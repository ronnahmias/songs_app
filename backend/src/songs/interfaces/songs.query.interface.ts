export interface ISongsQuery {
  take?: number;
  skip?: number;
  search?: string;
  minYear?: number;
  maxYear?: number;
  bands?: number[];
}
