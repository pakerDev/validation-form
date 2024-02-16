import React from "react";
import { allTagsType, bookmarkType } from "../constant/types";
import { Button } from "@mui/material";
import { tagIconConfig } from "../constant/configs";

interface ICustomNavProps {
    homeNavStatus: (status: allTagsType) => void;
    status?: allTagsType;
}

const CustomNav = (props: ICustomNavProps) => {
    const { homeNavStatus, status = "all" } = props;
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        homeNavStatus(event.currentTarget.id as allTagsType);
    };

    return (
        <div className='row CustomNavContainer'>
            {bookmarkType.map((i, idx) => {
                return (
                    <Button
                        key={idx}
                        id={i}
                        variant={i === status ? "contained" : "outlined"}
                        size='small'
                        color={tagIconConfig[i].color}
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
