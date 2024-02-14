import { Button, Checkbox, IconButton } from "@mui/material";
import React from "react";
import { IMainData, allTagsType } from "../constant/types";
import CustomImage from "./CustomImage";
import CustomSingleTag from "./CustomSingleTag";
import CustomBookmark from "./CustomBookmark";
import { CloudDownload, CloudUpload } from "@mui/icons-material";
import { getTime } from "../constant/main";

interface ICustomStudioItem {
    className?: string;
    data: IMainData;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomStudioItem = (prop: ICustomStudioItem) => {
    const { className, data, onClick } = prop;
    const { imgURL = "@/asset/imagePlaceholder.svg", title, tag, desc, isLiked, isUploaded, createTime } = data;

    return (
        <div className='customStudioItemContainer row'>
            {/* <Checkbox onClick={onClick} /> */}
            <CustomImage className='' url={imgURL} width={160} height={80} isYellow={data.tag.includes("yellow")} />
            <div className='customStudioItemTitle customStudioItem'>{title}</div>
            <div className='customStudioItemTag customStudioItem row'>
                {tag.length !== 0 &&
                    tag.map((i: allTagsType) => {
                        return <CustomSingleTag type={i} key={i} />;
                    })}
            </div>
            <div className='customStudioItemLike customStudioItem'>
                <CustomBookmark isChecked={isLiked} />
            </div>
            {isUploaded ? (
                <div className='column customStudioItem'>已上架</div>
            ) : (
                <div className='column customStudioItem'>未上架</div>
            )}
            <div className='customStudioItem'>{getTime(createTime)}</div>
        </div>
    );
};

export default CustomStudioItem;
