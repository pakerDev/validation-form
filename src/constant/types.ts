export type TModal = "WARNING" | "EDITOR" | "UPLOAD" | "PREVIEW" | "";

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
