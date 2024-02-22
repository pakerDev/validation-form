import React from "react";
import { allTagsType, allType } from "../constant/types.ts";
import { Button, ButtonProps } from "@mui/material";
import { tagIconConfig } from "../constant/configs.tsx";

interface ICustomAllTagsProps {
    data: allTagsType[];
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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
                        color={tagIconConfig[i].color as ButtonProps["color"]}
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
