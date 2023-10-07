import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../../Animations';
import Lottie from "react-lottie";
import { useState, useEffect } from 'react';
import API from "../../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';

const HometaskByIdPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [hometask, setHometask] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const groupId = params.groupId;
        const hometaskId = params.id;
        const initData = WebApp.initData;

        API.hometasks.getById(groupId, hometaskId, initData)
            .then((result) => {
                setHometask(result);
                setIsLoaded(true);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            });

    }, []);

    const navigateBack = () => {
        navigate(-1);
    }

    if (!isLoaded) {
        return (
            <div className="center">
                <BackButton onClick={navigateBack} />
                <div className="loader" />
            </div>
        )
    }

    if (error || !hometask) {
        return (
            <div className="center">
                <BackButton onClick={navigateBack} />

                <Lottie
                    options={animationOptions(animation.nothing_here_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />
                <p>There isn`t any hometask yet</p>
            </div>
        )
    }

    return (
        <div className='center'>
            <BackButton onClick={navigateBack} />
            
            <div className={`tag ${Date.now() < new Date(hometask.deadline) ? 
                "success" : "danger"}`} style={{margin: "5px 0px 0px 0px"}}>
                {new Date(hometask.deadline).toLocaleString()}
            </div>
            
            <h3 style={{lineHeight: "30px"}}>{hometask.content}</h3>
        </div>
    )
}

export default HometaskByIdPage;
