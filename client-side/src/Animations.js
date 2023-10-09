import nothing_here_animation from "./assets/nothing-here-animation.json";
import create_animation from "./assets/create-animation.json"; 
import loading_animation from "./assets/loading-animation.json";

const animation = {
    nothing_here_animation,
    create_animation,
    loading_animation
}

const animationOptions = (animationSource) => {
    const options = {
        loop: true,
        autoplay: true,
        animationData: animationSource,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return options;
}

export { animation, animationOptions };
