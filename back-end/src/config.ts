import IConfig from './common/IConfig.interface';
import SubjectRouter from './components/subject/SubjectRouter.router';
import ProfessorRouter from './components/professor/ProfessorRouter.router';
import StudentRouter from './components/student/StudentRouter.router';



const DevConfig: IConfig = {
    server: {
        port:10000,
        static:{
            index: false,
            dotfiles: "deny",
            casheControl: true,
            etag: true,
            maxAge: 1000*60*60*24,
            route: "/assets",
            path: "./static"
        },
    },
    logger: {
        path: "./logs",
        logFormat: ":date[iso]\t:remote-addr\tmethod\t:status\tres[content-length] bytes\t:response-time ms",
        filename: "access.log"
    },
    database: {
        host: "localhost",
        port: 3306,
        user: "app",
        password: "app",
        database: "piivt-esdnevnik",
        charset: "utf8",
        timezone: "+01:00",
        supportBigNumbers: true,
    },
    routers: [
        new SubjectRouter(),
        new ProfessorRouter(),
        new StudentRouter()
    ]
}
export { DevConfig };