import React from "react";
import { IMainData, allTagsType } from "../constant/types";
import CustomImage from "./CustomImage";
import CustomSingleTag from "./CustomSingleTag";
import CustomBookmark from "./CustomBookmark";
import { getTime } from "../constant/main";

interface ICustomStudioItem {
    className?: string;
    data: IMainData;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomStudioItem = (prop: ICustomStudioItem) => {
    const { data } = prop;
    const { title, tag, isUploaded, createTime } = data;

    return (
        <div className='customStudioItemContainer row'>
            <CustomImage className='' width={160} height={80} data={data} />
            <div className='customStudioItemTitle customStudioItem'>{title}</div>
            <div className='customStudioItemTag customStudioItem row'>
                {tag.length !== 0 &&
                    tag.map((i: allTagsType) => {
                        return <CustomSingleTag type={i} key={i} />;
                    })}
            </div>
            <div className='customStudioItemLike customStudioItem'>
                <CustomBookmark code={data.videoURL} />
            </div>
            {isUploaded ? (
                <div className='column customStudioItem'>已上架</div>
            ) : (
                <div className='column customStudioItem red'>未上架</div>
            )}
            <div className='customStudioItem'>{getTime(createTime)}</div>
        </div>
    );
};

export default CustomStudioItem;
