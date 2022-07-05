import { Algorithm } from 'jsonwebtoken';
import IRouter from './IRouter.interface';
interface IConfig{
    server: {
        port: number,
        static: {
            index: string|false,
            dotfiles: "allow"|"deny",
            casheControl: boolean,
            etag: boolean,
            maxAge: number,
            route: string,
            path: string
        },
    },
    logger: {
        path: string,
        logFormat: string,
        filename: string
    },
    database: {
        host: string,
        port: number,
        user: string,
        password: string,
        database: string,
        charset: "utf8"| "utf8mb4" | "ascii",
        timezone: string,
        supportBigNumbers: boolean,
    },
    routers: IRouter[],
    auth: {
        student: IAuthTokenOptions,
        professor: IAuthTokenOptions,
        allowAllRoutesWithoutAuthTokens: boolean,
    },
    



}

export interface IAuthTokenOptions {
    issuer: string,
    algorithm: Algorithm,
    tokens: {
        auth: ITokenProperties,
        refresh: ITokenProperties,
    },
}
export interface ITokenProperties {
    duration: number,
    keys: {
        public: string,
        private: string,
    },
}

export default IConfig;