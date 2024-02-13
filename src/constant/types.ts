type ILabel = "Title" | "Tag" | "Description";

export type allTagsType = "bookmark" | "food" | "music" | "yellow" | "news" | "others";
export const allType: allTagsType[] = ["food", "music", "news", "others", "yellow"] as const;

export interface IMainData {
    videoURL: string;
    imgURL: string;
    isLiked: boolean;
    isUploaded: boolean;
    createTime: number;
    title: string;
    tag: allTagsType[];
    desc: string[];
}
export interface IEditorModal {
    data: IMainData;
}

export const youtubeURLRegex = /^[https://www.youtube.com/\*v=]|[https://youtu.be/\*?si]*/;
export const imgURLRegex = /^[https://www.]|[http://]*/;
export const titleRegex = /[\w\u4e00-\u9fa5\s\,\:\.\(\)\-]/g;
export const descRegex = /[\w\u4e00-\u9fa5\u3001-\u3017\，\。\,\.\'\"\s]/g;
