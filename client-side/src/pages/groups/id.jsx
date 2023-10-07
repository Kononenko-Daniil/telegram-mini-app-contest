import { MainButton, BackButton } from '@twa-dev/sdk/react';
import { animation, animationOptions } from '../../Animations';
import Lottie from "react-lottie";
import { useState, useEffect } from 'react';
import API from "../../api";
import WebApp from "@twa-dev/sdk";
import { useNavigate, useParams } from 'react-router-dom';
import TabCard from '../../components/TabCard';

const GroupByIdPage = () => {
    const navigate = useNavigate();
    const params = useParams();

    const [group, setGroup] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
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

    const navigateHome = () => {
        navigate("/");
    }

    const navigateToTabPage = (tabName) => {
        navigate(`/groups/${group.id}/${tabName}`)
    }

    if (!isLoaded) {
        return (
            <div className="center">
                <BackButton onClick={navigateHome} />

                <div className="loader" />
            </div>
        )
    }

    if (error || !group) {
        return (
            <div className="center">
                <BackButton onClick={navigateHome} />

                <Lottie
                    options={animationOptions(animation.nothing_here_animation)}
                    height={"50%"}
                    width={"50%"}
                    style={{ margin: "10px" }}
                />

                <p>There isn`t any group yet</p>

                <MainButton
                    text="My groups"
                    onClick={navigateHome} />
            </div>
        )
    }

    return (
        <div className='center'>
            <BackButton onClick={navigateHome} />

            <div style={{ overflow: "hidden" }} className='center'>
                <div className='avatar lg'>
                    <h3 className={"avatar-text"}>
                        {group.name.slice(0, 2)}
                    </h3>
                </div>
                <h1>{group.name}</h1>
                <p>{group.description}</p>
            </div>

            <TabCard
                name={"Hometasks"}
                description={"View your hometasks"}
                logoText={"👨‍🏫"}
                onClick={() => navigateToTabPage("hometasks")} />

            <TabCard
                name={"Subjects"}
                description={"View your subjects"}
                logoText={"📒"}
                onClick={() => navigateToTabPage("subjects")} />

            <TabCard
                name={"Links"}
                description={"Useful links"}
                logoText={"📌"}
                onClick={() => navigateToTabPage("links")} />
        </div>
    )
}

export default GroupByIdPage;
