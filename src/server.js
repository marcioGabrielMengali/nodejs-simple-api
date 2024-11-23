import http from "node:http";
import { getRequestBody } from "./middlewares/getBodyMiddleware.js";
import { setResponseHeaders } from "./middlewares/setResponseHeadersMiddleware.js";
import { Repository } from "./repository/repository.js";
import { routes } from "./routes/routes.js";



const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  console.log(`Method: ${method} :: Url: ${url}`);

  await getRequestBody(req, res);
  setResponseHeaders(req, res);
  const route = routes.find(
    (route) => route.method === method && route.url.test(url)
  );
  if (route){
    const routeParams = req.url.match(route.url)
    const {query, ...params} = routeParams.groups
    req.params = params;
    req.query = query ? getQueryParameters(query) : {}
    return route.handler(req, res)
  };
  return res.writeHead(404).end("Not Found");
});

server.listen(3333, () => {
  console.log("server is running on port 3333");
});
