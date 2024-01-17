import React, { useEffect, useState } from "react";

interface IFormItemProps {
    title?: string;
    limit?: number;
}

const FormItem = (props: IFormItemProps) => {
    const { title = "hello", limit = 3 } = props;

    const [inp, setInp] = useState([0]);
    const [isDisable, setIsDisable] = useState(false);
    const btnHandler = (l: number) => {
        if (inp.length < l) {
            setInp((arr) => [...arr, arr.length]);
        }
    };
    useEffect(() => {
        inp.length < limit ? setIsDisable(false) : setIsDisable(true);
    }, [inp]);

    return (
        <div>
            <p className='fititle'>{title}</p>
            <div>
                {inp.map((item, idx) => (
                    <div>
                        <input key={idx} className='fiinp' placeholder={`${item}`} type='text' />
                    </div>
                ))}
                {isDisable && <p className='fialert'>已達輸入上限</p>}
            </div>
            <button className='fibtn' onClick={() => btnHandler(limit)} disabled={isDisable}>
                +
            </button>
        </div>
    );
};

export default FormItem;
