import { AxiosError } from "axios";

export const getMessageErrorFromApi = (error:AxiosError): string => {
  let message = error;
  // if (message.response) {
  //   message = message.response;
  // }
  // if (message.data) {
  //   message = message.data;
  // }
  // if (message.message) {
  //   message = message.message;
  // }

  if (typeof message === "string") {
    return message;
  }
  return error.message;
};
