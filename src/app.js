import express from "express";
import cors from "cors";
import usersRoute from "./routes/users.route.js";
import testsRoute from "./routes/tests.route.js";
import areasRoute from "./routes/areas.route.js";
import componentsRoute from "./routes/components.route.js";
import questionsRoute from "./routes/questions.route.js";
import answersRoute from "./routes/answers.route.js";
import recommendationsRoute from "./routes/recommendations.route.js";
import authRoutes from "./routes/auth.route.js";
import testAreaRoutes from "./routes/testAreas.route.js";
import testTypesRoute from "./routes/testTypes.route.js";
import resultsRoute from "./routes/results.route.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Scholar Test Backend Already Running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/testtypes", testTypesRoute);
app.use("/api/tests", testsRoute);
app.use("/api/areas", areasRoute);
app.use("/api/testareas", testAreaRoutes);
app.use("/api/components", componentsRoute);
app.use("/api/questions", questionsRoute);
app.use("/api/answers", answersRoute);
app.use("/api/recommendations", recommendationsRoute);
app.use("/api/users", usersRoute);
app.use("/api/results", resultsRoute);

// Middleware global de errores
app.use(errorHandler);

export default app;
