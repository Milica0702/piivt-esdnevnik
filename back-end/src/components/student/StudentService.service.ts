import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import StudentModel from './StudentModel.model';
interface IStudentAdapterOptions extends IAdapterOptions {
    loadStudentSubjects:boolean;
}
const DefaultStudentAdapterOptions: IStudentAdapterOptions = {
    loadStudentSubjects:false
}
class StudentService extends BaseService<StudentModel, IStudentAdapterOptions>{
    tableName(): string {
        return "student" ;
    }
    protected async adaptToModel(data: any, options: IStudentAdapterOptions): Promise<StudentModel> {
        const student: StudentModel = new StudentModel();
        student.studentId = Number(data?.student_id);
        student.name = data?.name;
        student.surname = data?.surname;
        student.username = data?.username;
        student.passwordHash = data?.hash_password;
        if(options.loadStudentSubjects){
            student.studentSubjects=await this.services.studentSubjects.getAllByStudentId(Number(data?.student_id))
        }


        
        return student;
    }

    public async getByUsername(username: string): Promise<StudentModel|null> {
        return new Promise((resolve, reject) => {
            this.baseGetAllByFealdNameAndValue("username", username, {
                loadStudentSubjects:false
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


export default StudentService;
export {DefaultStudentAdapterOptions, IStudentAdapterOptions}