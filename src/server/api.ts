import axios from 'axios';

export const kitsuApi = axios.create({
  baseURL: "https://kitsu.io/api/edge/",
});

export const JikanApi = axios.create({
  baseURL: " https://api.jikan.moe/v4/",
});

export const api = axios.create({
  baseURL: "/api/",
});
