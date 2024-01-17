import React, { useState } from "react";

interface IFormItemProps {
    title: string;
    limit: number;
}

const FormItem = (props: IFormItemProps) => {
    const { title = "hello", limit = 5 } = props;

    const [inp, setInp] = useState([0]);
    const btnHandler = (l: number) => {
        if (inp.length < l) {
            setInp((arr) => [...arr, arr.length]);
        }
    };
    return (
        <div>
            <h1 className='fititle'>{title}</h1>
            <div>
                {inp.map((item, idx) => (
                    <input key={idx} className='fiinp' placeholder={`${item}`} type='text' disabled={false} />
                ))}
            </div>
            <button className='fibtn' onClick={() => btnHandler(limit)} disabled={false}>
                +
            </button>
        </div>
    );
};

export default FormItem;
