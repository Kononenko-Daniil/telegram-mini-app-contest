import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../../Animations';
import Lottie from "react-lottie";
import { useState, useEffect } from 'react';
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';

const HometasksPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [hometasks, setHometasks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const groupId = params.groupId;
        const initData = WebApp.initData;

        API.hometasks.getByGroup(groupId, initData)
            .then((result) => {
                setHometasks(result);
                setIsLoaded(true);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            });

    }, []);

    const navigateBack = () => {
        navigate(-1);
    }

    const navigateToHometask = (id) => {
        navigate(`/groups/${params.groupId}/hometasks/${id}`);
    }

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
            {
                hometasks.map((hometask, index) =>
                    <div className="card" key={index}
                        onClick={() => navigateToHometask(hometask.id)}>
                        <div
                            className="card-text-block"
                            style={{ width: "100%", paddingLeft: "10px" }}>
                            <div className={`tag ${Date.now() < new Date(hometask.deadline) ?
                                "success" : "danger"}`} style={{ margin: "5px 0px 0px 0px" }}>
                                {new Date(hometask.deadline).toLocaleString()}
                            </div>
                            <h3 className="card-text">{hometask.content}</h3>
                        </div>
                    </div>)
            }
        </div>
    )
}

export default HometasksPage;
