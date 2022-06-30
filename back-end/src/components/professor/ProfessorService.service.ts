import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import ProfessorModel from './ProfessorModel.model';
interface IProfessorAdapterOptions extends IAdapterOptions {
    loadSubjects: boolean;

}
const DefaultProfessorAdapterOptions: IProfessorAdapterOptions = {
    loadSubjects:false,
}
class ProfessorService extends BaseService<ProfessorModel, IProfessorAdapterOptions>{
    tableName(): string {
        return "professor" ;
    }
    protected async adaptToModel(data: any, options: IProfessorAdapterOptions): Promise<ProfessorModel> {
        const professor: ProfessorModel = new ProfessorModel();
        professor.professorId = Number(data?.professor_id);
        professor.name = data?.name;
        professor.surname = data?.surname;
        professor.username = data?.username;
        professor.subjectId = Number(data?.subject_id);
        
        return professor;
    }

}
export default ProfessorService;
export {DefaultProfessorAdapterOptions, IProfessorAdapterOptions}