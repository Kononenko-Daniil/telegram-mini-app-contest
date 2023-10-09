import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../../Animations';
import Lottie from "react-lottie";
import { useState, useEffect } from 'react';
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';
import services from '../../../misc/Services';
import LessonTypeTag from '../../../components/LessonTypeTag';
import HometasksList from '../../../components/HometasksList';

const SubjectByIdPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [userGroupInfo, setUserGroupInfo] = useState(null);
    const [subject, setSubject] = useState(null);
    const [hometasks, setHometasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const groupId = params.groupId;
        const subjectId = params.id;
        const initData = WebApp.initData;

        const subjectByIdRequest = API.subjects.getById(groupId, subjectId, initData);
        const hometasksBySubjectRequest = API.hometasks.getBySubject(groupId, subjectId, initData);
        const userGroupInfoRequest = API.groups.getUserInfo(groupId, initData);

        Promise.all([userGroupInfoRequest, subjectByIdRequest, hometasksBySubjectRequest])
            .then(([userGroupInfoResponse, subjectByIdResponse, hometasksBySubjectResponse]) => {
                setUserGroupInfo(userGroupInfoResponse);
                setSubject(subjectByIdResponse);
                setHometasks(hometasksBySubjectResponse);
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }, []);

    const navigateToSubjects = () => navigate(`/groups/${params.groupId}/subjects/`);
    const navigateToHometaskCreate = () => navigate(`/groups/${params.groupId}/subjects/${params.id}/hometasks/create`);

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
            <BackButton onClick={navigateToSubjects} />

            <div style={{ overflow: "hidden" }} className='center'>
                <LessonTypeTag lessonType={subject.lessonType} />
                <h2>{subject.name}</h2>
                <p>{subject.teacherName}</p>
            </div>

            {
                hometasks.length === 0 ?
                    <>
                        <Lottie
                            options={animationOptions(animation.nothing_here_animation)}
                            height={"20%"}
                            width={"20%"}
                            style={{ margin: "10px" }}
                        />

                        <p>There aren`t any hometasks yet</p>
                    </> : <></>
            }
            
            <HometasksList hometasks={hometasks} groupId={params.groupId} userGroupInfo={userGroupInfo} />

            {
                userGroupInfo.canEdit ?
                    <MainButton
                        text="Create hometask"
                        onClick={navigateToHometaskCreate} /> : <></>
            }

        </div>
    )
}

export default SubjectByIdPage;
