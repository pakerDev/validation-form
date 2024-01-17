import { useEffect, useState } from "react";

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
        <div className='ficon'>
            <p className='fititle'>{title}</p>
            <div className='fimain'>
                {inp.map((item) => (
                    <input className='fiinp' placeholder={`${item + 1}`} type='text' />
                ))}
            </div>
            <div className='fifooter'>
                <span className='fialert'>{isDisable && "已達輸入上限"}</span>
                <button className='fibtn' onClick={() => btnHandler(limit)} disabled={isDisable}>
                    +
                </button>
            </div>
        </div>
    );
};

export default FormItem;
