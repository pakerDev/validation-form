import { useEffect, useState } from "react";
import { IFormItemProps, IBaseInfoObj } from "../container/Form";

interface IProps {
    formSet: (info: IBaseInfoObj[]) => void;
    item: IFormItemProps;
}

const FormItem = (props: IProps) => {
    const { item, formSet } = props;
    const { label, limit, maxLength, info } = { ...item };

    const [itemInfo, setItemInfo] = useState(info);
    const [canAdd, setCanAdd] = useState(false);
    const [canDelete, setCanDelete] = useState(false);
    const [isOnComposition, setIsOnComposition] = useState(false);

    const wordReg = /[\w\u4e00-\u9fa5\s]/g;

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
        itemInfo.length < limit ? setCanAdd(true) : setCanAdd(false);
        itemInfo.length > 1 ? setCanDelete(true) : setCanDelete(false);
        formSet([...itemInfo]);
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
            updateInfo(e);
        } else {
            setIsOnComposition(true);
        }
    };

    const updateInfo = (
        e:
            | React.ChangeEvent<HTMLInputElement>
            | React.ChangeEvent<HTMLTextAreaElement>
            | React.CompositionEvent<HTMLTextAreaElement>
            | React.CompositionEvent<HTMLInputElement>
    ) => {
        const target = e.target as HTMLInputElement;
        const index = itemInfo.findIndex((obj) => obj.createTime === +target.placeholder);

        if (index !== -1) {
            const newItemInfo = [...itemInfo];
            newItemInfo[index] = {
                ...newItemInfo[index],
                content: auth(target.value),
            };
            setItemInfo(newItemInfo);
        }
    };

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        if (isOnComposition) return;
        const val = e.target.value;
        e.target.value = auth(val);
        updateInfo(e);
    };

    return (
        <>
            <div className='FIContainer'>
                <p className='FITitle'>{label}</p>
                <div className='FIMain'>
                    {itemInfo.map((each) => {
                        return (
                            <div className='FIRow' key={each.createTime}>
                                {label === "Title" ? (
                                    <input
                                        className='FIInput'
                                        placeholder={`${each.createTime}`}
                                        onCompositionStart={compositionHandler}
                                        onCompositionUpdate={compositionHandler}
                                        onCompositionEnd={compositionHandler}
                                        onChange={(e) => onChangeHandler(e)}
                                        type='text'
                                    />
                                ) : (
                                    <textarea
                                        className='FIInput'
                                        placeholder={`${each.createTime}`}
                                        onCompositionStart={compositionHandler}
                                        onCompositionUpdate={compositionHandler}
                                        onCompositionEnd={compositionHandler}
                                        onChange={(e) => onChangeHandler(e)}
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
