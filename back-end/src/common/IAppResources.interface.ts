import * as mysql2 from "mysql2/promise";
import SubjectService from '../components/subject/SubjectService.service';

interface IAppResource{
    databaseConnection: mysql2.Connection;
    services: IServices;
}
interface IServices{
   subject: SubjectService;
}
export default IAppResource;
export {IServices};