import IModel from '../../common/IModel.interface';
import StudentSubjectModel from '../StudentSubject/StudentSubjectModel.model';


class SubjectModel implements IModel{
    subjectId: number;
    name: string;
    studentSubjects?: StudentSubjectModel[];
    
  
}
export default SubjectModel;