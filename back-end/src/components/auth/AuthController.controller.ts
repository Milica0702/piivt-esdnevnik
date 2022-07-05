import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import ITokenData from "./dto/ITokenData";
import { DevConfig } from "../../config";
import AuthMiddleware from "../../middlewares/AuthMiddlewear";
import { IProfessorLoginDto } from "./dto/IProfessorLogin.dto";
import BaseController from "../../common/BaseController";
import { IStudentLoginDto } from "./dto/IStudentlogin.dto";
export default class AuthController extends BaseController {
    public async professorLogin(req: Request, res: Response) {
        const data = req.body as IProfessorLoginDto;
        this.service.professor.getByUsername(data.username)
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: "Administrator account not found!"
                };
            }
            return result;
        })
        .then(professor => {
            if (!bcrypt.compareSync(data.password, professor.passwordHash)) {
                throw {
                    status: 404,
                    message: "Administrator account not found!"
                };
            }
            return professor;
        })
        .then(professor => {
            const tokenData: ITokenData = {
                role: "professor",
                id: professor.professorId,
                identity: professor.username,
            };
            const authToken = jwt.sign(tokenData, DevConfig.auth.professor.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.professor.algorithm,
                issuer: DevConfig.auth.professor.issuer,
                expiresIn: DevConfig.auth.professor.tokens.auth.duration,
            });
            const refreshToken = jwt.sign(tokenData, DevConfig.auth.professor.tokens.refresh.keys.private, {
                algorithm: DevConfig.auth.professor.algorithm,
                issuer: DevConfig.auth.professor.issuer,
                expiresIn: DevConfig.auth.professor.tokens.refresh.duration,
            });
            res.send({
                authToken: authToken,
                refreshToken: refreshToken,
                id: professor.professorId,
            });
        })
        .catch(error => {
            setTimeout(() => {
                res.status(error?.status ?? 500).send(error?.message);
            }, 1500);
        });
    }
    professorRefresh(req: Request, res: Response) {
        const refreshTokenHeader: string = req.headers?.authorization ?? "";
        try {
            const tokenData = AuthMiddleware.validateTokenAs(refreshTokenHeader, "professor", "refresh");
            const authToken = jwt.sign(tokenData, DevConfig.auth.professor.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.professor.algorithm,
                issuer: DevConfig.auth.professor.issuer,
                expiresIn: DevConfig.auth.professor.tokens.auth.duration,
            });
            res.send({
                authToken: authToken,
            });
        } catch (error) {
            res.status(error?.status ?? 500).send(error?.message);
        }
    }
    public async studentLogin(req: Request, res: Response) {
        const data = req.body as IStudentLoginDto;
        this.service.student.getByUsername(data.username)
        .then(result => {
            if (result === null) {
                throw {
                    status: 404,
                    message: "User account not found!"
                };
            }
            return result;
        })
        .then(student => {
            if (!bcrypt.compareSync(data.password, student.passwordHash)) {
                throw {
                    status: 404,
                    message: "User account not found!"
                };
            }
            return student;
        })
        
        .then(student => {
            const tokenData: ITokenData = {
                role: "student",
                id: student.studentId,
                identity: student.name + " " + student.surname,
            };
            const authToken = jwt.sign(tokenData, DevConfig.auth.student.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.student.algorithm,
                issuer: DevConfig.auth.student.issuer,
                expiresIn: DevConfig.auth.student.tokens.auth.duration,
            });
            const refreshToken = jwt.sign(tokenData, DevConfig.auth.student.tokens.refresh.keys.private, {
                algorithm: DevConfig.auth.student.algorithm,
                issuer: DevConfig.auth.student.issuer,
                expiresIn: DevConfig.auth.student.tokens.refresh.duration,
            });
            res.send({
                authToken: authToken,
                refreshToken: refreshToken,
                id: student.studentId,
            });
        })
        .catch(error => {
            setTimeout(() => {
                res.status(error?.status ?? 500).send(error?.message);
            }, 1500);
        });
    }
    studentRefresh(req: Request, res: Response) {
        const refreshTokenHeader: string = req.headers?.authorization ?? ""; // "Bearer TOKEN"
        try {
            const tokenData = AuthMiddleware.validateTokenAs(refreshTokenHeader, "student", "refresh");
            const authToken = jwt.sign(tokenData, DevConfig.auth.student.tokens.auth.keys.private, {
                algorithm: DevConfig.auth.student.algorithm,
                issuer: DevConfig.auth.student.issuer,
                expiresIn: DevConfig.auth.student.tokens.auth.duration,
            });
            res.send({
                authToken: authToken,
            });
        } catch (error) {
            res.status(error?.status ?? 500).send(error?.message);
        }
    }
}