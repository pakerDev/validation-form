import { useState, useEffect } from "react";
import Placeholder from "../assets/Placeholder.svg";
import YellowTagCover from "../assets/YellowTagCover.svg";
import { IMainData } from "../constant/types";
import { Link } from "react-router-dom";
import { getVideoCode } from "../constant/main";

interface IProps {
    className?: string;
    width?: number;
    height?: number;
    data: IMainData;
    toVideo?: boolean;
}

const CustomImage = (props: IProps) => {
    const { width = 160, height = 120, className, data } = props;
    const { videoURL, imgURL, tag } = data;
    const isYellow = tag.includes("yellow");
    const [imageSrc, setImageSrc] = useState(imgURL);

    const imageValidate = () => {
        const img = new Image();
        img.onload = () => setImageSrc(isYellow ? YellowTagCover : imgURL);
        img.onerror = () => setImageSrc(Placeholder);
        img.src = imgURL;
    };

    useEffect(() => {
        imageValidate();
    }, [imgURL, isYellow]);

    return (
        <Link to={`/video/${getVideoCode(videoURL)}`}>
            <img className={className} width={width} height={height} src={imageSrc} alt='Custom' />
        </Link>
    );
};

export default CustomImage;
