export async function getRequestBody(req, res) {
  if (req.method === "POST" || req.method === "PUT") {
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    try {
      req.body = JSON.parse(Buffer.concat(buffers).toString());
    } catch (error) {
      console.log(`Error on parse body`, error);
      req.body = null;
    }
  }
}
