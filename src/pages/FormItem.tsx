import { useEffect, useState } from "react";

interface IFormItemProps {
    title?: string;
    limit?: number;
}

const FormItem = (props: IFormItemProps) => {
    const { title = "default limit=3", limit = 3 } = props;

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
                    <input key={item} className='fiinp' placeholder={`${item + 1}`} type='text' />
                ))}
            </div>
            <div className='fifooter'>
                {isDisable && <span className='fialert'>up to {limit}</span>}
                <div></div>
                <button className='fibtn' onClick={() => btnHandler(limit)} disabled={isDisable}>
                    +
                </button>
            </div>
        </div>
    );
};

export default FormItem;
