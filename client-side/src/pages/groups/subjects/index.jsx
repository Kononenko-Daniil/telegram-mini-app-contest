import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { MainButton, BackButton } from '@twa-dev/sdk/react';
import Lottie from "react-lottie";
import { animation, animationOptions } from "../../../Animations";

const SubjectsPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [subjects, setSubjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        API.subjects.getByGroup(params.groupId, WebApp.initData)
            .then((result) => {
                setSubjects(result);
                setIsLoaded(true);
            }, (error) => {
                setError(error);
                setIsLoaded(true);
            })
    }, []);

    const navigateToGroupById = () => {
        navigate(`/groups/${params.groupId}`);
    }

    const navigateToSubjectCreate = () => {
        navigate(`/groups/${params.groupId}/subjects/create`);
    }

    const navigateToSubjectById = (id) => {
        navigate(`/groups/${params.groupId}/subjects/${id}`);
    }

    const parseLessonType = (lessonType) => {
        switch(lessonType) {
            case 0:
                return {variant: "", text: "NONE"};
            case 1:
                return {variant: "danger", text: "LECTURE"};
            case 2:
                return {variant: "success", text: "PRACTICE"};
        }
    }

    if (error) {
        return (
            <div className="center">
                <BackButton onClick={navigateToGroupById} />
                <Lottie
                    options={animationOptions(animation.loading_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />

                <p>Something went wrong, while fetching subjects</p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="center">
                <BackButton onClick={navigateToGroupById} />
                <div className="loader" />
            </div>
        )
    }

    if (subjects.length === 0) {
        return (
            <div className="center">
                <BackButton onClick={navigateToGroupById} />
                <Lottie
                    options={animationOptions(animation.nothing_here_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />
                <p>There aren`t any subjects in this group yet</p>
                
                <button
                    onClick={navigateToSubjectCreate}
                    style={{ width: "80%" }}>
                    Create subject
                </button>
            </div>
        )
    }

    return (
        <div className="center">
            <BackButton onClick={navigateToGroupById} />
            {
                subjects.map((subject, index) => 
                <div 
                    className="card" 
                    key={index} 
                    onClick={() => navigateToSubjectById(subject.id)}>
                    <div 
                        className="card-text-block" 
                        style={{width: "100%", paddingLeft: "10px"}}>
                        <h3 className="card-text">{subject.name}</h3>
                        <p className="card-text">{subject.teacherName}</p>
                    </div>

                    <div 
                        className={`tag ${parseLessonType(subject.lessonType).variant}`}
                        style={{marginRight: "10px"}}>
                        {parseLessonType(subject.lessonType).text}
                    </div>
                </div>)
            }

            <MainButton
                text="Create subject"
                onClick={navigateToSubjectCreate} />
        </div>
    )
}

export default SubjectsPage;
