import * as express from "express";
import * as cors from "cors";
import IConfig from './common/IConfig.interface';
import { DevConfig } from "./config";


async function main(){
    const app: express.Application = express();
    const config: IConfig = DevConfig;

    app.use(cors());


    app.use((req,res)=>{
        res.sendStatus(404);
    });
    app.listen(config.server.port);
}
main();
