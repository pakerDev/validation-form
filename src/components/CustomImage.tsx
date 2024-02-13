import { useState, useEffect } from "react";
import Placeholder from "../assets/Placeholder.svg";
import YellowTagCover from "../assets/YellowTagCover.svg";

interface IProps {
    className?: string;
    width?: number;
    height?: number;
    url: string;
    isYellow?: boolean;
}

const CustomImage = (props: IProps) => {
    const { width = 160, height = 120, url, isYellow = false, className } = props;
    const [imageSrc, setImageSrc] = useState(url);

    useEffect(() => {
        const img = new Image();
        img.onload = () => setImageSrc(url);
        img.onerror = () => setImageSrc(Placeholder);

        if (isYellow) {
            setImageSrc(YellowTagCover);
        } else {
            img.src = url;
        }
    }, [url, isYellow]);

    return <img className={className} width={width} height={height} src={imageSrc} alt='Custom' />;
};

export default CustomImage;
