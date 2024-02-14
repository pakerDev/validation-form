import React, { useState } from "react";
import CustomStudioItem from "./CustomStudioItem";
import { IMainData } from "../constant/types";
import { Button } from "@mui/material";
import { CloudDownload, CloudUpload, Edit, Delete } from "@mui/icons-material";
import EditorModal from "../container/EditorModal";
import { mainData } from "../constant/configs";

const CustomStudioContainer = () => {
    const [savedDataJson, setSavedDataJson] = useState(JSON.parse(localStorage.getItem("mainData") ?? ""));
    const [editorModalProp, setEditorModalProp] = useState({
        type: "",
        data: mainData[0],
    });

    return (
        <div>
            {savedDataJson.map((data: IMainData) => {
                return (
                    <div className='row'>
                        <CustomStudioItem data={data} />
                        <div className='customStudioItem'>
                            {data.isUploaded ? (
                                <div className='column customStudioItem'>
                                    <Button startIcon={<CloudDownload />} onClick={() => {}} variant='outlined'>
                                        下架影片
                                    </Button>
                                </div>
                            ) : (
                                <div className='column customStudioItem'>
                                    <Button startIcon={<CloudUpload />} onClick={() => {}} variant='outlined'>
                                        上架影片
                                    </Button>
                                </div>
                            )}
                            <Button startIcon={<Edit />} onClick={() => {}} size='small' color='success'>
                                edit
                            </Button>
                            <Button startIcon={<Delete />} onClick={() => {}} size='small' color='warning'>
                                drop
                            </Button>
                        </div>
                    </div>
                );
            })}

            {<EditorModal closePopupHandler={() => {}} confirmPopupHandler={() => {}} {...editorModalProp} />}
        </div>
    );
};

export default CustomStudioContainer;
