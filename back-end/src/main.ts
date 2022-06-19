import * as express from "express";
import * as cors from "cors";
import IConfig from './common/IConfig.interface';
import { DevConfig } from "./config";
import * as mysql2 from 'mysql2/promise';
import IAppResource from "./common/IAppResources.interface";
import SubjectService from "./components/subject/SubjectService.service";


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

            }
            };
        appResources.services.subject = new SubjectService(appResources);
    app.use(cors());

    for (const router of config.routers){
        router.setupRoutes(app,appResources)
       
        
    }
    





    app.use((req,res)=>{
        res.sendStatus(404);
    });
    app.listen(config.server.port);
}
main();
