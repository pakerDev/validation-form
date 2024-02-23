import React from "react";
import { allTagsType, initNav } from "../constant/types";
import { Button, ButtonProps } from "@mui/material";
import { tagIconConfig } from "../constant/configs";
import { fetchNav } from "../constant/main";

interface ICustomNavProps {
    homeNavStatus: (status: allTagsType) => void;
    status?: allTagsType;
}

const CustomNav = (props: ICustomNavProps) => {
    const { homeNavStatus, status = "all" } = props;
    const navList = fetchNav();
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        homeNavStatus(event.currentTarget.id as allTagsType);
    };

    return (
        <div className='row CustomNavContainer'>
            {navList.map((i, idx) => {
                return (
                    <Button
                        key={idx}
                        id={i}
                        variant={i === status ? "contained" : "outlined"}
                        size='small'
                        color={tagIconConfig[i].color as ButtonProps["color"]}
                        startIcon={i === status ? tagIconConfig[i].checkedIcon : tagIconConfig[i].icon}
                        onClick={(e) => handleClick(e)}
                    >
                        {tagIconConfig[i].label}
                    </Button>
                );
            })}
        </div>
    );
};

export default CustomNav;
