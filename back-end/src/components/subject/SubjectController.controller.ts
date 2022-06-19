import BaseController from '../../common/BaseController';
import { DefaultSubjectAdapterOptions } from './SubjectService.service';
import { Request, Response } from "express";
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
        this.service.subject.baseGetById(id, {loadGames:true})
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



}
export default SubjectController;