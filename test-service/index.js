import "dotenv/config";

import express from "express";
import { createYoga } from "graphql-yoga";
import { schema } from "./src/schema.js";

const PORT = process.env.PORT ?? 3000;
const app = express();

const yoga = createYoga({
  schema: schema,
});

// Bind GraphQL Yoga to the graphql endpoint to avoid rendering the playground on any path
app.use("/graphql", yoga);

app.get("/", (req, res) => {
  return res.send("App running");
});

app.listen(PORT, () => {
  console.log(
    `Running a GraphQL API server at http://localhost:${PORT}/graphql`
  );
});
