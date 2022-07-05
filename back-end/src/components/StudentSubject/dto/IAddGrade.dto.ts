import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
const ajv = new Ajv();
export default interface IAddGrade extends IServiceData {
    grade?: string;
    student_id?: number;
    subject_id?: number;
}
const AddGradeValidator = ajv.compile({
    type: "object",
    properties: {
        grade: {
            type: "string",
            
        }
        
    
    },
    required: [
        "grade"
    ],
    additionalProperties: false,
});

export { AddGradeValidator };