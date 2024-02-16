import { useState, useEffect } from "react";
import Placeholder from "../assets/Placeholder.svg";
import YellowTagCover from "../assets/YellowTagCover.svg";
import { IMainData } from "../constant/types";
import { Button } from "@mui/material";

interface IProps {
    className?: string;
    width?: number;
    height?: number;
    data: IMainData;
    toVideo?: boolean;
    handleToVideo: (into: IMainData) => void;
}

const CustomImage = (props: IProps) => {
    const { width = 160, height = 120, className, data, toVideo = true, handleToVideo } = props;
    const { videoURL, imgURL, tag } = data;
    const isYellow = tag.includes("yellow");
    const [imageSrc, setImageSrc] = useState(imgURL);

    const imageValidate = () => {
        const img = new Image();
        img.onload = () => setImageSrc(isYellow ? YellowTagCover : imgURL);
        img.onerror = () => setImageSrc(Placeholder);
        img.src = imgURL;
    };

    const imgClickHandler = () => {
        handleToVideo(data);
    };

    useEffect(() => {
        imageValidate();
    }, [imgURL, isYellow]);

    return (
        <Button disabled={!toVideo} onClick={imgClickHandler} id={videoURL}>
            <img className={className} width={width} height={height} src={imageSrc} alt='Custom' />
        </Button>
    );
};

export default CustomImage;
