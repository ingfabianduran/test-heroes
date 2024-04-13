export interface QueryParamsHero {
  limit: number,
  offset: number,
  name?: string
};

export interface QueryParamsComics {
  limit: number,
  offset: number,
  heroId: number
};

export interface ConfigColumnsTable {
  key: string,
  name: string,
};

export interface HttpError {
  status: number,
  message: string
};