import { authRequest } from "./instanceAxios";

export interface IUser {
  email: string;
  password: string;
  existEmail?: string;
}

export const createUser = async (data: IUser) => {
  try {
    const response = await authRequest.post("/signup", data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const loginUser = async (data: IUser) => {
  try {
    const response = await authRequest.post("/login", data);
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleAuthenticated = async () => {
  try {
    const response = await authRequest.post("/auth/protected");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const handleLogout = async () => {
  try {
    const response = await authRequest.post("/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
