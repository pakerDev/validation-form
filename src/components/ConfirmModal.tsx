import { ISubmitInfo } from "./FormItem";

interface IProps {
    visible: boolean;
    content: ISubmitInfo;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal = (props: IProps) => {
    const { visible, content, onConfirm, onCancel } = { ...props };
    if (!visible) return null;

    return (
        <div className='modal'>
            <div className='modalContent'>
                <p>
                    {Object.entries(content).map(([k, v]) => {
                        return <p>{`${k} : ${v}`}</p>;
                    })}
                </p>
                <button className='modalBtn' onClick={onCancel}>
                    取消
                </button>
                <button className='modalBtn' onClick={onConfirm}>
                    確認
                </button>
            </div>
        </div>
    );
};

export default ConfirmModal;
