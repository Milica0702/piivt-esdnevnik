import Ajv from "ajv";
import IServiceData from "../../../common/IServiceData.interface";
const ajv = new Ajv();
interface IEditGrade extends IServiceData {
    grade?:string;
}
interface IEditGradeDto {
    grade?:string;
}
const EditGradeValidator = ajv.compile({
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
export default IEditGrade;
export { EditGradeValidator, IEditGradeDto };