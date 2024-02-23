import { IconButton, InputBase, Menu, MenuItem, Fade, Box } from "@mui/material";
import React, { useState } from "react";
import { Search, KeyboardArrowDown } from "@mui/icons-material/";
import { ISearchInfo, TSearchBy } from "../constant/types";
import CheckIcon from "@mui/icons-material/Check";

interface ICustomSearchProps {
    homeSearch: ({ by, keyWord }: ISearchInfo) => void;
}

const CustomSearch = (props: ICustomSearchProps) => {
    const { homeSearch } = props;
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [homeSearchArg, setHomeSearchArg] = useState<ISearchInfo>({ by: "title", keyWord: "" });

    const open = Boolean(anchorEl);

    const searchBy = {
        title: "請輸入 標題 關鍵字",
        desc: "請輸入 內容 關鍵字",
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e: React.MouseEvent<HTMLLIElement>) => {
        const target = e.target as HTMLButtonElement;
        const id = target.id as TSearchBy;
        setHomeSearchArg({ ...homeSearchArg, by: id });
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
                    {homeSearchArg.by === "title" ? <CheckIcon /> : <Box width={24} />}
                    找標題
                </MenuItem>
                <MenuItem id='desc' onClick={handleClose}>
                    {homeSearchArg.by === "desc" ? <CheckIcon /> : <Box width={24} />}
                    找內容
                </MenuItem>
            </Menu>
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder={searchBy[homeSearchArg.by]} onBlur={inputBlurHandler} />
            <IconButton type='button' aria-label='search' onClick={searchClickHandler}>
                <Search />
            </IconButton>
        </div>
    );
};

export default CustomSearch;
