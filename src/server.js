import http from "node:http";

const contacts = [];
const CONTANCT_URL = "/contact";

const server = http.createServer((req, res) => {
  const { method, url } = req;
  console.log(`Method: ${method} :: Url: ${url}`);
  if (method === "GET" && url === CONTANCT_URL) {
    const response = JSON.stringify(contacts);
    return res
      .setHeader("Content-Type", "application/json")
      .end(response);
  }
  if (method === "POST" && url === CONTANCT_URL) {
    const data = {
      id: 1,
      name: "marcio",
      mobilePhone: "+5519900786542",
      email: "marcio@example.com",
    };
    contacts.push(data);
    return res.writeHead(201).end()
  }
  return res.writeHead(404).end('Not Found')
});

server.listen(3333);
