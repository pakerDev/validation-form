import React from "react";
import { allTagsType, allType } from "../constant/types.ts";
import { Button } from "@mui/material";
import { tagIconConfig } from "../constant/configs.tsx";

interface ICustomAllTagsProps {
    data: allTagsType[];
    onClick: () => React.MouseEvent<HTMLButtonElement>;
    isShowLabel: boolean;
}

const CustomAllTags = (props: ICustomAllTagsProps) => {
    const { data, onClick, isShowLabel = false } = props;

    return (
        <div>
            {allType.map((i, idx) => {
                return (
                    <Button
                        key={idx}
                        id={i}
                        variant={data.includes(i) ? "contained" : "outlined"}
                        onClick={onClick}
                        size='small'
                        color={tagIconConfig[i].color}
                        startIcon={data.includes(i) ? tagIconConfig[i].checkedIcon : tagIconConfig[i].icon}
                    >
                        {isShowLabel && tagIconConfig[i].label}
                    </Button>
                );
            })}
        </div>
    );
};

export default CustomAllTags;
