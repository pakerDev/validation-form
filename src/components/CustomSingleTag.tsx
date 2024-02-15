import React from "react";
import { Checkbox } from "@mui/material/";
import { allTagsType } from "../constant/types";
import { tagIconConfig } from "../constant/configs";

interface ICustomTagProp {
    type: allTagsType;
    isChecked?: boolean;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    isShowLabel?: boolean;
    iconSize?: number;
}

const CustomSingleTag = (props: ICustomTagProp) => {
    const { type, isChecked = true, onClick, isShowLabel = false, iconSize = 20 } = props;
    const { icon, checkedIcon, color, label } = tagIconConfig[type];

    // todo label color

    return (
        <div className='row customSingleTagContainer'>
            <Checkbox
                className='customIconBtnIcon'
                icon={icon}
                checkedIcon={checkedIcon}
                checked={isChecked}
                color={color}
                id={type}
                onClick={onClick}
                sx={{ "& .MuiSvgIcon-root": { fontSize: iconSize }, "&": { padding: 0 } }}
            />
            {isShowLabel && (
                <label className='customIconBtnLabel' htmlFor={type} color={color}>
                    {label}
                </label>
            )}
        </div>
    );
};

export default CustomSingleTag;
