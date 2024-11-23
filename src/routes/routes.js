import { CONTANCT_URL } from "../utils/consts.js";
import { createContat, getContacts } from "./handlres.js";

export const routes = [
  {
    method: "GET",
    url: CONTANCT_URL,
    handler: getContacts,
  },
  {
    method: "POST",
    url: CONTANCT_URL,
    handler: createContat,
  },
];
