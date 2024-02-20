import React from "react";
import { IMainData, allTagsType } from "../constant/types";
import CustomImage from "./CustomImage";
import CustomSingleTag from "./CustomSingleTag";
import CustomBookmark from "./CustomBookmark";
import { getTime } from "../constant/main";
import { TableCell } from "@mui/material";

interface ICustomStudioItem {
    className?: string;
    data: IMainData;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const CustomStudioItem = (prop: ICustomStudioItem) => {
    const { data } = prop;
    const { title, tag, isUploaded, createTime } = data;

    return (
        <>
            <TableCell align='right' sx={{ width: 200 }}>
                {<CustomImage className='' width={160} height={80} data={data} />}
            </TableCell>
            <TableCell align='left' sx={{ width: 120 }}>
                {title}
            </TableCell>
            <TableCell align='left' sx={{ width: 120 }}>
                <div className='row'>
                    {tag.length !== 0 &&
                        tag.map((i: allTagsType) => {
                            return <CustomSingleTag type={i} key={i} />;
                        })}
                </div>
            </TableCell>
            <TableCell align='left' sx={{ width: 40 }}>
                {<CustomBookmark code={data.videoURL} />}
            </TableCell>
            <TableCell align='right' sx={{ width: 120 }}>
                {isUploaded ? "已上架" : "未上架"}
            </TableCell>
            <TableCell align='right' sx={{ width: 160 }}>
                {getTime(createTime)}
            </TableCell>
        </>
    );
};

export default CustomStudioItem;
