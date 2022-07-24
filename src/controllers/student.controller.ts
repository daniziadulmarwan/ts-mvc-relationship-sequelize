import { Request, Response } from "express";
import path from "path";
import fs from "fs";
const db = require("../database/models");

class StudentController {
  async index(req: Request, res: Response): Promise<any> {
    const students = await db.Student.findAll();

    const alertStatus = req.flash("alert");
    const alertMessage = req.flash("message");
    const alert = { message: alertMessage, status: alertStatus };

    console.log(req.session.user);

    return res.render("pages/student/index", {
      active: "student",
      students,
      alert,
    });
  }

  create(req: Request, res: Response): void {
    res.render("pages/student/create", { active: "student" });
  }

  async post(req: Request, res: Response): Promise<any> {
    try {
      const { name, nisn, gender } = req.body;
      const rootPath = path.resolve("public");

      if (req.file) {
        const tmpPath = req.file.path;
        const ext = path.extname(req.file.originalname);
        const fileName = new Date().getTime() + ext;

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(`${rootPath}/uploads/${fileName}`);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            await db.Student.create({
              name,
              nisn,
              gender,
              image: fileName,
            });

            req.flash("alert", "success");
            req.flash("message", "Success create data");
            return res.redirect("/student");
          } catch (error: any) {
            req.flash("alert", "danger");
            req.flash("message", error.message);
            return res.redirect("/student");
          }
        });
      } else {
        await db.Student.create({
          name,
          nisn,
          gender,
        });

        req.flash("alert", "success");
        req.flash("message", "Success create data");
        return res.redirect("/student");
      }
    } catch (error: any) {
      req.flash("alert", "danger");
      req.flash("message", error.message);
      return res.redirect("/student");
    }
  }

  async edit(req: Request, res: Response): Promise<any> {
    const student = await db.Student.findByPk(req.params.id);
    res.render("pages/student/edit", { active: "student", student });
  }

  async update(req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params;
      const { name, nisn, gender } = req.body;
      const rootPath = path.resolve("public");

      if (req.file) {
        const tmpPath = req.file.path;
        const ext = path.extname(req.file.originalname);
        const fileName = new Date().getTime() + ext;

        const src = fs.createReadStream(tmpPath);
        const dest = fs.createWriteStream(`${rootPath}/uploads/${fileName}`);

        src.pipe(dest);
        src.on("end", async () => {
          try {
            const student = await db.Student.findByPk(id);
            const currentImage = `${rootPath}/uploads/${student.image}`;

            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage);
            }

            await db.Student.update(
              { name, nisn, gender, image: fileName },
              {
                where: {
                  id: id,
                },
              }
            );

            req.flash("alert", "success");
            req.flash("message", "Success update data");
            return res.redirect("/student");
          } catch (error: any) {
            req.flash("alert", "danger");
            req.flash("message", error.message);
            return res.redirect("/student");
          }
        });
      } else {
        await db.Student.update(
          { name, nisn, gender },
          {
            where: {
              id: id,
            },
          }
        );

        req.flash("alert", "success");
        req.flash("message", "Success update data");
        return res.redirect("/student");
      }
    } catch (error: any) {
      req.flash("alert", "danger");
      req.flash("message", error.message);
      return res.redirect("/student");
    }
  }

  async destroy(req: Request, res: Response): Promise<any> {
    const rootPath = path.resolve("public");
    try {
      const student = await db.Student.findByPk(req.params.id);
      const currentImage = `${rootPath}/uploads/${student.image}`;

      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage);

        await db.Student.destroy({ where: { id: req.params.id } });

        req.flash("alert", "success");
        req.flash("message", "Success delete data");
        return res.redirect("/student");
      } else {
        await db.student.destroy({ where: { id: req.params.id } });

        req.flash("alert", "success");
        req.flash("message", "Success delete data");
        return res.redirect("/student");
      }
    } catch (error: any) {
      req.flash("alert", "danger");
      req.flash("message", error.message);
      return res.redirect("/student");
    }
  }
}

export default new StudentController();
