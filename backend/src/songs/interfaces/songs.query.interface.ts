export interface ISongsQuery {
  take?: string;
  skip?: string;
  search?: string;
  minYear?: string;
  maxYear?: string;
  bands?: number[];
}
