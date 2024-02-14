import React from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

interface IBookmarkProp {
    isChecked: boolean;
    iconSize?: number;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomBookmark = (props: IBookmarkProp) => {
    const { isChecked, iconSize = 20, onClick } = { ...props };

    return (
        <div className='bookmark'>
            <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={isChecked}
                onClick={onClick}
                color='warning'
                sx={{ "& .MuiSvgIcon-root": { fontSize: iconSize }, "&": { padding: 0 } }}
            />
        </div>
    );
};

export default CustomBookmark;
