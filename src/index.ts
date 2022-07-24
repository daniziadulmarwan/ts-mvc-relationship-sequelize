import express, { Application } from "express";
import path from "path";
import morgan from "morgan";
import dotenv from "dotenv";
import methodOverride from "method-override";
import session from "express-session";
import flash from "connect-flash";

// routes
import studentRouter from "./routes/student.router";
import homeRouter from "./routes/home.router";
import settingRouter from "./routes/setting.router";
import authRouter from "./routes/auth.router";
import postRouter from "./routes/post.router";

class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.themes();
    this.plugins();
    this.router();
    dotenv.config();
  }

  themes() {
    this.app.set("view engine", "ejs");
    this.app.set("views", path.join(__dirname, "views"));
  }

  plugins() {
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(express.static("public"));
    this.app.use(
      session({
        secret: "kaixa913",
        resave: false,
        saveUninitialized: true,
        cookie: { maxAge: 24 * 60 * 60 * 1000 },
      })
    );
    this.app.use(flash());
    this.app.use(morgan("dev"));
    this.app.use(methodOverride("_method"));
  }

  router() {
    this.app.use("/", authRouter);
    this.app.use("/dashboard", homeRouter);
    this.app.use("/student", studentRouter);
    this.app.use("/setting", settingRouter);
    this.app.use("/post", postRouter);
  }
}

const port: any | number = process.env.PORT || 4000;
const app = new App().app;
app.listen(port, () => console.log("Server running at " + port));
