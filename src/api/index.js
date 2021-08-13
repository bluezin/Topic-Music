export const getPlayList = async () => {
  const response = await fetch(
    "https://api.napster.com/v2.0/playlists?apikey=YzdkZDY3ODItMmVmMy00ZGZlLTk4MDMtYjgxMTA2OTcxZjM1"
  );
  const data = await response.json();
  return data;
};

export const getListSongs = async ({ id }) => {
  const response = await fetch(
    `https://api.napster.com/v2.0/playlists/${id}/tracks?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm&limit=200`
  );
  const data = await response.json();
  return data;
};
