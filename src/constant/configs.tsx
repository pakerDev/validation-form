import { ReactNode } from "react";
import { CheckboxProps } from "@mui/material/";
import {
    FavoriteBorder,
    Favorite,
    MusicNote,
    MusicNoteOutlined,
    LocalCafe,
    LocalCafeOutlined,
    Sell,
    SellOutlined,
    PendingSharp,
    PendingOutlined,
    FeedOutlined,
    FeedRounded,
} from "@mui/icons-material/";
import { IMainData } from "./types";

export const tagIconConfig: {
    [k in string]: {
        icon: ReactNode;
        checkedIcon: ReactNode;
        color?: CheckboxProps["color"];
        label?: string;
    };
} = {
    bookmark: {
        icon: <FavoriteBorder />,
        checkedIcon: <Favorite />,
        color: "error",
    },
    food: {
        icon: <LocalCafeOutlined />,
        checkedIcon: <LocalCafe />,
        color: "success",
        label: "食物",
    },
    music: {
        icon: <MusicNoteOutlined />,
        checkedIcon: <MusicNote />,
        color: "primary",
        label: "音樂",
    },
    yellow: {
        icon: <SellOutlined />,
        checkedIcon: <Sell />,
        color: "warning",
        label: "黃標",
    },
    news: {
        icon: <FeedOutlined />,
        checkedIcon: <FeedRounded />,
        color: "secondary",
        label: "新聞",
    },
    others: {
        icon: <PendingOutlined />,
        checkedIcon: <PendingSharp />,
        color: "info",
        label: "其他",
    },
};

export const tempData: IMainData = {
    videoURL: "https://youtu.be/ObVSC-kTR6g?si=bIcS231uMsFCAtmu",
    imgURL: "https://yt3.googleusercontent.com/bAPgcc0NUsnRyyikb_X6cz4Wdv4vFGZ0PvdAZs6dHgeMjXcau5AM7aFqdFxzP_UBXlbwiBg4=s176-c-k-c0x00ffffff-no-rj",
    isLiked: false,
    isUploaded: true,
    createTime: Date.now(),
    title: "Mui for figma",
    tag: ["news", "others"],
    desc: [
        "Material UI is an open-source React component library.",
        `It's comprehensive and can be used in production out of the box`,
    ],
};

export const mainData: IMainData = [
    {
        videoURL: "https://www.youtube.com/watch?v=8vgHesaY3y8",
        imgURL: "https://i.ytimg.com/an_webp/8vgHesaY3y8/mqdefault_6s.webp?du=3000&sqp=CO2rqK4G&rs=AOn4CLBlofgWQdUaN9kFgNk-0u4GKgJYgA",
        isLiked: false,
        isUploaded: true,
        createTime: Date.now(),
        title: "Updating Lib",
        tag: ["music"],
        desc: ["Text fields allow users to enter text into a UI."],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=hCGiyI_NmRY",
        imgURL: "https://i.ytimg.com/an_webp/hCGiyI_NmRY/mqdefault_6s.webp?du=3000&sqp=COigqK4G&rs=AOn4CLAIlFpsnXTiECVgWphDWeZ_cL8Kww",
        isLiked: false,
        isUploaded: true,
        createTime: Date.now(),
        title: "Design Tutorial",
        tag: ["food", "others"],
        desc: ["Checkboxes can be used to turn an option on or off."],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=ObVSC-kTR6g",
        imgURL: "https://i.ytimg.com/an_webp/ObVSC-kTR6g/mqdefault_6s.webp?du=3000&sqp=CKCoqK4G&rs=AOn4CLC9F3frhObOdLEgLIfu_FHeezxWVQ",
        isLiked: false,
        isUploaded: true,
        createTime: Date.now(),
        title: "Getting Start",
        tag: ["yellow", "others"],
        desc: ["Sliders allow users to make selections from a range of value"],
    },
    {
        videoURL: "https://youtu.be/dz84BX13LDo?si=DtDlF2_FnosDnrFk",
        imgURL: "https://i.ytimg.com/an_webp/dz84BX13LDo/mqdefault_6s.webp?du=3000&sqp=CI6jqK4G&rs=AOn4CLA5cMO9Ikrt5rcZiOAXJqPx68BvXA",
        isLiked: false,
        isUploaded: true,
        createTime: Date.now(),
        title: "Something New",
        tag: ["news"],
        desc: ["The Radio Group allows the user to select one option."],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=Q-Y-C_S5HFY",
        imgURL: "https://images.unsplash.com/photo-1706378396388-03713938c8bc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isLiked: true,
        isUploaded: true,
        createTime: Date.now(),
        title: "TitleTitle",
        tag: ["tag"],
        desc: ["desc", "a", "b"],
    },
];
