import { TABLE_NAME } from "../utils/consts.js";
import { randomUUID } from "node:crypto";
import { Repository } from "./../repository/repository.js";

const repository = new Repository();

export const getContacts = (req, res) => {
  const response = repository.select(TABLE_NAME);
  return res.end(JSON.stringify(response));
};

export const createContat = (req, res) => {
  if (!req.body) {
    return res.writeHead(400).end(JSON.stringify({ error: "Error on body" }));
  }
  const body = req.body;
  const data = {
    id: randomUUID(),
    name: body.name,
    mobilePhone: body.mobilePhone,
    email: body.email,
  };
  repository.insert(TABLE_NAME, data);
  return res.writeHead(201).end();
};

export const deleteContact = (req, res) => {
  const { id } = req.params;
  repository.delete(TABLE_NAME, id);
  return res.writeHead(204).end();
};

export const updateContact = (req, res) => {
  const data = req.body;
  const { id } = req.params;
  repository.update(TABLE_NAME, id, data)
  return res.writeHead(204).end()
};
