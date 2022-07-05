import { Application } from 'express';
import IAppResource from '../../common/IAppResources.interface';
import IRouter from '../../common/IRouter.interface';
import ProfessorController from './ProfessorController.controller';
import AuthMiddleware from '../../middlewares/AuthMiddlewear';



class ProfessorRouter implements IRouter{
    setupRoutes(application: Application, resources: IAppResource) {
        const professorController: ProfessorController = new ProfessorController(resources.services);
        application.get("/api/professor",AuthMiddleware.getVerifier("professor","student") ,professorController.getAll.bind(professorController));
        application.get("/api/professor/:id",AuthMiddleware.getVerifier("professor","student") , professorController.getById.bind(professorController));

        
    }
    
}
export default ProfessorRouter;
