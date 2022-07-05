import * as express from "express";
import * as cors from "cors";
import IConfig from './common/IConfig.interface';
import { DevConfig } from "./config";
import * as mysql2 from 'mysql2/promise';
import IAppResource from "./common/IAppResources.interface";
import SubjectService from "./components/subject/SubjectService.service";
import ProfessorService from "./components/professor/ProfessorService.service";
import StudentService from "./components/student/StudentService.service";
import StudentSubjectService from "./components/StudentSubject/StudentSubject.service";
import ProfessorStudentSubjectModel from './components/ProfessorStudentSubject/ProfessorStudentSubjectModel.model';
import ProfessorStudentSubjectService from "./components/ProfessorStudentSubject/ProfessorStudentSubjectService.service";


async function main(){
    const app: express.Application = express();
    const config: IConfig = DevConfig;
    //Konektovanje na BP
    const db = await mysql2.createConnection({
        host: config.database.host,
        port: config.database.port,
        user: config.database.user,
        password: config.database.password,
        database: config.database.database,
        charset: config.database.charset,
        timezone: config.database.timezone,
        supportBigNumbers: config.database.supportBigNumbers,
        });
        const appResources: IAppResource = {
            databaseConnection: db,
            services: {
                subject: null,
                professor: null,
                student: null,
                studentSubjects:null,
                professorStudentSubject:null

            }
            };
        appResources.services.subject = new SubjectService(appResources);
        appResources.services.professor = new ProfessorService(appResources);
        appResources.services.student = new StudentService(appResources);
        appResources.services.studentSubjects = new StudentSubjectService(appResources);
        appResources.services.professorStudentSubject = new ProfessorStudentSubjectService(appResources);
    app.use(cors());

    app.use(express.json());

    for (const router of config.routers){
        router.setupRoutes(app,appResources)
       
        
    }
    





    app.use((req,res)=>{
        res.sendStatus(404);
    });
    app.listen(config.server.port);
}
main();
