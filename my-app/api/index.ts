import axios from 'axios';

export const getCourtInfoList = async () => {
  const response = await axios.get(
    '/api/proxy',
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response.data;
};
