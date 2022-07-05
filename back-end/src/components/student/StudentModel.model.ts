import IModel from '../../common/IModel.interface';
import StudentSubjectModel from '../StudentSubject/StudentSubjectModel.model';

class StudentModel implements IModel{
    studentId: number;
    name: string;
    surname: string;
    username:string;
    studentSubjects?: StudentSubjectModel[];
    passwordHash:string; 
    
  
}
export default StudentModel;