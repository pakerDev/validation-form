import { IconButton, Menu, MenuItem, Fade } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";

const CustomDropDown = ({ homeViewMode }: { homeViewMode: (arg: string) => void }) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (e: React.MouseEvent<HTMLElement>) => {
        const target = e.target as HTMLButtonElement;
        homeViewMode(target.id);
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
                <MenuItem id='studio' onClick={(e) => handleClose(e)}>
                    切換前後台
                </MenuItem>
                <MenuItem id='cardMode' onClick={(e) => handleClose(e)}>
                    切換瀏覽模式
                </MenuItem>
            </Menu>
        </div>
    );
};

export default CustomDropDown;
