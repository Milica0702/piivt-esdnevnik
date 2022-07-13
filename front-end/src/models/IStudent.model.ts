export default interface IStudent {
    studentId: number;
    name:string;
    surname:string;
    username: string;
    hashPassword: string|null;
}