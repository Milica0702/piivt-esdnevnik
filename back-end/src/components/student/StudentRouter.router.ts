import { Application } from 'express';
import IAppResource from '../../common/IAppResources.interface';
import IRouter from '../../common/IRouter.interface';
import StudentController from './StudentController.controller';


class StudentRouter implements IRouter{
    setupRoutes(application: Application, resources: IAppResource) {
        const studentController: StudentController = new StudentController(resources.services);
        application.get("/api/student", studentController.getAll.bind(studentController));
        application.get("/api/student/:id", studentController.getById.bind(studentController));
    }
    
}
export default StudentRouter;
