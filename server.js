import express from "express";
import routes from "./controllers/index.js";
import sequelize from "./config/connection.js";
import path from "path";

import * as helpers from "./utils/helpers.js"; // Import helpers

import exphbs from "express-handlebars";
const hbs = exphbs.create({ helpers });

import session from "express-session";
import connectSessionSequelize from "connect-session-sequelize"; // Default import
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SequelizeStore = connectSessionSequelize(session.Store); // Create SequelizeStore using session.Store
// Set up static path
const staticPath = path.join(__dirname, "public");

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "bigbluedog",
  cookie: {
    // Session will automatically expire in 10 minutes
    expires: 10 * 60 * 1000,
  },
  resave: true,
  rolling: true,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize, // Pass sequelize instance
  }),
};

app.use(session(sess));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(staticPath));

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(routes);

// Turn on connection to DB and server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Now listening on http://localhost:${PORT}/`)
  );
});
