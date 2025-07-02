import express from 'express';

const app = express();
const port = 3000;

app.get('/', (_req, res) => {
  res.send('Hello, ESM + TypeScript + Express!');
});
app.get("/hi", (_req, res) => {
    res.send("Hello, World!"+_req.query.name);
}
);

app.listen(port, () => {
  console.log(`Server ready at http://localhost:${port}`);
});