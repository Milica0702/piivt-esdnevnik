import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import SubjectModel from './SubjectModel.model';
interface ISubjectAdapterOptions extends IAdapterOptions {
    loadStudentSubjects: boolean;
}
const DefaultSubjectAdapterOptions: ISubjectAdapterOptions = {
    loadStudentSubjects: false
}
class SubjectService extends BaseService<SubjectModel, ISubjectAdapterOptions>{
    tableName(): string {
        return "subject" ;
    }
    protected async adaptToModel(data: any, options: ISubjectAdapterOptions): Promise<SubjectModel> {
        const subject: SubjectModel = new SubjectModel();
        subject.subjectId = Number(data?.subject_id);
        subject.name = data?.name;
        if(options.loadStudentSubjects){
            subject.studentSubjects=await this.services.studentSubjects.getAllBySubjectId(Number(data?.subject_id))
        }
        return subject;
    }
    

   
}
export default SubjectService;
export {DefaultSubjectAdapterOptions, ISubjectAdapterOptions}