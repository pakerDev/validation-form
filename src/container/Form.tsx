import { useEffect, useState } from "react";

import FormItem from "../components/FormItem.tsx";
import ConfirmModal from "../components/ConfirmModal.tsx";
import Todo from "../components/ToDoItem.tsx";

export const mainData = [
    {
        info: {
            Title: ["my template Title"],
            SubTitle: ["my template SubTitle"],
            Description: ["my template Description"],
        },
        createTime: Date.now(),
        isCreateNew: true,
        isDone: false,
        isTemplate: true,
    },
];

const Form = () => {
    //const [data, setData] = useState(formData);
    const [submitInfo, setSubmitInfo] = useState({ Title: [], SubTitle: [], Description: [] });
    const [showModal, setShowModal] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [clear, setClear] = useState(false);
    const [savedDataJson, setSavedDataJson] = useState(JSON.parse(localStorage.getItem("mainData") ?? ""));
    //setSavedDataJson(JSON.parse(localStorage.getItem("mainData") ?? ""));
    // const savedDataJson = JSON.parse(localStorage.getItem("mainData") ?? "");
    !localStorage.getItem("mainData") && localStorage.setItem("mainData", JSON.stringify(mainData));

    const updateInfo = (i) => {
        setSubmitInfo(i);
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
        for (const p in submitInfo) {
            if (submitInfo[p].length === 0) {
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
                    <FormItem formSubmitInfo={(newData) => updateInfo(newData)} rerender={rerender} clear={clear} />
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
                        <button className='FBtn'>use template</button>
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
                            <input className='formSearchInput' type='text' name='' id='' />
                            <button className='formSearchBtn '>search</button>
                        </div>
                        <button className='formSortBtn FBtn'>sort</button>
                    </div>
                    <div className='formRMain'>
                        {savedDataJson.map((eachData, index) => {
                            return (
                                eachData.isTemplate === false && (
                                    <div className='todoContainer' key={index}>
                                        <input className='todoCheck' type='checkbox' />
                                        <Todo data={eachData} />
                                        <div>
                                            <button>edit</button>
                                            <button>drop</button>
                                        </div>
                                    </div>
                                )
                            );
                        })}
                        main
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

                    {/* {JSON.parse(localStorage.getItem("mainData") ?? "")} */}
                    {/* {`${JSON.stringify(mainData)}`.split(`"`)} */}
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
