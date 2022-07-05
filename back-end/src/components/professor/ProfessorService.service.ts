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
        professor.passwordHash = data?.hash_password;
        
        return professor;
    }

    
    public async getProfessorByUsername(username: string): Promise<ProfessorModel|null> {
        return new Promise((resolve, reject) => {
            this.baseGetAllByFealdNameAndValue("username", username,{loadSubjects:false})
            .then(result => {
                if (result.length === 0) {
                    return resolve(null);
                }
                resolve(result[0]);
            })
            .catch(error => {
                reject(error?.message);
            });
        });
    }

    public async getByUsername(username: string): Promise<ProfessorModel|null> {
        return new Promise((resolve, reject) => {
            this.baseGetAllByFealdNameAndValue("username", username, {
                loadSubjects:false
            })
            .then(result => {
                if (result.length === 0) {
                    return resolve(null);
                }
                resolve(result[0]);
            })
            .catch(error => {
                reject(error);
            });
        });
    }
}
export default ProfessorService;
export {DefaultProfessorAdapterOptions, IProfessorAdapterOptions}