interface Iprops {
    visible: boolean;
    content: string;
    onConfirm: void;
    onCancel: void;
}

const ConfirmModal = (props: Iprops) => {
    const { visible, content, onConfirm, onCancel } = { ...props };
    if (!visible) return null;

    return (
        <div className='modal'>
            <div className='modalContent'>
                <p>{content}</p>
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