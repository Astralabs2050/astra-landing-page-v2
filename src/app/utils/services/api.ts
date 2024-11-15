import axios from "axios";
import { JoinWaitlist } from "./types";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const joinWaitlist = async (data: JoinWaitlist) => {
  try {
    const response = await axiosInstance.post("/wait-list/join", data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || new Error("Something went wrong");
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};
