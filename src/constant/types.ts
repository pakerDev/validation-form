export type TModal = "WARNING" | "EDITOR" | "UPLOAD" | "PREVIEW" | "";

export type allTagsType = "bookmark" | "food" | "music" | "yellow" | "news" | "others" | "all";
export const allType: allTagsType[] = ["food", "music", "news", "others", "yellow"] as const;
export const initNav: allTagsType[] = ["all", "food", "bookmark", "yellow"] as const;
export const SettingNavList: allTagsType[] = ["food", "music", "news", "others"];

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
    info?: IMainData;
    modelData: (data: IMainData) => void;
}

export type TSearchBy = "title" | "desc";

export interface ISearchInfo {
    by: TSearchBy;
    keyWord: string;
}
