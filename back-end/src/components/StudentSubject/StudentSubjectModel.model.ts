import IModel from '../../common/IModel.interface';
import StudentModel from '../student/StudentModel.model';
import SubjectModel from '../subject/SubjectModel.model';
import ProfessorStudentSubjectModel from '../ProfessorStudentSubject/ProfessorStudentSubjectModel.model';

class StudentSubjectModel implements IModel{
    studentSubjectId:number;
    //subjectId: number;
    //studentId: number;
    grade: string;
    student?:StudentModel[];
    subject?:SubjectModel[];
    finalGradeAndProfessor:ProfessorStudentSubjectModel[];
    note?:string;
    
  
}
export default StudentSubjectModel;