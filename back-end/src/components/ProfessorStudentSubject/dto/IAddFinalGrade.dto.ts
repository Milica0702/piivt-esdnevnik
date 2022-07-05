import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
const ajv = new Ajv();
export default interface IAddFinalGrade extends IServiceData {
    final_grade: string;
    professor_id:number;
    note?:string;
    student_subject_id: number;
}
const AddFinalGradeValidator = ajv.compile({
    type: "object",
    properties: {
        final_grade: {
            type: 'number',

            
        },
        professor_id:{
            type:'number'
        },
        note:{
            type:'string'
        },
        student_subject_id:{
            type:'number'
        }

        
    
    },
    required: [
        "final_grade",
        "student_subject_id",
        "professor_id"
    ],
    additionalProperties: false,
});

export { AddFinalGradeValidator };