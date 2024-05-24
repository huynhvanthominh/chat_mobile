import { AxiosError } from "axios";

export const getMessageErrorFromApi = (error: AxiosError): string => {
  let message: any = error;
  if (message.response) {
    message = message.response;
  }
  if (message.data) {
    message = message.data;
  }
  if (message.message) {
    message = message.message;
  }
  if (message.errors) {
    message = message.errors;
  }
  Object.keys(message).forEach((key) => {
    if (Array.isArray(message[key])) {
      message = message[key];
    }
  })
  if(Array.isArray(message)) {
    message = message[0];
  }
  if (typeof message === "string") {
    return message;
  }
  return error.message;
};
