import { useEffect, useState } from "react";
import { IFormItemProps, IBaseInfoObj } from "../container/Form";

const FormItem = (props: IFormItemProps) => {
    const { label, limit, maxLength, info } = props;

    const [itemInfo, setItemInfo] = useState(info);
    const [canAdd, setCanAdd] = useState(false);
    const [canDelete, setCanDelete] = useState(false);
    const [isOnComposition, setIsOnComposition] = useState(false);
    const wordReg = /[\w\u4e00-\u9fa5]/g;

    if (itemInfo.length > limit) {
        setItemInfo(itemInfo.slice(-limit));
    }

    const baseInfoObj: IBaseInfoObj = {
        createTime: 0,
        content: "",
    };

    const btnPlusHandler = (limit: number) => {
        if (itemInfo.length < limit) {
            const newItem = { ...baseInfoObj, createTime: Date.now() };
            setItemInfo([...itemInfo, newItem]);
        }
    };

    useEffect(() => {
        if (itemInfo.length < 1) {
            const newItem = { ...baseInfoObj, createTime: Date.now() };
            setItemInfo([...itemInfo, newItem]);
        }
    }, []);

    useEffect(() => {
        itemInfo.length < limit ? setCanAdd(true) : setCanAdd(false);
        itemInfo.length > 1 ? setCanDelete(true) : setCanDelete(false);
    }, [itemInfo]);

    const btnMinusHandler = (n: number) => {
        if (itemInfo.length < 2) return;
        setItemInfo(itemInfo.filter((obj) => obj.createTime !== n));
    };

    const auth = (val: string) => {
        let res =
            val
                .match(wordReg)
                ?.filter((char) => char !== "_")
                .join("") ?? "";
        if (res.length > maxLength) {
            res = res.slice(0, maxLength);
        }
        return res;
    };

    const compositionHandler = (
        e: React.CompositionEvent<HTMLTextAreaElement> | React.CompositionEvent<HTMLInputElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const val = target.value;
        if (e.type === "compositionend") {
            setIsOnComposition(false);
            target.value = auth(val);
        } else {
            setIsOnComposition(true);
        }
    };

    const onChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
        index: number
    ) => {
        if (isOnComposition) return;
        const val = e.target.value;

        e.target.value = auth(val);
    };

    return (
        <>
            <div className='FIContainer'>
                <p className='FITitle'>{label}</p>
                <div className='FIMain'>
                    {itemInfo.map((each, index) => {
                        return (
                            <div className='FIRow' key={each.createTime}>
                                {label === "Title" ? (
                                    <input
                                        className='FIInput'
                                        id={`${label}_${index}`}
                                        placeholder={`${limit}_${each.createTime}`}
                                        onCompositionStart={compositionHandler}
                                        onCompositionUpdate={compositionHandler}
                                        onCompositionEnd={compositionHandler}
                                        onChange={(e) => onChangeHandler(e, index)}
                                        type='text'
                                    />
                                ) : (
                                    <textarea
                                        className='FIInput'
                                        id={`${label}_${index}`}
                                        placeholder={`${limit}_${each.createTime}`}
                                        onCompositionStart={compositionHandler}
                                        onCompositionUpdate={compositionHandler}
                                        onCompositionEnd={compositionHandler}
                                        onChange={(e) => onChangeHandler(e, index)}
                                    />
                                )}

                                <button
                                    className='FIMinus FIBtn'
                                    disabled={!canDelete}
                                    onClick={() => btnMinusHandler(each.createTime)}
                                >
                                    -
                                </button>
                            </div>
                        );
                    })}
                </div>
                <div className='FIFooter'>
                    {!canAdd ? <span className='FIAlert'>up to {limit}</span> : <span></span>}
                    <button className='FIBtn FIPlus' onClick={() => btnPlusHandler(limit)} disabled={!canAdd}>
                        +
                    </button>
                </div>
            </div>
        </>
    );
};

export default FormItem;
