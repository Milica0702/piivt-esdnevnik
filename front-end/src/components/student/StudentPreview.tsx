import IMark from '../../models/IMark.model';

export interface IStudentPreviewProperties{
    student: IMark;
}
function StudentPreview(props: IStudentPreviewProperties){
    console.log(props.student);
    return(

        <div>
            <p>{props.student.student[0].name}</p>
            <p>{props.student.student[0].surname}</p>
            <p>{props.student.grade}</p>
            
        </div>
    );
}
export default StudentPreview;