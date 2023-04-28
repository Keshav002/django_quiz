import React, { useRef, useState, useEffect } from 'react';
import './SubjectCards.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from './card_logo.svg';

const SubjectCards = () => {
    const [isOpen, setIsOpen] = useState(-1);
    const token = localStorage.getItem('token');
    const [subjects, setSubjects] = useState([]);
    const toggleDropdown = (index) => {
        if (isOpen === index) setIsOpen(-1);
        else setIsOpen(index);
    };
    const fetchSubjectData = async () => {
        const response = await fetch('/subjects', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            return response.json();
        });
        setSubjects(response);
    };
    async function deleteSubject(id) {
        await fetch('/subjects/' + id + "/", {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        fetchSubjectData();
    }

    useEffect(() => {
        fetchSubjectData();
    }, []);

    return (
        <div
            className="slider"
        >
            {subjects.map((subject, index) => (
                <div className="card2" key={index}>
                    <div className="img">
                    <Logo />
                    </div>
                    <h2>{subject.subject_name}</h2>
                    <p>{subject.subject_description}</p>
                    <div className="dropdown-container">
                        <button className="dropdown-toggle" onClick={() => toggleDropdown(index)}>
                            Options
                        </button>
                        <div
                            className="dropdown">
                            {isOpen === index ? (
                                <>
                                <Link class="dropdown-item" to={`/modifySubject/`+subject.id} >Edit</Link>
                                    <Link className="dropdown-item" to={`/editQuestion/` + subject.id}>View Questions</Link>
                                    <Link className="dropdown-item" to={`/addQuiz`}>Add Subject</Link>
                                    <button className="dropdown-item"
                                        onClick={() => deleteSubject(subject.id)}
                                        type="button">Delete</button>
                                </>
                            ) : ("")}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubjectCards;
