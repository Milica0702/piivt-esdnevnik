import IModel from '../../common/IModel.interface';
import StudentModel from '../student/StudentModel.model';
import SubjectModel from '../subject/SubjectModel.model';

class ProfessorStudentSubjectModel implements IModel{
    professorStudentSubjectId:number;
    studentSubjectId:number;
    professorId:number;
    finalGrade:number;
    note?:string;
    
  
}
export default ProfessorStudentSubjectModel;