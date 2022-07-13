import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../../api/api';
import ISubjects from '../../../models/ISubjects.model';




function SubjectsList(){
    const [subjects, setSubjects] = useState<ISubjects[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    useEffect(() => {
        api("get", "/api/subject", "student")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                throw { message: "Unknown error while loading subjects...", }
            }
            setSubjects(apiResponse.data);
        })
        .catch(err => {
            setErrorMessage(err?.message ?? 'Unknown error while loading subjects...')
        })



        
    }, [])
    return (
        <div>
            {errorMessage && <p>Error: {errorMessage}</p>}
            {!errorMessage &&
                <ul>
                    {subjects.map(c => (
                        <li key={"subject-"+c.subjectId}>
                            <Link to={"/subject/"+c.subjectId}>{c.name}</Link>
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}
export default SubjectsList;