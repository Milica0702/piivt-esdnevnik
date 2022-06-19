import { Application } from 'express';
import IAppResource from '../../common/IAppResources.interface';
import IRouter from '../../common/IRouter.interface';
import SubjectController from './SubjectController.controller';


class SubjectRouter implements IRouter{
    setupRoutes(application: Application, resources: IAppResource) {
        const subjectController: SubjectController = new SubjectController(resources.services);
        application.get("/api/subject", subjectController.getAll.bind(subjectController));
        application.get("/api/subject/:id", subjectController.getById.bind(subjectController));
    }
    
}
export default SubjectRouter;
