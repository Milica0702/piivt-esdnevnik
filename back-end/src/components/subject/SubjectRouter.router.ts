import { Application } from 'express';
import IAppResource from '../../common/IAppResources.interface';
import IRouter from '../../common/IRouter.interface';
import SubjectController from './SubjectController.controller';
import AuthMiddleware from '../../middlewares/AuthMiddlewear';


class SubjectRouter implements IRouter{
    setupRoutes(application: Application, resources: IAppResource) {
        const subjectController: SubjectController = new SubjectController(resources.services);
        application.get("/api/subject",AuthMiddleware.getVerifier("professor","student"), subjectController.getAll.bind(subjectController));
        application.get("/api/subject/:id",AuthMiddleware.getVerifier("professor","student"), subjectController.getById.bind(subjectController));
        application.post("/api/student/:stid/subject/:suid",AuthMiddleware.getVerifier("professor","student"), subjectController.addGrade.bind(subjectController));
        application.post("/api/subject/finalGrade",AuthMiddleware.getVerifier("professor","student"), subjectController.addFinalGrade.bind(subjectController));
    }
    
}
export default SubjectRouter;
