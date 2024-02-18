import { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import CustomAllTags from "../components/CustomAllTags";
import { Button, IconButton, Link } from "@mui/material";
import CustomSwitch from "./CustomSwitch";
import CustomPreviewPro from "./CustomPreviewPro";
import { AddCircleOutline, RemoveCircleOutline, SmartDisplay, Photo } from "@mui/icons-material";
import { initData, uploadConfig } from "../constant/configs.tsx";
import CustomVideo from "./CustomVideo.tsx";
import { IMainData, allTagsType } from "../constant/types.ts";

interface IPops {
    modelData: (data: IMainData) => void;
    info: IMainData;
}

const EditModal = (props: IPops) => {
    const { modelData, info } = props;

    const [data, setData] = useState(info);
    const [previewMode, setPreviewMode] = useState(false);
    const [error, setError] = useState<string[]>([]);
    const [checkedState, setCheckedState] = useState([""]);

    useEffect(() => {
        modelData(data);
    }, [data, modelData]);

    const PreviewSwitchChangeHandler = (val: boolean) => {
        setPreviewMode(val);
    };

    const clearHandler = () => {
        setData(initData);
        setError([]);
        setCheckedState([""]);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        if (id.includes("URL")) {
            setData({ ...data, [id]: value });
        } else if (id.includes("desc")) {
            const index = parseInt(id.match(/\d+/)[0]);
            const newDesc = [...data.desc];
            newDesc[index] = value;
            setData({ ...data, desc: newDesc });
        } else {
            setData({ ...data, [id]: value });
        }
    };

    const inputBlurHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        // todo error
        const { id, value } = e.target;
        const newId = id.split("[")[0];

        const isMatchRegex = !!value && value.match(uploadConfig[newId].regex as RegExp);
        !isMatchRegex && !error.includes(id) && setError([...error, id]);

        if (isMatchRegex) {
            setError(error.filter((e) => e !== id));
        } else {
            if (!error.includes(id)) {
                setError([...error, id]);
            }
        }
    };

    const checkboxClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const target = e.target as HTMLInputElement;
        const id = target.id;

        const chooseDescIndex = checkedState.indexOf(id);
        const newState = [...checkedState];

        if (chooseDescIndex > -1) {
            setCheckedState(newState.filter((i) => i !== id));
        } else {
            setCheckedState([...checkedState, id]);
        }
    };

    const tagClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        const id = e.currentTarget.id as allTagsType;
        const tagArray = data.tag;
        let newTagArray = [];

        if (tagArray.includes(id)) {
            newTagArray = tagArray.filter((tag) => tag !== id);
        } else {
            newTagArray = [...tagArray, id];
        }

        setData((prevData) => ({
            ...prevData,
            tag: newTagArray.sort(),
        }));
    };

    const removeClickHandler = (index: number) => {
        setData((prevData) => {
            const newDesc = [...prevData.desc];
            newDesc.splice(index, 1);
            return {
                ...prevData,
                desc: newDesc,
            };
        });
    };

    const plusClickHandler = () => {
        if (data.desc.length < uploadConfig.desc.limit) {
            setData((prevData) => ({
                ...prevData,
                desc: [...prevData.desc, ""],
            }));
        }
    };

    const inputProps = {
        videoURL: {
            value: data.videoURL,
            id: "videoURL",
            inputLabel: "影片連結",
            helperText: "僅接受youtube連結",
            error: error.includes("videoURL"),
            required: true,
        },
        imgURL: {
            value: data.imgURL,
            id: "imgURL",
            inputLabel: "圖片連結",
            error: error.includes("imgURL"),
            required: true,
        },
        title: {
            value: data.title,
            id: "title",
            inputLabel: "標題",
            error: error.includes("title"),
            required: true,
            maxLength: 15,
        },
    };

    return (
        <div className='uploadModalContainer'>
            <>
                <div>
                    {!previewMode ? (
                        <>
                            <div className='imgCover'></div>
                            <CustomPreviewPro data={data} />
                            {!!data.videoURL && <CustomVideo url={data.videoURL} height={200} width={400} />}
                        </>
                    ) : (
                        <pre>{JSON.stringify(data, null, 4)}</pre>
                    )}
                </div>

                <CustomSwitch
                    leftString='preview'
                    rightString='schema'
                    switchStatus={(previewMode) => {
                        PreviewSwitchChangeHandler(previewMode);
                    }}
                />
            </>

            <div className=''>
                <Button className='' onClick={clearHandler} variant='outlined'>
                    clear
                </Button>
            </div>
            <div className='row'>
                <CustomInput
                    {...inputProps.videoURL}
                    disabled={true}
                    onChange={(e) => inputChangeHandler(e)}
                    onBlur={(e) => inputBlurHandler(e)}
                />
                <Link href={"https://www.youtube.com/"} target='_blank'>
                    <SmartDisplay />
                </Link>
            </div>
            <div className='row'>
                <CustomInput
                    {...inputProps.imgURL}
                    onChange={(e) => inputChangeHandler(e)}
                    onBlur={(e) => inputBlurHandler(e)}
                />
                <Link href={"https://unsplash.com/"} target='_blank'>
                    <Photo />
                </Link>
            </div>

            <CustomAllTags data={data.tag} isShowLabel={true} onClick={(e) => tagClickHandler(e)} />
            <CustomInput
                {...inputProps.title}
                onChange={(e) => inputChangeHandler(e)}
                onBlur={(e) => inputBlurHandler(e)}
            />
            {data.desc.map((each, index) => {
                return (
                    <div className='row'>
                        <CustomInput
                            key={index}
                            id={`desc[${index}]`}
                            value={each}
                            inputLabel={"desc"}
                            required={index === 0 ? true : false}
                            isChecked={checkedState.includes(`desc[${index}]`)}
                            isShowCheckBox={index === 0 ? false : true}
                            maxLength={60}
                            onChange={(e) => inputChangeHandler(e)}
                            onClick={(e) => checkboxClickHandler(e)}
                            onBlur={(e) => inputBlurHandler(e)}
                        />
                        {index > 0 && (
                            <IconButton onClick={() => removeClickHandler(index)}>
                                <RemoveCircleOutline />
                            </IconButton>
                        )}
                    </div>
                );
            })}
            <IconButton onClick={plusClickHandler}>
                <AddCircleOutline />
            </IconButton>
        </div>
    );
};

export default EditModal;
