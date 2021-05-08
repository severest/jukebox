import { addSong } from '../../ws/index';

export const ADD_SONG = 'ADD_SONG';

export const createSong = () => (dispatch, getState) => {
  const state = getState();
  addSong(state);
};
