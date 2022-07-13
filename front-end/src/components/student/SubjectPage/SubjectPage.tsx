import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../../api/api';
import IMark from '../../../models/IMark.model';

import IStudent from '../../../models/IStudent.model';
import ISubjects from '../../../models/ISubjects.model';
import StudentPreview from '../StudentPreview';

interface ISubjectPageURLParams extends Record<string, string|undefined>{
    id: string;
}

function SubjectPage(){
    const [subject, setSubject] = useState<ISubjects|null>(null);
    const [students, setStudents] = useState<IMark[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ loading, setLoading ] = useState<boolean>(false);
    const params = useParams<ISubjectPageURLParams>();
    useEffect(() => {
        setLoading(true);
        api("get", "/api/subject/" + params.id, "student")
        .then(apiResponse => {
            if(apiResponse.status === "error"){
                throw { message: "Unknown error while loading subject", }
            }
            setSubject(apiResponse.data);
            setStudents(apiResponse.data.studentSubjects)
            
        })
        .catch(err => {
            setErrorMessage(err?.message ?? "Unknown error while loading subject")
        })
        .finally(() => {
                setLoading(false);
            }
        )
    }, [])
    return(
        <div>
            {loading && <p>Loading...</p>}
            {errorMessage && <p>Error: {errorMessage}</p>}
            {subject && (
                <div>
                    <h1>{subject?.name}</h1>
                    {students && (
                        <div>
                            <StudentPreview student={students[0]}/>
                          
                        </div>
                    )}
                    {!students && (
                        <p>There are no students currently in this subject</p>
                    )}
                </div>
            )}
        </div>
    );
}
export default SubjectPage;
export type {ISubjectPageURLParams}