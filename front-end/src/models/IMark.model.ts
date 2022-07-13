import IStudent from "./IStudent.model";
import ISubjects from "./ISubjects.model";

export default interface IMark {
    studentSubjectId: number;
    grade: number;
    subject:ISubjects;
    student:IStudent[];
    
}