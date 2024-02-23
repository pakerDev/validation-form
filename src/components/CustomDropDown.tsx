import { IconButton, Menu, MenuItem, Fade } from "@mui/material";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";

const CustomDropDown = ({ homeViewMode }: { homeViewMode: (arg: string) => void }) => {
    const location = useLocation().pathname;

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
                <Link to={location === "/" ? "/dashboard" : "/"}>
                    <MenuItem id='studio' onClick={(e) => handleClose(e)}>
                        {location === "/" ? "後台" : "首頁"}
                    </MenuItem>
                </Link>
                {location === "/" && (
                    <MenuItem id='cardMode' onClick={(e) => handleClose(e)}>
                        切換瀏覽模式
                    </MenuItem>
                )}
                {location === "/dashboard" && (
                    <>
                        <MenuItem id='editTemp' onClick={(e) => handleClose(e)}>
                            編輯我的模板
                        </MenuItem>
                        <MenuItem id='editNav' onClick={(e) => handleClose(e)}>
                            編輯我的快選
                        </MenuItem>
                    </>
                )}
                <MenuItem id='upload' onClick={(e) => handleClose(e)}>
                    上傳新影片
                </MenuItem>
            </Menu>
        </div>
    );
};

export default CustomDropDown;
