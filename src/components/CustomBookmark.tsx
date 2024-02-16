import { useState, useEffect } from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Checkbox } from "@mui/material";
import { IMainData } from "../constant/types";
import { fetchData } from "../constant/main";

interface IBookmarkProp {
    code: string;
    iconSize?: number;
}

const CustomBookmark = ({ code, iconSize = 24 }: IBookmarkProp) => {
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        const savedDataJson = fetchData();
        const thisIndex = savedDataJson.findIndex((i: IMainData) => i.videoURL === code);
        if (thisIndex !== -1) {
            setIsLiked(savedDataJson[thisIndex].isLiked);
        }
    }, [code]);

    const bookmarkClickHandler = () => {
        const savedDataJson = fetchData();
        const thisIndex = savedDataJson.findIndex((i: IMainData) => i.videoURL === code);

        if (thisIndex !== -1) {
            savedDataJson[thisIndex].isLiked = !savedDataJson[thisIndex].isLiked;
            localStorage.setItem("mainData", JSON.stringify(savedDataJson));
            setIsLiked(savedDataJson[thisIndex].isLiked);
        }
    };

    return (
        <div className='bookmark'>
            <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={isLiked}
                onClick={bookmarkClickHandler}
                color='warning'
                sx={{ "& .MuiSvgIcon-root": { fontSize: iconSize }, "&": { padding: 0 } }}
            />
        </div>
    );
};

export default CustomBookmark;
