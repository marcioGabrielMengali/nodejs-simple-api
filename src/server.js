import http from "node:http";
import { getRequestBody } from "./middlewares/getBodyMiddleware.js";
import { setResponseHeaders } from "./middlewares/setResponseHeadersMiddleware.js";
import { randomUUID } from "node:crypto";
import { Repository } from "./repository/repository.js";

const repository = new Repository();
const CONTANCT_URL = "/contact";
const TABLE_NAME = "contacts";

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log(`Method: ${method} :: Url: ${url}`);

  await getRequestBody(req, res);
  setResponseHeaders(req, res);

  if (method === "GET" && url === CONTANCT_URL) {
    const response = repository.select(TABLE_NAME);
    return res.end(JSON.stringify(response));
  }
  if (method === "POST" && url === CONTANCT_URL) {
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
  }
  return res.writeHead(404).end("Not Found");
});

server.listen(3333, () => {
  console.log('server is running on port 3333');
});
