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
        const searchInput = document.getElementById("searchKeyWord");
        const keyWord = searchInput.value;
        const allData = JSON.parse(localStorage.getItem("mainData") ?? "");
        setSavedDataJson(allData.filter((i) => i.info["Title"][0].includes(keyWord) && i));
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

    const isDoneHandler = (e, id: number) => {
        const isCheck = e.target.checked;
        const updatedJson = JSON.parse(localStorage.getItem("mainData") ?? "");

        const index = updatedJson.findIndex((data) => data.createTime === id);
        if (index !== -1) {
            updatedJson[index] = { ...updatedJson[index], isDone: isCheck };
        }

        setSavedDataJson(updatedJson);
        localStorage.setItem("mainData", JSON.stringify(updatedJson));
    };

    const editHandler = (id: number) => {
        const json = JSON.parse(localStorage.getItem("mainData") ?? "");
        if (id === 0) {
            const index = json.findIndex((data) => data.isTemplate === true);
            setEdit(index);
        } else {
            const index = json.findIndex((data) => data.createTime === id);
            setEdit(index);
        }
    };

    const dropHandler = (id: number) => {
        const json = JSON.parse(localStorage.getItem("mainData") ?? "");
        const index = json.findIndex((data) => data.createTime === id);
        console.log(index);

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
                <div className='fromLeft'>
                    <FormItem
                        formSubmitInfo={(newData) => updateInfo(newData)}
                        rerender={rerender}
                        clear={clear}
                        isUseTemp={isUseTemp}
                        editData={edit}
                    />
                    <fieldset className='formPreviewField'>
                        <legend>preview</legend>
                        {/* <pre>{JSON.stringify(submitInfo, null, 2)}</pre> */}
                        <div className='formPreviewFieldContent'>
                            {Object.entries(submitInfo).map(([k, v]) => {
                                return <p key={k}>{`${k} : ${v}`}</p>;
                            })}

                            {!canSubmit && <p className='FIAlert'>三欄均需有內容</p>}
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
                    <div className='formRMain'>
                        {savedDataJson.map((eachData: IMainData, index: number) => {
                            return (
                                eachData.isTemplate === false && (
                                    <div className='todoContainer' key={index}>
                                        {index}
                                        <input
                                            className='todoCheck'
                                            type='checkbox'
                                            onChange={(e) => isDoneHandler(e, eachData.createTime)}
                                            checked={eachData.isDone}
                                        />
                                        <Todo data={eachData} />
                                        <div>
                                            <button onClick={() => editHandler(eachData.createTime)}>edit</button>
                                            <button onClick={() => dropHandler(eachData.createTime)}>drop</button>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                        <Todo data={savedDataJson} />
                    </div>
                    <div className='formRFooter'>
                        <div className='divToggle'>
                            <label className='labelToggle'>
                                <input type='checkbox' />
                                <span className=''>t = detail</span>
                            </label>
                        </div>
                        <button onClick={() => editHandler(0)}>edit temp</button>
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
