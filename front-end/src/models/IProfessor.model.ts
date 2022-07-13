export default interface IProfessor {
    professorId: number;
    name:string;
    subjectId:number;
    surname:string;
    username: string;
    hashPassword: string|null;
    
}