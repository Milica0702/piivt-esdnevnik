import BaseController from '../../common/BaseController';
import { DefaultProfessorAdapterOptions } from './ProfessorService.service';
import { Request, Response } from "express";
class ProfessorController extends BaseController{
    async getAll(req:Request, res: Response){
        
        this.service.professor.baseGetAll(DefaultProfessorAdapterOptions)
            .then(result => {
                res.send(result);
            })
            .catch(error => {
                return res.status(500).send(error?.message);
            });
    }
    async getById(req:Request, res: Response){
        const id: number = Number(req.params?.id);
        this.service.professor.baseGetById(id, {loadGames:true})
            .then((result) => {
                if(result === null){
                   throw {
                       status: 404,
                       message: "Professor not found!"
                   }
               }
               res.send(result);
            }).catch((error) => {
                res.status(error?.status ?? 500).send(error?.message);
            });
    }



}
export default ProfessorController;