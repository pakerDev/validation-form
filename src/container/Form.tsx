import { useState } from "react";
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
        info: {
            Title: ["a"],
            SubTitle: ["b"],
            Description: ["c"],
        },
        createTime: 0,
        isCreateNew: true,
        isDone: false,
        isTemplate: false,
    },
];

// const emptyData = {
//     info: {
//         Title: ["1"],
//         SubTitle: ["2"],
//         Description: ["3"],
//     },
//     createTime: 0,
//     isCreateNew: true,
//     isDone: false,
//     isTemplate: false,
// };

const Form = () => {
    const [data, setData] = useState(formData);
    const [previewData, setPreviewData] = useState(formData);
    const [canSubmit, setCanSubmit] = useState(true);

    const updateData = (label: string, updatedInfo: IBaseInfoObj[]) => {
        const newData = data.map((item) => {
            if (item.label === label) {
                return { ...item, info: updatedInfo };
            }
            return item;
        });
        setData(newData);
    };

    const btnSubmitHandler = () => {
        setPreviewData(data);
    };

    return (
        <div className='formContainer'>
            <div className='fromLeft'>
                <FormItem />
                {/* {formConfig.map((item) => {
                    return (
                        <FormItem
                            key={item.label}
                            // formSet={(updatedInfo) => updateData(item.label, updatedInfo)}
                            // item={item}
                            label={item.label}
                            canSubmit={setCanSubmit}
                        />
                    );
                })} */}
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
