import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../../Animations';
import Lottie from "react-lottie";
import TextInput from '../../../components/TextInput';
import { useState } from 'react';
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';
import RadioButton from '../../../components/RadioButton';

const CreateSubjectPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [name, setName] = useState("");
    const [lessonType, setLessonType] = useState(0);
    const [teacherName, setTeacherName] = useState("");

    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);

    const handleCreateSubjectClick = async () => {
        const groupId = params.groupId;
        const initData = WebApp.initData;
        const subjectInput = {
            name,
            lessonType,
            teacherName
        };

        setIsLoaded(false);
        await API.subjects.create(subjectInput, groupId, initData)
            .then((result) => {
                setIsLoaded(true);
                navigateToSubjects();
            }, (error) => {
                setIsLoaded(true);
                setError(error);

                WebApp.showAlert(`${error.message}`);
            });
    }

    const navigateToSubjects = () => navigate(`/groups/${params.groupId}/subjects`);

    return (
        <div className="center">
            <BackButton onClick={navigateToSubjects} />

            <Lottie
                options={animationOptions(isLoaded ? animation.create_animation :
                    animation.loading_animation)}
                height={"20%"}
                width={"20%"}
                style={{ margin: "10px" }}
            />

            <h1>New subject</h1>

            <TextInput
                style={{ margin: "5px 5px" }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                labelText="Name"
                disabled={!isLoaded} />

            <div className="radio-group">
                <RadioButton
                    index={0}
                    variant=""
                    label="NONE"
                    onChange={(index) => setLessonType(index)}
                    isChecked={lessonType == 0} />
                <RadioButton
                    index={1}
                    variant="danger"
                    label="LECTURE"
                    onChange={(index) => setLessonType(index)}
                    isChecked={lessonType == 1} />
                <RadioButton
                    index={2}
                    variant="success"
                    label="PRACTISE"
                    onChange={(index) => setLessonType(index)}
                    isChecked={lessonType == 2} />
            </div>

            <TextInput
                style={{ margin: "5px 5px" }}
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                labelText="Teacher name"
                disabled={!isLoaded} />

            <MainButton
                text="Create subject"
                onClick={handleCreateSubjectClick} />
        </div>
    )
}

export default CreateSubjectPage;
