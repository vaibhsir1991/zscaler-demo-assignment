import axios, { AxiosError } from 'axios';
import { IData } from 'commons/interfaces';

class API {
  static GetData(): Promise<IData[]> {
    return axios
      .get('./data.json')
      .then((res: { data: IData[] }) => {
        return res.data;
      })
      .catch((error: AxiosError) => {
        throw new Error(error.message);
      });
  }
}

export default API;
