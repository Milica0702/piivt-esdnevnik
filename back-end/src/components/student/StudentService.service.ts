import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import StudentModel from './StudentModel.model';
interface IStudentAdapterOptions extends IAdapterOptions {

}
const DefaultStudentAdapterOptions: IStudentAdapterOptions = {

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
        
        return student;
    }

}
export default StudentService;
export {DefaultStudentAdapterOptions, IStudentAdapterOptions}