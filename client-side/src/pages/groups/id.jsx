import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../Animations';
import Lottie from "react-lottie";
import TextInput from '../../components/TextInput';
import { useState, useEffect } from 'react';
import API from "../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';

const TabCard = (props) => {
    const { name, description, callback, logoText } = props;

    return (
        <div className="card" style={{ width: "100%" }} onClick={callback}>
            <div className='card-logo'>
                {logoText}
            </div>
            <div className="card-text-block">
                <h2 className="card-text">{name}</h2>
                <p className="card-text">{description}</p>
            </div>
        </div>
    )
}

const GroupByIdPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [isLoaded, setIsLoaded] = useState(false);
    const [group, setGroup] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        API.groups.getById(params.id, WebApp.initData)
            .then((result) => {
                setIsLoaded(true);
                setGroup(result);
            }, (error) => {
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    if (!isLoaded) {
        return (
            <div className="center">
                <BackButton onClick={() => navigate("/")} />
                <div className="loader" />
            </div>
        )
    } else {
        if (group) {
            return (
                <div className='center' style={{ overflow: "hidden" }}>
                    <BackButton onClick={() => navigate("/")} />
                    <div className='avatar lg'>
                        <h3 className={"avatar-text"}>{group.name.slice(0, 2)}</h3>
                    </div>
                    <h1>{group.name}</h1>
                    <p>{group.description}</p>

                    <TabCard
                        name={"Hometasks"}
                        description={"View your hometasks"}
                        logoText={"👨‍🏫"}
                        callback={() => navigate(`/groups/${group.id}/hometasks`)} />

                    <TabCard
                        name={"Subjects"}
                        description={"View your subjects"}
                        logoText={"📒"}
                        callback={() => navigate(`/groups/${group.id}/subjects`)} />

                    <TabCard
                        name={"Links"}
                        description={"Useful links"}
                        logoText={"📌"}
                        callback={() => navigate(`/groups/${group.id}/links`)} />
                </div>
            )
        } else {
            return (
                <div className="center">
                    <BackButton onClick={() => navigate("/")} />

                    <Lottie
                        options={animationOptions(animation.nothing_here_animation)}
                        height={"50%"}
                        width={"50%"}
                        style={{ margin: "10px" }}
                    />
                    <p>There isn`t any group yet</p>

                    <MainButton
                        text="To my groups"
                        onClick={() => navigate("/")} />
                </div>
            )
        }
    }
}

export default GroupByIdPage;
