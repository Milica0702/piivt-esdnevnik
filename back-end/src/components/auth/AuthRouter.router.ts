import * as express from "express";
import IAppResource from "../../common/IAppResources.interface";
import IRouter from "../../common/IRouter.interface";
import AuthController from "./AuthController.controller";
class AuthRouter implements IRouter {
    public setupRoutes(application: express.Application, resources: IAppResource) {
        const authController: AuthController = new AuthController(resources.services);
        application.post("/api/auth/professor/login",         authController.professorLogin.bind(authController));
        application.post("/api/auth/professor/refresh",       authController.professorRefresh.bind(authController));
        application.post("/api/auth/student/login",                  authController.studentLogin.bind(authController));
        application.post("/api/auth/student/refresh",                authController.studentRefresh.bind(authController));
    }
}
export default AuthRouter;