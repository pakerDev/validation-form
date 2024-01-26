import { useEffect, useState } from "react";
import { IFormItemProps, IBaseInfoObj } from "../container/Form";

interface IProps {
    formSet: (info: IBaseInfoObj[]) => void;
    item: IFormItemProps;
    canSubmit: React.Dispatch<React.SetStateAction<boolean>>;
}

const FormItem = (props: IProps) => {
    const { item, formSet, canSubmit } = props;
    const { label, limit, maxLength, info } = { ...item };

    const [itemInfo, setItemInfo] = useState(info);
    const [canAdd, setCanAdd] = useState(false);
    const [canDelete, setCanDelete] = useState(false);
    const [isOnComposition, setIsOnComposition] = useState(false);
    const [alertType, setAlertType] = useState(0);
    const [count, setCount] = useState(0);

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
        itemInfo.length >= limit && setAlertType((t) => (t % 10 === 1 ? t : t + 1));

        formSet([...itemInfo]);
    }, [itemInfo]);

    const btnMinusHandler = (n: number) => {
        if (itemInfo.length < 2) return;
        setItemInfo(itemInfo.filter((obj) => obj.createTime !== n));
        itemInfo.length >= limit ? setAlertType((t) => (t % 10 === 1 ? t - 1 : t)) : "";
    };

    const auth = (val: string) => {
        let res = val;

        const chk =
            val
                .match(wordReg)
                ?.filter((char) => char !== "_")
                .join("") ?? "";

        chk === res
            ? setAlertType((t) => (t % 1000 >= 100 ? t - 100 : t))
            : setAlertType((t) => (t % 1000 >= 100 ? t : t + 100));

        if (res.length >= maxLength) {
            res = res.slice(0, maxLength);
        }
        setCount(res.length);
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

    useEffect(() => {
        count >= maxLength
            ? setAlertType((t) => (t % 100 >= 10 ? t : t + 10))
            : setAlertType((t) => (t % 100 >= 10 ? t - 10 : t));
    }, [count]);

    const [msg, setMsg] = useState("");
    useEffect(() => {
        alertType === 0 && setMsg("");
        alertType % 10 >= 1 && setMsg((m) => (m.indexOf("欄") > 0 ? m : (m = ` 至多${limit}欄`)));
        alertType % 100 >= 10 && setMsg((m) => (m.indexOf("字") > 0 ? m : (m = ` 至多${maxLength}字`)));
        alertType % 1000 >= 100 && setMsg((m) => (m.indexOf("限") > 0 ? m : (m = ` 限半形英數及中文`)));
        alertType >= 100 ? canSubmit(false) : canSubmit(true);
        true;
    }, [alertType]);

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
                    <span className='FIAlert'>{msg}</span>
                    <div>
                        <span> {`${count}/${maxLength}`} </span>
                        <button className='FIBtn FIPlus' onClick={() => btnPlusHandler(limit)} disabled={!canAdd}>
                            +
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FormItem;
