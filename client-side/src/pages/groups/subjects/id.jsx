import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../../Animations';
import Lottie from "react-lottie";
import { useState, useEffect } from 'react';
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';

const SubjectByIdPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [subject, setSubject] = useState(null);
    const [hometasks, setHometasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const groupId = params.groupId;
        const subjectId = params.id;
        const initData = WebApp.initData;

        API.subjects.getById(groupId, subjectId, initData)
            .then((subjectResult) => {
                setSubject(subjectResult);

                API.hometasks.getBySubject(groupId, subjectId, initData)
                    .then((hometasksResult) => {
                        setIsLoaded(true);
                        setHometasks(hometasksResult);
                    }, (error) => {
                        setIsLoaded(true);
                        setError(error);
                    });
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            });

    }, []);

    const navigateToSubjects = () => {
        navigate(`/groups/${params.groupId}/subjects/`);
    }

    const navigateToHometask = (id) => {
        navigate(`/groups/${params.groupId}/hometasks/${id}`);
    }

    const navigateToCreateHometask = () => {
        navigate(`/groups/${params.groupId}/subjects/${params.id}/hometasks/create`);
    }

    const parseLessonType = (lessonType) => {
        switch (lessonType) {
            case 0:
                return { variant: "", text: "NONE" };
            case 1:
                return { variant: "danger", text: "LECTURE" };
            case 2:
                return { variant: "success", text: "PRACTICE" };
        }
    }

    if (!isLoaded) {
        return (
            <div className="center">
                <BackButton onClick={navigateToSubjects} />
                <div className="loader" />
            </div>
        )
    }

    if (error || !subject) {
        return (
            <div className="center">
                <BackButton onClick={navigateToSubjects} />

                <Lottie
                    options={animationOptions(animation.nothing_here_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />
                <p>There isn`t any subject yet</p>
            </div>
        )
    }

    return (
        <div className='center'>
            <BackButton onClick={() => navigate("/")} />
            <div style={{ overflow: "hidden" }} className='center'>
                <div className={`tag ${parseLessonType(subject.lessonType).variant}`}>
                    {parseLessonType(subject.lessonType).text}
                </div>
                <h2>{subject.name}</h2>
                <p>{subject.teacherName}</p>
            </div>

            {
                hometasks.map((hometask, index) =>
                    <div className="card" key={index}
                        onClick={() => navigateToHometask(hometask.id)}>
                        <div
                            className="card-text-block"
                            style={{ width: "100%", paddingLeft: "10px" }}>
                            <div className={`tag ${Date.now() < new Date(hometask.deadline) ? 
                                "success" : "danger"}`} style={{margin: "5px 0px 0px 0px"}}>
                                {new Date(hometask.deadline).toLocaleString()}
                            </div>
                            <h3 className="card-text">{hometask.content}</h3>
                        </div>
                    </div>)
            }

            <MainButton
                text="Create hometask"
                onClick={navigateToCreateHometask} />
        </div>
    )
}

export default SubjectByIdPage;
