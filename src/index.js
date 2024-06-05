import Sentry from "@sentry/node";
import dotenv from "dotenv";
import express from "express";

// Middleware
import log from "./middleware/logMiddleware.js";

// Routes
import usersRouter from "./routers/users.js";
import propertiesRouter from "./routers/properties.js";
import reviewRouter from "./routers/review.js";
import bookingsRouter from "./routers/booking.js";
import hostsRouter from "./routers/hosts.js";
import amenitiesRouter from "./routers/amenities.js";
import loginRouter from "./routers/login.js";

dotenv.config();

const app = express();

Sentry.init({
  dsn: "https://eba745de5c6437acdf366bb649d2773b@o4507310110539776.ingest.de.sentry.io/4507368812445776",
  integrations: [
    // enable HTTP calls tracing
    new Sentry.Integrations.Http({ tracing: true }),
    // enable Express.js middleware tracing
    new Sentry.Integrations.Express({ app }), // Use the initialized app
    ...Sentry.autoDiscoverNodePerformanceMonitoringIntegrations(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions
  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/users", usersRouter);
app.use("/properties", propertiesRouter);
app.use("/amenities", amenitiesRouter);
app.use("/login", loginRouter);
app.use("/booking", bookingsRouter);
app.use("/hosts", hostsRouter);
app.use("/reviews", reviewRouter); 

app.use(log);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Error handling middleware
function errorHandler(err, req, res, next) {
  res.status(500).json({ message: err.message });
}
app.use(errorHandler);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});




