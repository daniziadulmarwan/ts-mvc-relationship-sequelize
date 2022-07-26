import { Request, Response } from "express";
import path from "path";
import fs from "fs";
const db = require("../database/models");
import StudentService from "../services/student.service";

class StudentController {
  async index(req: Request, res: Response): Promise<any> {
    const service: StudentService = new StudentService(req);
    const students = await service.fetchAll();

    const alertStatus = req.flash("alert");
    const alertMessage = req.flash("message");
    const alert = { message: alertMessage, status: alertStatus };

    return res.render("pages/student/index", {
      active: "student",
      students,
      alert,
      user: req.session.user,
    });
  }

  create(req: Request, res: Response): void {
    res.render("pages/student/create", {
      active: "student",
      user: req.session.user,
    });
  }

  async post(req: Request, res: Response): Promise<any> {
    try {
      const service: StudentService = new StudentService(req);
      const response = await service.store();
      if (response) {
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
    res.render("pages/student/edit", {
      active: "student",
      student,
      user: req.session.user,
    });
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
