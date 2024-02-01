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
            SubTitle: ["my template SubTitle1", "my template SubTitle2", "my template SubTitle3"],
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

    const handleConfirm = () => {
        const newMainData = {
            info: submitInfo,
            createTime: Date.now(),
            isCreateNew: true,
            isDone: false,
            isTemplate: false,
        };

        setSavedDataJson(JSON.parse(localStorage.getItem("mainData") ?? ""));
        if (!!savedDataJson) {
            const updatedJson = [...savedDataJson];
            updatedJson.push(newMainData);
            localStorage.setItem("mainData", JSON.stringify(updatedJson));
            setSavedDataJson(JSON.parse(localStorage.getItem("mainData") ?? ""));
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
        localStorage.setItem("mainData", JSON.stringify(updatedJson));
        setSavedDataJson(JSON.parse(localStorage.getItem("mainData") ?? ""));
    }, [isIncreasing]);

    const dropHandler = (id: number) => {
        const updatedJson = [...savedDataJson];
        updatedJson.splice(id, 1);
        localStorage.setItem("mainData", JSON.stringify(updatedJson));
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
                    />
                    <fieldset className='formPreviewField'>
                        <legend>preview</legend>
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
                            <input className='formSearchInput' type='text' />
                            <button className='formSearchBtn '>search</button>

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
                                        <input className='todoCheck' type='checkbox' />
                                        <Todo data={eachData} />
                                        <div>
                                            <button>edit</button>
                                            <button onClick={() => dropHandler(index)}>drop</button>
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
                        <button>edit temp</button>
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
