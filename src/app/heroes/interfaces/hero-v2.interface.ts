export interface Heroes {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: Data;
};

export interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Result[];
};

export interface Result {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Comics;
  series: Comics;
  stories: Stories;
  events: Comics;
  urls: URL[];
};

export interface Comics {
  available: number;
  collectionURI: string;
  items: ComicsItem[];
  returned: number;
};

export interface ComicsItem {
  resourceURI: string;
  name: string;
};

export interface Stories {
  available: number;
  collectionURI: string;
  items: StoriesItem[];
  returned: number;
};

export interface StoriesItem {
  resourceURI: string;
  name: string;
  type: ItemType;
};

export interface Thumbnail {
  path: string;
  extension: Extension;
};

export interface URL {
  type: URLType;
  url: string;
};

export interface QueryParamsHero {
  limit: number,
  offset: number,
  name?: string
};

export enum URLType {
  Comiclink = "comiclink",
  Detail = "detail",
  Wiki = "wiki",
};

export enum Extension {
  GIF = "gif",
  Jpg = "jpg",
};

export enum ItemType {
  Cover = "cover",
  Empty = "",
  InteriorStory = "interiorStory",
};