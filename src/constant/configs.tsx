import { ReactNode } from "react";
import { ButtonProps, CheckboxProps } from "@mui/material/";
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
    Pets,
} from "@mui/icons-material/";
import { IMainData } from "./types";

export const tagIconConfig: {
    [k in string]: {
        icon: ReactNode;
        checkedIcon: ReactNode;
        color?: ButtonProps["color"] | CheckboxProps["color"];
        label?: string;
    };
} = {
    bookmark: {
        icon: <FavoriteBorder />,
        checkedIcon: <Favorite />,
        color: "error",
        label: "書籤",
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
    all: {
        icon: <Pets />,
        checkedIcon: <Pets />,
        color: "primary",
        label: "全部",
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
    desc: ["Material UI is an open-source React component library."],
};

export const mainData: IMainData[] = [
    {
        videoURL: "https://www.youtube.com/watch?v=8vgHesaY3y8",
        imgURL: "https://images.unsplash.com/photo-1588514024543-d17d1724de49?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fG11aXxlbnwwfHwwfHx8MA%3D%3D",
        isLiked: false,
        isUploaded: true,
        createTime: 1707600742963,
        title: "Updating Lib",
        tag: ["music"],
        desc: ["Text fields allow users to enter text into a UI."],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=hCGiyI_NmRY",
        imgURL: "https://plus.unsplash.com/premium_photo-1706382043366-94f5ff009e15?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8",
        isLiked: true,
        isUploaded: true,
        createTime: 1707600742963,
        title: "Design Tutorial",
        tag: ["food", "others"],
        desc: ["Checkboxes can be used to turn an option on or off."],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=ObVSC-kTR6g",
        imgURL: "https://images.unsplash.com/photo-1705917674111-50bfa2607d05?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8fA%3D%3D",
        isLiked: false,
        isUploaded: true,
        createTime: 1707700742963,
        title: "Getting Start",
        tag: ["yellow", "others"],
        desc: ["Sliders allow users to make selections from a range of value"],
    },
    {
        videoURL: "https://youtu.be/dz84BX13LDo?si=DtDlF2_FnosDnrFk",
        imgURL: "https://plus.unsplash.com/premium_photo-1707241901869-56a54b8314ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
        isLiked: false,
        isUploaded: true,
        createTime: 1707800742963,
        title: "Something New",
        tag: ["news"],
        desc: ["The Radio Group allows the user to select one option."],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=Q-Y-C_S5HFY",
        imgURL: "https://images.unsplash.com/photo-1706378396388-03713938c8bc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        isLiked: true,
        isUploaded: true,
        createTime: 1707800742963,
        title: "TitleTitle",
        tag: ["music", "food"],
        desc: ["desc", "a", "b"],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=GEKLmXNUFaE",
        imgURL: "https://plus.unsplash.com/premium_photo-1707241901869-56a54b8314ee?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D",
        isLiked: true,
        isUploaded: false,
        createTime: 1707900742963,
        title: "GHIBLI",
        tag: ["food", "music"],
        desc: ["A fresh start with exciting opportunities."],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=sL1BNTU-4PI",
        imgURL: "https://images.unsplash.com/photo-1705624980194-6325687bb1aa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzMHx8fGVufDB8fHx8fA%3D%3D",
        isLiked: true,
        isUploaded: true,
        createTime: 1708000742963,
        title: "Tech Intro",
        tag: ["news", "others"],
        desc: ["Latest trends in technology."],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=UTtbOGRfG9E",
        imgURL: "https://images.unsplash.com/photo-1707879488050-25e94173c515?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8",
        isLiked: false,
        isUploaded: true,
        createTime: 1707965983018,
        title: "4HR music",
        tag: ["music", "others", "yellow"],
        desc: ["May each of you have a wonderfully productive day!"],
    },
    {
        videoURL: "https://www.youtube.com/watch?v=VJ8CaDuYKOU&list=RDVJ8CaDuYKOU&start_radio=1",
        imgURL: "https://i.ytimg.com/vi/VJ8CaDuYKOU/hqdefault.jpg?sqp=-oaymwEXCOADEI4CSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLBdGDEX0p63slYCWU86PghytJr3dQ",
        isLiked: false,
        isUploaded: true,
        createTime: 1707972463970,
        title: "青虫aoi媠花",
        tag: ["music", "news", "others"],
        desc: ["每個人都是獨一無二，也都是最美的"],
    },
];

export const initData: IMainData = {
    videoURL: "",
    imgURL: "",
    isLiked: false,
    isUploaded: true,
    createTime: Date.now(),
    title: "",
    tag: [],
    desc: [""],
};

const youtubeURLRegex = /^(https:\/\/www\.youtube\.com\/watch\?v*)|(https:\/\/youtu\.be\/[\w-]*)/;
const imgURLRegex = /^(https\:\/\/)|(http\:\/\/*)|(image)/;
const titleRegex = /[\w\u4e00-\u9fa5\s\,\:\.\(\)\-]/g;
const descRegex = /[\w\u4e00-\u9fa5\u3001-\u3017\，\。\,\.\'\"]/g;

export const uploadConfig: {
    [k in string]: {
        limit: number;
        regex?: RegExp;
        maxLength?: number;
    };
} = {
    videoURL: { limit: 1, regex: youtubeURLRegex },
    imgURL: { limit: 1, regex: imgURLRegex },
    title: {
        limit: 1,
        maxLength: 15,
        regex: titleRegex,
    },
    tag: { limit: 5 },
    desc: {
        limit: 3,
        maxLength: 60,
        regex: descRegex,
    },
};
