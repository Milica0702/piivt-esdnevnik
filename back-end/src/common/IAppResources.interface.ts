import * as mysql2 from "mysql2/promise";
import ProfessorService from "../components/professor/ProfessorService.service";
import StudentService from "../components/student/StudentService.service";
import SubjectService from '../components/subject/SubjectService.service';

interface IAppResource{
    databaseConnection: mysql2.Connection;
    services: IServices;
}
interface IServices{
   subject: SubjectService;
   professor: ProfessorService;
   student: StudentService;
}
export default IAppResource;
export {IServices};