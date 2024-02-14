import { uploadConfig } from "./configs";
import { IMainData } from "./types";

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
        !!data.videoURL.match(uploadConfig["videoURL"].regex) &&
        !!data.imgURL.match(uploadConfig["imgURL"].regex) &&
        data.tag.length > 0 &&
        !!data.title.match(uploadConfig["title"].regex) &&
        !!data.desc[0].match(uploadConfig["desc"].regex);
    return canSubmit;
};

export const getTime = (timeStamp: number) => {
    var date = new Date(timeStamp);
    const time = date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate();
    return time;
};
