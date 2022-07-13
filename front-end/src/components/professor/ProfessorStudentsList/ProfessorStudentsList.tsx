import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { api } from "../../../api/api";
import IMark from "../../../models/IMark.model";

interface IProfessorStudentListRowProperties {
    mark: IMark,
}
export default function ProfessorStudentList() {
    const [ categories, setCategories ] = useState<IMark[]>([]);
    const [ errorMessage, setErrorMessage ] = useState<string>("");
    const [ showAddNewMark, setShowAddNewMark ] = useState<boolean>(false);
    function ProfessorStudentListRow(props: IProfessorStudentListRowProperties) {
        const [ grade, setName ] = useState<string>("");
        const gradeChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
            setName( e.target.value );
        }
        const doAddGrade = (e: any) => {
            api("post", "/api/student/"+ props.mark.student[0].studentId + "/subject/" + 3 , "professor", { grade })
            .then(res => {
                if (res.status === 'error') {
                    return setErrorMessage("Could not add this grade!");
                }
                loadCategories();
                setName("");
            });
        }
        console.log(props)
        return (
            <tr>
                <td>{ props.mark.studentSubjectId }</td>
                <td>
                    {props.mark.student[0].name + ' ' + props.mark.student[0].surname}
                </td>
                <td>
                    {props.mark.grade}
                </td>
                <td>

                <div className="input-group">
                        <input className="form-control form-control-sm"
                               type="text"
                               onChange={ e => gradeChanged(e) }
                               value={ grade} />
                         <button className="btn btn-primary btn-sm" onClick={ e => doAddGrade(e) }>
                                  Add grade
                        </button>
                            
                        
                    </div>
                </td>
            </tr>
        );
    }
    
    const loadCategories = () => {
        api("get", "/api/subject/3", "professor")
        .then(apiResponse => {
            console.log("GET categories response: ", apiResponse);
            if (apiResponse.status === 'ok') {
                return setCategories(apiResponse.data.studentSubjects);
            }
            throw new Error("Unknown error ");
        })
        .catch(error => {
            setErrorMessage(error?.message ?? 'Unknown error ');
        });
    }
    useEffect(() => {
        loadCategories();
    }, [ ]);
    return (
        <div>
            { errorMessage && <p>Error: { errorMessage }</p> }
            { !errorMessage &&
                <div>
                    
                    <table className="table table-bordered table-striped table-hover table-sm mt-3">
                        <thead>
                            <tr>
                                <th className="mark-row-id">ID</th>
                                <th>Name</th>
                                <th>Grade</th>
                                <th className="mark-row-options">Options</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            
                            { categories.map(mark => <ProfessorStudentListRow key={ "mark-row-" + mark.studentSubjectId } mark={ mark } />) }
                        </tbody>
                    </table>
                </div>
            }
        </div>
    );
}