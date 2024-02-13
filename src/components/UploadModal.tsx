import { useState } from "react";
import CustomInput from "./CustomInput";
import CustomAllTags from "../components/CustomAllTags";
import { youtubeURLRegex, imgURLRegex, titleRegex, descRegex, IMainData } from "../constant/types.ts";
import { Button, IconButton, Link } from "@mui/material";
import CustomSwitch from "./CustomSwitch";
import CustomPreviewPro from "./CustomPreviewPro";
import CustomSingleTag from "./CustomSingleTag";
import { AddCircleOutline, RemoveCircleOutline, SmartDisplay, Photo } from "@mui/icons-material";

const uploadConfig = {
    videoURL: { limit: 1, regex: youtubeURLRegex },
    imgURL: { limit: 1, regex: imgURLRegex },
    title: {
        limit: 1,
        maxLength: 15,
        regex: titleRegex,
    },
    tag: { limit: 5 },
    desc: {
        limit: 3,
        maxLength: 60,
        regex: descRegex,
    },
};

const UploadModal = () => {
    const initData: IMainData = {
        videoURL: "",
        imgURL: "",
        isLiked: false,
        isUploaded: true,
        createTime: Date.now(),
        title: "",
        tag: [],
        desc: [""],
    };

    const [data, setData] = useState(initData);
    const [error, setError] = useState<string[]>([]);
    const [checkedState, setCheckedState] = useState(["desc[0]"]);

    const tempHandler = () => {
        const tempDataJson = JSON.parse(localStorage.getItem("tempData") ?? "");
        setData(tempDataJson);
    };

    const clearHandler = () => {
        setData(initData);
        console.log(data);

        setError([]);
        setCheckedState(["desc[0]"]);
    };

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        if (id.includes("URL")) {
            setData({ ...data, [id]: value });
        } else if (id.includes("desc")) {
            const index = parseInt(id.split("[")[1]);
            const newDesc = [...data.desc];
            newDesc[index] = value;
            setData({ ...data, desc: newDesc });
        } else {
            setData({ ...data, [id]: value });
        }
    };

    const inputBlurHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        //  if (id.includes("URL")) {
        //  } else if (id === "title") {
        //  } else if (id.includes("desc")) {
        //  } else {
        //  }

        //todo desc Reg
        const isMatchRegex = !!value && !!uploadConfig[id].regex && value.match(uploadConfig[id].regex);
        !isMatchRegex && !error.includes(id) && setError([...error, id]);

        if (isMatchRegex) {
            setError(error.filter((e) => e !== id));
        } else {
            if (!error.includes(id)) {
                setError([...error, id]);
            }
        }
    };

    const checkboxClickHandler = (e: React.MouseEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        const id = target.id;

        if (id === "desc[0]") return;
        const chooseTagIndex = checkedState.indexOf(id);
        const newState = checkedState;

        if (chooseTagIndex > -1) {
            setCheckedState(newState.filter((i) => i !== id));
        } else {
            setCheckedState([...checkedState, id]);
        }
    };

    const tagClickHandler = (e: React.MouseEventHandler<HTMLButtonElement>) => {
        const id = e.currentTarget.id;
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
                {/* todo 兩種預覽 */}
                {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
                {/* <CustomVideo url={data.videoURL} /> */}
                <CustomPreviewPro data={data} />
                {data.tag.map((i) => {
                    <CustomSingleTag key={i} type={i} />;
                })}
                <CustomSwitch leftString='schema' rightString='preview' />
            </>

            {/* todo 兩個按鈕 */}
            <div className=''>
                <Button className='' onClick={tempHandler}>
                    template
                </Button>
                <Button className='' onClick={clearHandler}>
                    clear
                </Button>
            </div>
            <div className='row'>
                <CustomInput
                    {...inputProps.videoURL}
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
                            isShowCheckBox={true}
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

export default UploadModal;
