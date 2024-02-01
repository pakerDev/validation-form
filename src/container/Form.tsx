import { useEffect, useState } from "react";

import FormItem from "../components/FormItem.tsx";
import ConfirmModal from "../components/ConfirmModal.tsx";

// export interface IBaseInfoObj {
//     createTime: number;
//     content: string;
// }

// export interface IFormItemProps {
//     label: string;
//     limit: number;
//     maxLength: number;
//     info: IBaseInfoObj[];
// }

// export const formData: IFormItemProps[] = [
//     {
//         label: "Title",
//         limit: 1,
//         maxLength: 15,
//         info: [
//             {
//                 createTime: Date.now(),
//                 content: "",
//             },
//         ],
//     },
//     {
//         label: "SubTitle",
//         limit: 3,
//         maxLength: 30,
//         info: [
//             {
//                 createTime: Date.now(),
//                 content: "",
//             },
//         ],
//     },
//     {
//         label: "Description",
//         limit: 5,
//         maxLength: 60,
//         info: [
//             {
//                 createTime: Date.now(),
//                 content: "",
//             },
//         ],
//     },
// ];

export const mainData = [
    {
        info: {
            Title: ["my template Title"],
            SubTitle: ["my template SubTitle"],
            Description: ["my template Description"],

        },
        createTime: 0,
        isCreateNew: true,
        isDone: false,
        isTemplate: true,
    },
];

const Form = () => {
    //const [data, setData] = useState(formData);
    const [submitInfo, setSubmitInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [canSubmit, setCanSubmit] = useState(false);
    const [rerender, setRerender] = useState(false);
    const [clear, setClear] = useState(false);

    // const updateData = (label: string, updatedInfo: IBaseInfoObj[]) => {
    //     const newData = data.map((item) => {
    //         if (item.label === label) {
    //             return { ...item, info: updatedInfo };
    //         }
    //         return item;
    //     });
    //     setData(newData);
    // };

    const updateInfo = (i) => {
        setSubmitInfo(i);
    };

    const btnClearHandler = () => {
        setClear((r) => !r);
    };

    const btnSubmitHandler = () => {
        // setPreviewData(data);
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
        mainData.push(newMainData);
        setShowModal(false);
        setRerender((r) => !r);
        localStorage.setItem("mainData", JSON.stringify(mainData));
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
        <div className='formContainer'>
            <div className='fromLeft'>
                <FormItem formSubmitInfo={(newData) => updateInfo(newData)} rerender={rerender} clear={clear} />
                <fieldset className='formPreviewField'>
                    <legend>preview</legend>
                    <div className='formPreviewFieldContent'>
                        {Object.entries(submitInfo).map(([k, v]) => {
                            return <p>{`${k} : ${v}`}</p>;
                        })}
                        {/* <span className='FIAlert'> {!canSubmit && "三欄均需有內容"}</span> */}
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
                {/* {previewData.map((i) => {
                    return (
                        <div key={i.label} className='formJson'>
                            <p>label: {i.label} </p>
                            <p>limit: {i.limit} </p>
                            <p>maxLength: {i.maxLength} </p>
                            <p>info: {JSON.stringify(i.info).split(`"`)} </p>
                        </div>
                    );
                })} */}
                <div className='formContainer'>
                    <ConfirmModal
                        visible={showModal}
                        content={submitInfo}
                        onConfirm={handleConfirm}
                        onCancel={handleCancel}
                    />
                </div>

                {`${localStorage.getItem("mainData")}`}
                {/* {JSON.parse(localStorage.getItem("mainData") ?? "")} */}
                {/* {`${JSON.stringify(mainData)}`.split(`"`)} */}
            </div>

        </div>
    );
};

export default Form;
