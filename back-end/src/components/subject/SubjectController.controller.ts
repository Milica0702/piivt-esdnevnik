import BaseController from '../../common/BaseController';
import { DefaultSubjectAdapterOptions } from './SubjectService.service';
import { Request, Response } from "express";


import IAddGrade, { AddGradeValidator } from '../StudentSubject/dto/IAddGrade.dto';
import IEditGrade, { IEditGradeDto } from '../StudentSubject/dto/IEditGrade.dto';
import IAddFinalGrade, { AddFinalGradeValidator } from '../ProfessorStudentSubject/dto/IAddFinalGrade.dto';
class SubjectController extends BaseController{
    async getAll(req:Request, res: Response){
        
        this.service.subject.baseGetAll(DefaultSubjectAdapterOptions)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                return res.status(500).send(error?.message);
            });
    }
    async getById(req:Request, res: Response){
        const id: number = Number(req.params?.id);
        this.service.subject.baseGetById(id, {loadStudentSubjects:true})
            .then((result) => {
                if(result === null){
                   throw {
                       status: 404,
                       message: "Subject not found!"
                   }
               }
               res.send(result);
            }).catch((error) => {
                res.status(error?.status ?? 500).send(error?.message);
            });
    }
    async addGrade(req: Request, res: Response) {
        const studentId:number = + req.params?.stid;
        const subjectId:number = + req.params?.suid;
        const studentSubject = await this.service.studentSubjects.getByStudentAndSubjectIds( subjectId, studentId);
        if( studentSubject === null) {
            const data = req.body as IAddGrade;
            if (!AddGradeValidator(data)) {
                return res.status(400).send(AddGradeValidator.errors);
            }
            const serviceData:IAddGrade = {};
            serviceData.grade = data.grade;
            serviceData.student_id = studentId;
            serviceData.subject_id = subjectId;
            this.service.studentSubjects.add(serviceData)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(400).send(error?.message);
            });
        } else{
            const data = req.body as IEditGrade;
            if (!AddGradeValidator(data)) {
                return res.status(400).send(AddGradeValidator.errors);
            }
            const serviceData:IEditGradeDto = {};
            serviceData.grade = (await studentSubject).grade + ", " + data.grade;
            this.service.studentSubjects.edit(serviceData, studentSubject.studentSubjectId )
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                res.status(400).send(error?.message);
            });
        }

        
    }

    async addFinalGrade(req: Request, res: Response) {
        const data = req.body as IAddFinalGrade;
        if (!AddFinalGradeValidator(data)) {
            return res.status(400).send(AddFinalGradeValidator.errors);
        }
        const serviceData: IAddFinalGrade = {
            final_grade:data.final_grade,
            professor_id:data.professor_id,
            student_subject_id:data.student_subject_id

        };
            if(data.note !== undefined){
                serviceData.note = data.note
            }
        this.service.professorStudentSubject.add(serviceData)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(400).send(error?.message);
        });

    }
}
export default SubjectController;

