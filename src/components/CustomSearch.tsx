import { IconButton, InputBase, Menu, MenuItem, Fade } from "@mui/material";
import React, { useState } from "react";
import { Search, KeyboardArrowDown } from "@mui/icons-material/";
import { IMainData, ISearchInfo } from "../constant/types";

interface ICustomSearchProps {
    homeSearch: ({ by, keyWord }: ISearchInfo) => void;
}

const CustomSearch = (props: ICustomSearchProps) => {
    const { homeSearch } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [homeSearchArg, setHomeSearchArg] = useState<ISearchInfo>({ by: "title", keyWord: "" });

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLButtonElement;
        setHomeSearchArg({ ...homeSearchArg, by: target.id as keyof IMainData });
        setAnchorEl(null);
    };

    const inputBlurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setHomeSearchArg({ ...homeSearchArg, keyWord: e.target.value });
    };

    const searchClickHandler = () => {
        homeSearch(homeSearchArg);
    };

    return (
        <div className='customSearchContainer'>
            <IconButton
                aria-label='menu'
                id='fadeButton'
                aria-controls={open ? "fadeMenu" : undefined}
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <KeyboardArrowDown />
            </IconButton>
            <Menu
                id='fadeMenu'
                MenuListProps={{
                    "aria-labelledby": "fadeButton",
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Fade}
            >
                <MenuItem id='title' onClick={handleClose}>
                    依標題
                </MenuItem>
                <MenuItem id='desc' onClick={handleClose}>
                    依內容
                </MenuItem>
            </Menu>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder='輸入搜尋關鍵字' onBlur={inputBlurHandler} />
            <IconButton type='button' aria-label='search' onClick={searchClickHandler}>
                <Search />
            </IconButton>
        </div>
    );
};

export default CustomSearch;
