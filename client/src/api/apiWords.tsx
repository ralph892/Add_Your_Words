import * as myRequest from "./instanceAxios";
import request from "./instanceAxios";

export const getWords = async () => {
  try {
    const response = await myRequest.get("/getAllWords");
    return response;
  } catch (error) {
    console.log(error);
  }
};

export interface IParams {
  word?: string;
  id?: string;
}

export const searchWord = async (params: IParams) => {
  try {
    const response = await myRequest.get(`/getSearchWord/${params.word}?`);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export interface IBody {
  idWord?: string;
  idDef?: number[];
  word: string;
  phonetic: string;
  wordType: string;
  meaning: string | string[];
  vietnamese: string | string[];
}

export const addWord = async (data: IBody) => {
  try {
    await request.post("/postAddWord", {
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteWord = async (data: IBody) => {
  try {
    await request.post("/deleteWord", {
      data,
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

export const getUpdateWord = async (params: IParams) => {
  try {
    const response = await request.get(`/getUpdateWord/${params.id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const postUpdateWord = async (data: IBody) => {
  try {
    await request.post("/postUpdateWord", {
      data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTooltip = async (word?: string) => {
  try {
    const response = await request.get(`/getTooltip/${word}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
