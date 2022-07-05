import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import IAddGrade from './dto/IAddFinalGrade.dto';
import ProfessorStudentSubjectModel from './ProfessorStudentSubjectModel.model';




interface IProfessorStudentSubjectAdapterOptions extends IAdapterOptions {
       
}
const DefaultProfessorStudentSubjectAdapterOptions: IProfessorStudentSubjectAdapterOptions = {
       
}
class ProfessorStudentSubjectService extends BaseService<ProfessorStudentSubjectModel, IProfessorStudentSubjectAdapterOptions>{
    tableName(): string {
        return "professor_student_subject" ;
    }
    protected async adaptToModel(data: any, options: IProfessorStudentSubjectAdapterOptions): Promise<ProfessorStudentSubjectModel> {
        const professorStudentSubject: ProfessorStudentSubjectModel = new ProfessorStudentSubjectModel();
        professorStudentSubject.finalGrade = +data?.final_grade;
        professorStudentSubject.studentSubjectId = +data?.student_subject_id;
        professorStudentSubject.professorStudentSubjectId = +data?.student_subject_id;
        professorStudentSubject.professorId = +data?.professor_id;
        professorStudentSubject.note = data?.note;

        
        return professorStudentSubject;
    }

    

    //promena
    public async getByStudentSubjectId(studentSubjectId:number):Promise<ProfessorStudentSubjectModel[]>{
        return this.baseGetAllByFealdNameAndValue('student_subject_id', studentSubjectId, {});

    }

    public async add(data: IAddGrade): Promise<ProfessorStudentSubjectModel> {
        return this.baseAdd(data, DefaultProfessorStudentSubjectAdapterOptions);
    }
   



        
    

   
}

export default ProfessorStudentSubjectService;
export {DefaultProfessorStudentSubjectAdapterOptions, IProfessorStudentSubjectAdapterOptions}