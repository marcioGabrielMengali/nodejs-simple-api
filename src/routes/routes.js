import { CONTANCT_URL } from "../utils/consts.js";
import { buildPathParameters } from "../utils/route-path-parameters.js";
import { createContat, deleteContact, getContacts, updateContact } from "./handlres.js";

export const routes = [
  {
    method: "GET",
    url: buildPathParameters(CONTANCT_URL),
    handler: getContacts,
  },
  {
    method: "POST",
    url: buildPathParameters(CONTANCT_URL),
    handler: createContat,
  },
  {
    method: "DELETE",
    url: buildPathParameters(`${CONTANCT_URL}/:id`),
    handler: deleteContact,
  },
  {
    method: 'PUT',
    url: buildPathParameters(`${CONTANCT_URL}/:id`),
    handler: updateContact
  }
];
