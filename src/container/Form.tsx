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

const Form = () => {
    const [data, setData] = useState(formData);

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
        console.log(...data);
    };

    return (
        <div className='formContainer'>
            <div className='fromLeft'>
                {data.map((item) => {
                    return (
                        <FormItem
                            key={item.label}
                            formSet={(updatedInfo) => updateData(item.label, updatedInfo)}
                            label={item.label}
                            limit={item.limit}
                            maxLength={item.maxLength}
                            info={item.info}
                        />
                    );
                })}
                <div className='FFooter'>
                    <button className='FBtn' onClick={() => btnSubmitHandler()} type='submit'>
                        submit
                    </button>
                </div>
            </div>
            <div className='formRight'>
                {data.map((i) => {
                    return (
                        <div key={i.label} className='formJson'>
                            <p>label: {i.label} </p>
                            <p>limit: {i.limit} </p>
                            <p>maxLength: {i.maxLength} </p>
                            <p>info: {JSON.stringify(i.info).split(`"`)} </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Form;
