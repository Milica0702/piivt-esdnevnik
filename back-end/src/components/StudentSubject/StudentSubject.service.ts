import IAdapterOptions from '../../common/IAdapterOptions.interface';
import BaseService from '../../common/BaseService';
import StudentSubjectModel from './StudentSubjectModel.model';
import IAddGrade from './dto/IAddGrade.dto';
import IEditGrade from './dto/IEditGrade.dto';



interface IStudentSubjectAdapterOptions extends IAdapterOptions {
        loadStudent:boolean;
        loadSubject:boolean;
}
const DefaultStudentSubjectAdapterOptions: IStudentSubjectAdapterOptions = {
        loadStudent:false,
        loadSubject:false
}
class StudentSubjectService extends BaseService<StudentSubjectModel, IStudentSubjectAdapterOptions>{
    tableName(): string {
        return "student_subject" ;
    }
    protected async adaptToModel(data: any, options: IStudentSubjectAdapterOptions): Promise<StudentSubjectModel> {
        const studentSubject: StudentSubjectModel = new StudentSubjectModel();
        studentSubject.studentSubjectId = Number(data?.student_subject_id);
        //studentSubject.studentId = Number(data?.student_id);
        //studentSubject.subjectId= Number(data?.subject_id);
        studentSubject.grade = data?.grade;
        if(options.loadStudent){
            studentSubject.student = await this.services.student.baseGetAllByFealdNameAndValue('student_id',Number(data?.student_id), {
                loadStudentSubjects:false
            })
        }
        if(options.loadSubject){
            studentSubject.subject = await this.services.subject.baseGetAllByFealdNameAndValue('subject_id',Number(data?.subject_id), {
                loadStudentSubjects:false
            })
        }

        studentSubject.finalGradeAndProfessor = await this.services.professorStudentSubject.getByStudentSubjectId(studentSubject.studentSubjectId);
        
        return studentSubject;
    }

    public async getAllByStudentId(studentId:number):Promise<StudentSubjectModel[]>{
        return new Promise ((resolve, reject)=>{
            this.baseGetAllByFealdNameAndValue('student_id', studentId,{
                loadStudent:false,
                loadSubject:true


            } )
            .then( async result => {
                if(result.length === 0 ){
                    return resolve([]);
                }
                const studentSubjects: StudentSubjectModel[] = await Promise.all(
                    result.map(async row => {
                        const ss = await (await this.baseGetById(row.studentSubjectId, {loadSubject:true, loadStudent:false}));
                        return {
                            studentSubjectId:row.studentSubjectId,
                            
                            grade: row.grade,
                            subject:ss.subject,
                            finalGradeAndProfessor:ss.finalGradeAndProfessor
                        }
                    })
                );
                resolve(studentSubjects);
            }).catch(error => {
                reject(error)
            }); 
            })

    }

    //promena
    public async getAllBySubjectId(subjectId:number):Promise<StudentSubjectModel[]>{
        return new Promise ((resolve, reject)=>{
            this.baseGetAllByFealdNameAndValue('subject_id', subjectId,{
                loadStudent:true,
                loadSubject:false


            } )
            .then( async result => {
                if(result.length === 0 ){
                    return resolve([]);
                }
                const studentSubjects: StudentSubjectModel[] = await Promise.all(
                    result.map(async row => {
                        const ss = await (await this.baseGetById(row.studentSubjectId, {loadSubject:false, loadStudent:true}));
                        return {
                            studentSubjectId:row.studentSubjectId,
                            
                            grade: row.grade,
                            student:ss.student,
                            finalGradeAndProfessor:ss.finalGradeAndProfessor
                        }
                    })
                );
                resolve(studentSubjects);
            }).catch(error => {
                reject(error)
            }); 
            })

    }

    public async add(data: IAddGrade): Promise<StudentSubjectModel> {
        return this.baseAdd(data, DefaultStudentSubjectAdapterOptions);
    }
    public async edit(data: IEditGrade, studentSubjectId:number, options:IStudentSubjectAdapterOptions = DefaultStudentSubjectAdapterOptions): Promise<StudentSubjectModel> {
        return this.baseEditById(studentSubjectId,data,options);
    }

    public async getByStudentAndSubjectIds (subjectId:number, studentId:number): Promise<StudentSubjectModel|null>{
        return new Promise<StudentSubjectModel>((resolve,reject) => {
            const sql: string = `SELECT * FROM \`student_subject\` WHERE \`student_id\` = ? and  \`subject_id\` =? ;`;
            this.db.execute(sql, [ studentId, subjectId ])
                .then(async ([ rows ]) => {
                    if(rows === undefined){
                        return resolve(null);
                    }
                    if(Array.isArray(rows) && rows.length === 0){
                        return resolve(null);
                    }
                    resolve(await this.adaptToModel(rows[0],DefaultStudentSubjectAdapterOptions));
                })
                .catch(error => {
                    reject(error);
                });
        }
            
        )

        }

       

    

   
}

export default StudentSubjectService;
export {DefaultStudentSubjectAdapterOptions, IStudentSubjectAdapterOptions}