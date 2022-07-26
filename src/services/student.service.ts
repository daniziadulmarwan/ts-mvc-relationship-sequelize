import { Request } from "express";
import path from "path";
import fs from "fs";
import User from "../types";
const db = require("../database/models");

class StudentService {
  public credential?: User;
  public body: Request["body"];
  public params: Request["params"];
  public file: Request["file"];

  constructor(req: Request) {
    this.credential = req.session.user;
    this.body = req.body;
    this.params = req.params;
    this.file = req.file;
  }

  async fetchAll(): Promise<any> {
    const data = await db.Student.findAll();
    console.log(this.credential?.id);
    return data;
  }

  async store(): Promise<any> {
    const { name, nisn, gender } = this.body;
    const rootPath = path.resolve("public");

    if (this.file) {
      const tmpPath = this.file.path;
      const ext = path.extname(this.file.originalname);
      const fileName = new Date().getTime() + ext;
      const src = fs.createReadStream(tmpPath);
      const dest = fs.createWriteStream(`${rootPath}/uploads/${fileName}`);
      src.pipe(dest);
      const data = await src.on("end", async () => {
        const res = await db.Student.create({
          name,
          nisn,
          gender,
          image: fileName,
        });
        return res;
      });
      if (data) {
        return true;
      }
    } else {
      const data = await db.Student.create({
        name,
        nisn,
        gender,
      });
      return true;
    }
  }
}

export default StudentService;
