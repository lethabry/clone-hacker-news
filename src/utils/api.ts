import { URLPATH } from './constants.js';

const checkResponse = (res: Response) =>
  res.ok ? res.json() : Promise.reject(`Error: ${res.status} ${res}`);

export const getStories = (typeStories: string) => {
  return fetch(`${URLPATH}${typeStories}.json?print=pretty`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(checkResponse);
};

export const getStory = (id: string) => {
  return fetch(`${URLPATH}item/${id}.json?print=pretty`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(checkResponse);
};

export const getCommentFetch = (id: number) => {
  return fetch(`${URLPATH}item/${id}.json?print=pretty`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  }).then(checkResponse);
};
