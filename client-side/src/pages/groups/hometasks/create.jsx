import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../../Animations';
import Lottie from "react-lottie";
import { useState } from 'react';
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';

const CreateHometaskPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [content, setContent] = useState("");
    const [deadline, setDeadline] = useState("");
    const [isLoaded, setIsLoaded] = useState(true);
    const [error, setError] = useState(null);

    const handleCreateHometaskClick = async () => {
        const groupId = params.groupId;
        const subjectId = params.id;
        const initData = WebApp.initData;
        const hometaskInput = {
            content,
            deadline: new Date(deadline)
        };
        
        setIsLoaded(false);
        await API.hometasks.create(hometaskInput, groupId, subjectId, initData)
            .then((result) => {
                setIsLoaded(true);
                navigateToSubjectById();
            }, (error) => {
                setError(error);
                setIsLoaded(true);

                WebApp.showAlert(`${error.message}`);
            });
    }

    const navigateToSubjectById = () => navigate(`/groups/${params.groupId}/subjects/${params.id}`);

    return (
        <div className="center">
            <BackButton onClick={navigateToSubjectById} />
            <Lottie
                options={animationOptions(isLoaded ? animation.create_animation : 
                    animation.loading_animation)}
                height={"20%"}
                width={"20%"}
                style={{ margin: "10px" }}
            />

            <h1>New hometask</h1>
            <input 
                type="datetime-local" 
                value={deadline} 
                onChange={(e) => setDeadline(e.target.value)} />

            <span className={`text-input-label`}>
                ISO: {deadline ? new Date(deadline).toISOString() : 'not specified'}
            </span>
            
            <textarea 
                style={{ margin: "5px 5px", maxWidth: "90%" }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                disabled={!isLoaded} />
            

            <MainButton
                text="Create hometask"
                onClick={handleCreateHometaskClick} />
        </div>
    )
}

export default CreateHometaskPage;
