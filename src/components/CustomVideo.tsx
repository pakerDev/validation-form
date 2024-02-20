interface IProps {
    width?: number;
    height?: number;
    url: string;
}

const videoCode = (url: string) => {
    let videoID = "";

    if (url.includes("www")) {
        const vIndex = url.indexOf("v=");
        if (vIndex !== -1) {
            const ampIndex = url.indexOf("&", vIndex);
            if (ampIndex !== -1) {
                videoID = url.substring(vIndex + 2, ampIndex);
            } else {
                videoID = url.substring(vIndex + 2);
            }
        }
    } else if (url.includes("youtu.be")) {
        const beIndex = url.indexOf(".be/");
        if (beIndex !== -1) {
            const questionIndex = url.indexOf("?", beIndex);
            if (questionIndex !== -1) {
                videoID = url.substring(beIndex + 4, questionIndex);
            } else {
                videoID = url.substring(beIndex + 4);
            }
        }
    }

    return videoID;
};

const customVideo = (props: IProps) => {
    const { width = 560, height = 315, url } = { ...props };
    const src = `https://www.youtube.com/embed/${videoCode(url)}/`;
    return (
        <iframe
            width={width}
            height={height}
            src={src}
            title='YouTube video player'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            allowFullScreen
        ></iframe>
    );
};

export default customVideo;
