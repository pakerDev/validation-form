import { IconButton, InputBase, Menu, MenuItem, Fade } from "@mui/material";
import React, { useState } from "react";
import { Search } from "@mui/icons-material/";
import MenuIcon from "@mui/icons-material/Menu";

const CustomSearch = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <IconButton
                aria-label='menu'
                id='fadeButton'
                aria-controls={open ? "fadeMenu" : undefined}
                aria-haspopup='true'
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
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
                <MenuItem onClick={handleClose}>依標題</MenuItem>
                <MenuItem onClick={handleClose}>依內容</MenuItem>
            </Menu>
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder='輸入搜尋內容'
                inputProps={{ "aria-label": "輸入搜尋內容" }}
            />
            <IconButton type='button' aria-label='search'>
                <Search />
            </IconButton>
        </div>
    );
};

export default CustomSearch;
