import { Application } from 'express';
import IAppResource from '../../common/IAppResources.interface';
import IRouter from '../../common/IRouter.interface';
import ProfessorController from './ProfessorController.controller';


class ProfessorRouter implements IRouter{
    setupRoutes(application: Application, resources: IAppResource) {
        const professorController: ProfessorController = new ProfessorController(resources.services);
        application.get("/api/professor", professorController.getAll.bind(professorController));
        application.get("/api/professor/:id", professorController.getById.bind(professorController));
    }
    
}
export default ProfessorRouter;
