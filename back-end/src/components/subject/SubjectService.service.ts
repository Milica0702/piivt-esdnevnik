import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import SubjectModel from './SubjectModel.model';
interface ISubjectAdapterOptions extends IAdapterOptions {

}
const DefaultSubjectAdapterOptions: ISubjectAdapterOptions = {

}
class SubjectService extends BaseService<SubjectModel, ISubjectAdapterOptions>{
    tableName(): string {
        return "subject" ;
    }
    protected async adaptToModel(data: any, options: ISubjectAdapterOptions): Promise<SubjectModel> {
        const subject: SubjectModel = new SubjectModel();
        subject.subjectId = Number(data?.subject_id);
        subject.name = data?.name;
        
        return subject;
    }

}
export default SubjectService;
export {DefaultSubjectAdapterOptions, ISubjectAdapterOptions}