import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { MainButton, BackButton } from '@twa-dev/sdk/react';
import Lottie from "react-lottie";
import { animation, animationOptions } from "../../../Animations";
import LessonTypeTag from "../../../components/LessonTypeTag";

const SubjectsPage = () => {
    const params = useParams();
    const navigate = useNavigate();

    const [userGroupInfo, setUserGroupInfo] = useState(null);
    const [subjects, setSubjects] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const groupId = params.groupId;

        const userGroupInfoRequest = API.groups.getUserInfo(groupId);
        const subjectsRequest = API.subjects.getByGroup(params.groupId);

        Promise.all([userGroupInfoRequest, subjectsRequest])
            .then(([userGroupInfoResponse, subjectsResponse]) => {
                setUserGroupInfo(userGroupInfoResponse);
                setSubjects(subjectsResponse);
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }, []);

    const navigateToGroupById = () => navigate(`/groups/${params.groupId}`);
    const navigateToSubjectCreate = () => navigate(`/groups/${params.groupId}/subjects/create`);
    const navigateToSubjectById = (id) => navigate(`/groups/${params.groupId}/subjects/${id}`);

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

                {
                    userGroupInfo.canEdit ?
                        <button
                            onClick={navigateToSubjectCreate}
                            style={{ width: "80%" }}>
                            Create subject
                        </button> : <></>
                }
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
                            style={{ width: "100%", paddingLeft: "10px" }}>
                            <h3 className="card-text">{subject.name}</h3>
                            <p className="card-text">{subject.teacherName}</p>
                        </div>

                        <LessonTypeTag
                            lessonType={subject.lessonType}
                            style={{ marginRight: "10px" }} />
                    </div>)
            }

            {
                userGroupInfo.canEdit ?
                    <MainButton
                        text="Create subject"
                        onClick={navigateToSubjectCreate} /> : <></>
            }
        </div>
    )
}

export default SubjectsPage;
