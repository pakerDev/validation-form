import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { CloudDownload, CloudUpload, Edit, Delete } from "@mui/icons-material";
import { IMainData, TModal } from "../constant/types";
import CustomEditorModal from "../container/CustomEditorModal";
import CustomStudioItem from "./CustomStudioItem";
import { fetchData } from "../constant/main";

const CustomStudioContainer = () => {
    const [savedDataJson, setSavedDataJson] = useState(fetchData());
    const [editorModalProp, setEditorModalProp] = useState<{ type: TModal; data: IMainData | undefined }>({
        type: "",
        data: undefined,
    });

    const uploadClickHandler = (code: string) => {
        const thisIndex = savedDataJson.findIndex((i: IMainData) => i.videoURL === code);
        if (thisIndex !== -1) {
            savedDataJson[thisIndex].isUploaded = !savedDataJson[thisIndex].isUploaded;
            localStorage.setItem("mainData", JSON.stringify(savedDataJson));
            setSavedDataJson(fetchData());
        }
    };

    const editClickHandler = (code: string) => {
        const thisIndex = savedDataJson.findIndex((i: IMainData) => i.videoURL === code);
        if (thisIndex !== -1) {
            setEditorModalProp({ type: "EDITOR", data: savedDataJson[thisIndex] });
        }
    };

    const dropClickHandler = (code: string) => {
        const thisIndex = savedDataJson.findIndex((i: IMainData) => i.videoURL === code);
        if (thisIndex !== -1) {
            savedDataJson.splice(thisIndex, 1);
            localStorage.setItem("mainData", JSON.stringify(savedDataJson));
            setSavedDataJson(fetchData());
        }
    };

    useEffect(() => {
        setSavedDataJson(fetchData());
    }, [editorModalProp.type]);

    return (
        <div>
            {savedDataJson.map((data: IMainData) => {
                return (
                    <div className='row'>
                        <CustomStudioItem data={data} />
                        <div className='customStudioItem'>
                            <div className='column customStudioItem'>
                                {data.isUploaded ? (
                                    <Button
                                        startIcon={<CloudDownload />}
                                        onClick={() => uploadClickHandler(data.videoURL)}
                                        variant='outlined'
                                    >
                                        下架影片
                                    </Button>
                                ) : (
                                    <Button
                                        startIcon={<CloudUpload />}
                                        onClick={() => uploadClickHandler(data.videoURL)}
                                        variant='outlined'
                                    >
                                        上架影片
                                    </Button>
                                )}
                            </div>
                            <Button
                                startIcon={<Edit />}
                                onClick={() => editClickHandler(data.videoURL)}
                                size='small'
                                color='success'
                            >
                                編輯
                            </Button>
                            <Button
                                startIcon={<Delete />}
                                onClick={() => dropClickHandler(data.videoURL)}
                                size='small'
                                color='warning'
                            >
                                丟棄
                            </Button>
                        </div>
                    </div>
                );
            })}

            {
                <CustomEditorModal
                    closePopupHandler={() => setEditorModalProp({ type: "", data: undefined })}
                    {...editorModalProp}
                />
            }
        </div>
    );
};

export default CustomStudioContainer;
