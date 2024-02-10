import { useState, useEffect } from "react";
import ImagePlaceholder from "../assets/imagePlaceholder.svg";

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
        img.onerror = () => setImageSrc(ImagePlaceholder);

        if (isYellow) {
            setImageSrc(ImagePlaceholder);
        } else {
            img.src = url;
        }
    }, [url, isYellow]);

    return <img className={className} width={width} height={height} src={imageSrc} alt='Custom' />;
};

export default CustomImage;
