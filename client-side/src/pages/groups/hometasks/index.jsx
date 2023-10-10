import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../../Animations';
import Lottie from "react-lottie";
import { useState, useEffect } from 'react';
import API from "../../../api";
import { useNavigate, useParams } from 'react-router-dom';
import HometasksList from '../../../components/HometasksList';

const HometasksPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [userGroupInfo, setUserGroupInfo] = useState(null);
    const [hometasks, setHometasks] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        getHometasks();
    }, []);

    const getHometasks = async () => {
        setIsLoaded(false);
        const groupId = params.groupId;

        const hometasksByGroup = await API.hometasks.getByGroup(groupId);
        const userGroupInfoRequest = await API.groups.getUserInfo(groupId);

        await Promise.all([userGroupInfoRequest, hometasksByGroup])
            .then(([userGroupInfoResponse, hometasksByGroupResponse]) => {
                setUserGroupInfo(userGroupInfoResponse);
                setHometasks(hometasksByGroupResponse);
                setIsLoaded(true);
            })
            .catch((error) => {
                setError(error);
                setIsLoaded(true);
            });
    }

    const navigateBack = () => navigate(-1);

    if (error) {
        return (
            <div className="center">
                <BackButton onClick={navigateBack} />
                <Lottie
                    options={animationOptions(animation.loading_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />

                <p>Something went wrong, while fetching hometasks</p>
            </div>
        )
    }

    if (!isLoaded) {
        return (
            <div className="center">
                <BackButton onClick={navigateBack} />
                <div className="loader" />
            </div>
        )
    }

    if (hometasks.length === 0) {
        return (
            <div className="center">
                <BackButton onClick={navigateBack} />
                <Lottie
                    options={animationOptions(animation.nothing_here_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />
                <p>There aren`t any hometasks in this group yet</p>
                <MainButton
                    text="Return to group"
                    onClick={navigateBack} />
            </div>
        )
    }

    return (
        <div className='center'>
            <BackButton onClick={navigateBack} />
            <HometasksList 
                hometasks={hometasks} 
                groupId={params.groupId} 
                userGroupInfo={userGroupInfo}
                onDeleting={getHometasks} />
        </div>
    )
}

export default HometasksPage;
