import { useEffect, useState } from "react";

import FormItem from "../components/FormItem.tsx";

export interface IBaseInfoObj {
    createTime: number;
    content: string;
}

export interface IFormItemProps {
    label: string;
    limit: number;
    maxLength: number;
    info: IBaseInfoObj[];
}

export const formData: IFormItemProps[] = [
    {
        label: "Title",
        limit: 1,
        maxLength: 15,
        info: [
            {
                createTime: Date.now(),
                content: "",
            },
        ],
    },
    {
        label: "SubTitle",
        limit: 3,
        maxLength: 30,
        info: [
            {
                createTime: Date.now(),
                content: "",
            },
        ],
    },
    {
        label: "Description",
        limit: 5,
        maxLength: 60,
        info: [
            {
                createTime: Date.now(),
                content: "",
            },
        ],
    },
];

export const mainData = [
    {
        info: {},
        createTime: 0,
        isCreateNew: true,
        isDone: false,
        isTemplate: false,
    },
];

const initInfo = {
    Title: [""],
    SubTitle: [""],
    Description: [""],
};

const Form = () => {
    const [data, setData] = useState(formData);
    const [submitInfo, setSubmitInfo] = useState({});

    const [previewData, setPreviewData] = useState(formData);
    const [canSubmit, setCanSubmit] = useState(false);

    const updateData = (label: string, updatedInfo: IBaseInfoObj[]) => {
        const newData = data.map((item) => {
            if (item.label === label) {
                return { ...item, info: updatedInfo };
            }
            return item;
        });
        setData(newData);
    };

    const updateInfo = (i) => {
        setSubmitInfo(i);
    };

    const btnSubmitHandler = () => {
        setPreviewData(data);
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
                <FormItem formSubmitInfo={(newData) => updateInfo(newData)} />
                <span className='FIAlert'> {!canSubmit && "三欄均需有內容"}</span>
                <div className='FFooter'>
                    <button className='FBtn'>use template</button>
                    <button className='FBtn'>clear</button>
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
            {/* <div className='formRight'>
                {previewData.map((i) => {
                    return (
                        <div key={i.label} className='formJson'>
                            <p>label: {i.label} </p>
                            <p>limit: {i.limit} </p>
                            <p>maxLength: {i.maxLength} </p>
                            <p>info: {JSON.stringify(i.info).split(`"`)} </p>
                        </div>
                    );
                })}
            </div> */}
        </div>
    );
};

export default Form;
