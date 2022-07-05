import * as mysql2 from "mysql2/promise";
import ProfessorService from "../components/professor/ProfessorService.service";
import StudentService from "../components/student/StudentService.service";
import SubjectService from '../components/subject/SubjectService.service';
import StudentSubjectService from '../components/StudentSubject/StudentSubject.service';
import ProfessorStudentSubjectService from '../components/ProfessorStudentSubject/ProfessorStudentSubjectService.service';

interface IAppResource{
    databaseConnection: mysql2.Connection;
    services: IServices;
}
interface IServices{
   subject: SubjectService;
   professor: ProfessorService;
   student: StudentService;
   studentSubjects: StudentSubjectService;
   professorStudentSubject: ProfessorStudentSubjectService;
}
export default IAppResource;
export {IServices};