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
        info: [],
    },
    {
        label: "SubTitle",
        limit: 3,
        maxLength: 30,
        info: [],
    },
    {
        label: "Description",
        limit: 5,
        maxLength: 60,
        info: [],
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
        console.log(data[0].info);
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
                    return <p key={i.label}>{`${JSON.stringify(i.info)}\n`}</p>;
                })}
            </div>
        </div>
    );
};

export default Form;
