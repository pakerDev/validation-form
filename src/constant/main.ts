import { mainData, uploadConfig } from "./configs";
import { IMainData, initNav } from "./types";

export const getVideoCode = (url: string) => {
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

export const checkCanSubmit = (data: IMainData) => {
    let canSubmit =
        !!data.videoURL.match(uploadConfig["videoURL"].regex as RegExp) &&
        !!data.imgURL.match(uploadConfig["imgURL"].regex as RegExp) &&
        data.tag.length > 0 &&
        !!data.title.match(uploadConfig["title"].regex as RegExp) &&
        !!data.desc[0].match(uploadConfig["desc"].regex as RegExp);
    return canSubmit;
};

export const getTime = (timeStamp: number) => {
    const date = new Date(timeStamp);

    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedTime = `${year}/${month}/${day} ${hours}:${minutes}`;
    return formattedTime;
};

export const fetchData = () => {
    return JSON.parse(localStorage.getItem("mainData") ?? "") || mainData;
};

export const fetchNav = () => {
    !localStorage.getItem("nav") && localStorage.setItem("nav", initNav.join());
    return (localStorage.getItem("nav") ?? "").split(",");
};

export const findData = (videoInfo: string) => {
    const savedDataJson = fetchData();
    const videoCode = videoInfo.match(uploadConfig["videoURL"].regex as RegExp) ? getVideoCode(videoInfo) : videoInfo;
    const dataIndex = savedDataJson.findIndex((i: IMainData) => getVideoCode(i.videoURL) === videoCode);
    const data = savedDataJson[dataIndex];
    return { dataIndex, data };
};
