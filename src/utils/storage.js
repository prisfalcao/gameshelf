// src/utils/storage.js

const STORAGE_KEY = "gameshelf_collection";

export const getGames = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveGames = (games) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(games));
};

export const addGame = (game) => {
  const games = getGames();
  games.push(game);
  saveGames(games);
};

export const removeGame = (id) => {
  const games = getGames().filter((g) => g.id !== id);
  saveGames(games);
};

export const updateGame = (updatedGame) => {
  const games = getGames().map((g) => (g.id === updatedGame.id ? updatedGame : g));
  saveGames(games);
};

export const getGameById = (id) => {
  return getGames().find((g) => g.id === id);
};