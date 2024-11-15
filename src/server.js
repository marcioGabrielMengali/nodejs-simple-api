import http from "node:http";
import { getRequestBody } from "./middlewares/getBodyMiddleware.js";
import { setResponseHeaders } from "./middlewares/setResponseHeadersMiddleware.js";

const contacts = [];
const CONTANCT_URL = "/contact";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log(`Method: ${method} :: Url: ${url}`);

  await getRequestBody(req, res);
  setResponseHeaders(req, res);

  if (method === "GET" && url === CONTANCT_URL) {
    const response = JSON.stringify(contacts);
    return res.setHeader("Content-Type", "application/json").end(response);
  }
  if (method === "POST" && url === CONTANCT_URL) {
    if (!req.body) {
      return res.writeHead(400).end(JSON.stringify({ error: "Error on body" }));
    }
    const body = req.body
    const data = {
      id: 1,
      name: body.name,
      mobilePhone: body.mobilePhone,
      email: body.email,
    };
    contacts.push(data);
    return res.writeHead(201).end();
  }
  return res.writeHead(404).end("Not Found");
});

server.listen(3333);
