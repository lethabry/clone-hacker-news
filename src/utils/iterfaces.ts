export interface IStory {
  by: string;
  descendants: number;
  id: number;
  kids: number[];
  score: number;
  text: string;
  time: number;
  title: string;
  type: string;
  url: string;
}

export interface ISort {
  name: string;
  urlRequest: string;
  isActive: boolean;
}

export interface IComment {
  by: string;
  id: number;
  kids: number[];
  children: IComment[];
  parent: number;
  text: string;
  time: number;
  type: string;
  deleted: boolean;
}
