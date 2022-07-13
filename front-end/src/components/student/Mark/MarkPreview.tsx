import IMark from "../../../models/IMark.model";

export interface IMarkPreviewProperties{
    mark: IMark;
}
function MarkPreview(props: IMarkPreviewProperties){
    return(
        <div>
            <h2>{props.mark.subject.name}</h2>
            <p>Mark:</p>
            <p>{props.mark.grade}</p>
            <p>Student:</p>
            

        </div>
    );
}
export default MarkPreview;