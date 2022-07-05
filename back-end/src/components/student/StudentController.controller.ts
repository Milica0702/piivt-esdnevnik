import BaseController from '../../common/BaseController';
import { DefaultStudentAdapterOptions } from './StudentService.service';
import { Request, Response } from "express";
class StudentController extends BaseController{
    async getAll(req:Request, res: Response){
        
        this.service.student.baseGetAll(DefaultStudentAdapterOptions)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                return res.status(500).send(error?.message);
            });
    }
    async getById(req:Request, res: Response){
        const id: number = Number(req.params?.id);
        this.service.student.baseGetById(id, {loadStudentSubjects:true})
            .then((result) => {
                if(result === null){
                   throw {
                       status: 404,
                       message: "Student not found!"
                   }
               }
               res.send(result);
            }).catch((error) => {
                res.status(error?.status ?? 500).send(error?.message);
            });
    }



}
export default StudentController;