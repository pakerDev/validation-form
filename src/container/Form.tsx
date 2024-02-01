import { useEffect, useState } from "react";

import FormItem, { IInfo, TLabel } from "../components/FormItem.tsx";
import ConfirmModal from "../components/ConfirmModal.tsx";
import Todo from "../components/ToDoItem.tsx";

export interface IMainData {
    info: IInfo;
    createTime: number;
    isCreateNew: boolean;
    isDone: boolean;
    isTemplate: boolean;
}

const mainData = [
    {
        info: {
            Title: ["my template Title"],
            SubTitle: ["my template SubTitle1"],
            Description: ["my template Description"],
        },
        createTime: Date.now(),
        isCreateNew: true,
        isDone: false,
        isTemplate: true,
    },
];

const Form = () => {
    const [submitInfo, setSubmitInfo] = useState({ Title: [], SubTitle: [], Description: [] });
    const [showModal, setShowModal] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [clear, setClear] = useState(false);
    const [isIncreasing, setIsIncreasing] = useState(false);
    const [isUseTemp, setIsUseTemp] = useState(false);
    const [edit, setEdit] = useState(-1);
    const [toggle, setToggle] = useState(true);

    !localStorage.getItem("mainData") && localStorage.setItem("mainData", JSON.stringify(mainData));
    const [savedDataJson, setSavedDataJson] = useState(JSON.parse(localStorage.getItem("mainData") ?? ""));

    const updateInfo = (i: IInfo) => {
        setSubmitInfo(i);
    };

    const btnUseTempHandler = () => {
        setIsUseTemp((r) => !r);
    };

    const btnClearHandler = () => {
        setClear((r) => !r);
    };

    const btnSubmitHandler = () => {
        setShowModal(true);
    };

    const searchHandler = () => {
        const searchInput: HTMLInputElement = document.getElementById("searchKeyWord");
        searchInput as HTMLInputElement;
        const keyWord = searchInput.value ?? "";
        const allData = JSON.parse(localStorage.getItem("mainData") ?? "");
        setSavedDataJson(allData.filter((i: IMainData) => i.info["Title"][0].includes(keyWord) && i));
        searchInput.value = "";
    };

    const handleConfirm = () => {
        const updatedJson = JSON.parse(localStorage.getItem("mainData") ?? "");

        if (edit < 0) {
            const newMainData = {
                info: submitInfo,
                createTime: Date.now(),
                isCreateNew: true,
                isDone: false,
                isTemplate: false,
            };
            if (!!savedDataJson) {
                updatedJson.push(newMainData);
                localStorage.setItem("mainData", JSON.stringify(updatedJson));
                setSavedDataJson(JSON.parse(localStorage.getItem("mainData") ?? ""));
            }
        } else {
            let editItem = { ...updatedJson[edit], ["info"]: submitInfo, isCreateNew: false };
            updatedJson.splice(edit, 1);

            setSavedDataJson([...updatedJson, editItem]);
            localStorage.setItem("mainData", JSON.stringify([...updatedJson, editItem]));
            setEdit(-1);
        }
        setShowModal(false);
        setRerender((r) => !r);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const updatedJson = [...savedDataJson];
        if (isIncreasing) {
            updatedJson.sort(function (a, b) {
                return b.createTime - a.createTime;
            });
        } else {
            updatedJson.sort(function (a, b) {
                return a.createTime - b.createTime;
            });
        }
        setSavedDataJson(updatedJson);
    }, [isIncreasing]);

    const isDoneHandler = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        const isCheck = e.target.checked;
        const updatedJson = JSON.parse(localStorage.getItem("mainData") ?? "");
        const index = updatedJson.findIndex((data: IMainData) => data.createTime === id);
        if (index !== -1) {
            updatedJson[index] = { ...updatedJson[index], isDone: isCheck };
        }

        setSavedDataJson(updatedJson);
        localStorage.setItem("mainData", JSON.stringify(updatedJson));
    };

    const editHandler = (id: number) => {
        const json = JSON.parse(localStorage.getItem("mainData") ?? "");
        if (id === 0) {
            const index = json.findIndex((data: IMainData) => data.isTemplate === true);
            setEdit(index);
        } else {
            const index = json.findIndex((data: IMainData) => data.createTime === id);
            setEdit(index);
        }
    };

    const dropHandler = (id: number) => {
        const json = JSON.parse(localStorage.getItem("mainData") ?? "");
        const index = json.findIndex((data: IMainData) => data.createTime === id);

        json.splice(index, 1);
        localStorage.setItem("mainData", JSON.stringify(json));
        setSavedDataJson(JSON.parse(localStorage.getItem("mainData") ?? ""));
    };

    useEffect(() => {
        for (const p in submitInfo) {
            if (submitInfo[p as TLabel].length === 0) {
                setCanSubmit(false);
                return;
            }
        }
        setCanSubmit(true);
    }, [submitInfo]);

    return (
        <>
            <div className='formContainer'>
                <div className='formLeft'>
                    <FormItem
                        formSubmitInfo={(newData) => updateInfo(newData)}
                        rerender={rerender}
                        clear={clear}
                        isUseTemp={isUseTemp}
                        editData={edit}
                    />
                    <fieldset className='formPreviewField'>
                        <legend>preview</legend>
                        <div className='formPreviewFieldContent'>
                            <div>
                                {Object.entries(submitInfo).map(([k, v]) => {
                                    return <p key={k}>{`${k} : ${v}`}</p>;
                                })}
                            </div>
                            <div>{!canSubmit && <p className='FIAlert'>三欄均需有內容</p>}</div>
                        </div>
                    </fieldset>
                    <div className='FFooter'>
                        <button className='FBtn' onClick={() => btnUseTempHandler()}>
                            use template
                        </button>
                        <button className='FBtn' onClick={() => btnClearHandler()}>
                            clear
                        </button>
                        <button
                            className='FSubmit FBtn'
                            onClick={() => btnSubmitHandler()}
                            disabled={!canSubmit}
                            type='submit'
                        >
                            submit
                        </button>
                    </div>
                </div>
                <div className='formRight'>
                    {toggle ? (
                        <div className=''>
                            <div className='formRHead'>
                                <div className='formSearchBar'>
                                    <input className='formSearchInput' type='text' id='searchKeyWord' />
                                    <button className='formSearchBtn' onClick={() => searchHandler()}>
                                        search
                                    </button>
                                </div>
                                <button className='formSortBtn FBtn' onClick={() => setIsIncreasing((n) => !n)}>
                                    sort
                                </button>
                            </div>
                            <div className='formRMain todoView'>
                                {savedDataJson.map((eachData: IMainData, index: number) => {
                                    return (
                                        eachData.isTemplate === false && (
                                            <div className='todoContainer' key={index}>
                                                <input
                                                    className='myCheckBox'
                                                    type='checkbox'
                                                    onChange={(e) => isDoneHandler(e, eachData.createTime)}
                                                    checked={eachData.isDone}
                                                />
                                                <Todo data={eachData} />
                                                <div>
                                                    <button
                                                        className='todoBtn FBtn'
                                                        onClick={() => editHandler(eachData.createTime)}
                                                    >
                                                        edit
                                                    </button>
                                                    <button
                                                        className='todoBtn FBtn'
                                                        onClick={() => dropHandler(eachData.createTime)}
                                                    >
                                                        drop
                                                    </button>
                                                </div>
                                            </div>
                                        )
                                    );
                                })}
                                <Todo data={savedDataJson} />
                            </div>
                        </div>
                    ) : (
                        <div className='formDetail'>{<pre>{JSON.stringify(savedDataJson, null, 2)}</pre>}</div>
                    )}

                    <div className='formRFooter'>
                        <div className='divToggle'>
                            <label className='labelToggle'>
                                {"..."}
                                <input
                                    type='checkbox'
                                    onChange={() => {
                                        setToggle((i) => !i);
                                    }}
                                />
                                <span className=''></span>
                            </label>
                        </div>
                        <button className='formEditTemp FBtn' onClick={() => editHandler(0)}>
                            edit temp
                        </button>
                    </div>
                </div>
            </div>

            <div className='formContainer'>
                <ConfirmModal
                    visible={showModal}
                    content={submitInfo}
                    onConfirm={handleConfirm}
                    onCancel={handleCancel}
                />
            </div>
        </>
    );
};

export default Form;
