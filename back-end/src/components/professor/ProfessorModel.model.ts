import IModel from '../../common/IModel.interface';
import SubjectModel from '../subject/SubjectModel.model';


class ProfessorModel implements IModel{
    professorId: number;
    name: string;
    surname: string;
    username: string;
    subjectId: number;
    passwordHash:string;  
  
}
export default ProfessorModel;