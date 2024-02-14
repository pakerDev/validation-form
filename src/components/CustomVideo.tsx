import { getVideoCode } from "../constant/main";

interface IProps {
    width?: number;
    height?: number;
    url: string;
}

const customVideo = (props: IProps) => {
    const { width = 560, height = 315, url } = { ...props };
    const src = `https://www.youtube.com/embed/${getVideoCode(url)}/`;
    return (
        <iframe
            width={width}
            height={height}
            src={src}
            title='YouTube video player'
            frameorder='0'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        ></iframe>
    );
};

export default customVideo;
