import express from "express";
import ExpressHbs from "express-hbs";
import session from "express-session";
import router from "./src/routes/Router.mjs";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import path from "path";
import dotenv from "dotenv";
import passport from "passport";

// Configure app
dotenv.config();
const app = express();
const PORT = process.env.PORT | 8080;
const HOST = process.env.HOST;

// Parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Express Session
app.use(
  session({
    secret: process.env.PASSPORT_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);
// Passport init
app.use(passport.initialize({}));
app.use(passport.session({}));
// Express view engine
app.engine(
  "hbs",
  ExpressHbs.express4({
    defaultLayout: path.join("src", "views", "layouts", "base"),
    layoutsDir: path.join("src", "views", "layouts"),
    partialsDir: path.join("src", "views", "partials"),
  })
);
app.set("view engine", "hbs");
app.set("views", path.join("src", "views", "pages"));

// Express routes
app.use(
  "/favicon.ico",
  express.static(path.join("src", "public", "favicon.ico"))
);
app.use("/public", express.static(path.join("src", "public")));
app.use("/", router);
// Start app
app.listen(PORT, HOST, function () {
  console.log("demarrage du serveur sur le port " + PORT + " !");
  console.log("http://" + HOST + ":" + PORT);
});
