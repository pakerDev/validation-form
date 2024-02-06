import React from "react";
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { Checkbox } from "@mui/material";

interface IBookmarkProp {
    isLiked: boolean;
    bookmarkClickHandler: React.MouseEventHandler<HTMLButtonElement>;
}

const Bookmark = (props: IBookmarkProp) => {
    const { isLiked, bookmarkClickHandler } = { ...props };

    return (
        <div className='bookmark'>
            <Checkbox
                icon={<FavoriteBorder />}
                checkedIcon={<Favorite />}
                checked={isLiked}
                onClick={() => bookmarkClickHandler}
                color='warning'
            />
        </div>
    );
};

export default Bookmark;
