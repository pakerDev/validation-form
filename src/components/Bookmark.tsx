import React from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

interface IBookmarkProp {
    isChecked: boolean;
    onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const Bookmark = (props: IBookmarkProp) => {
    const { isChecked, onClick } = { ...props };

    return (
        <div className='bookmark'>
            <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={isChecked}
                onClick={() => onClick}
                color='warning'
            />
        </div>
    );
};

export default Bookmark;
