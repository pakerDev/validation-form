import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";

const WarningModal = () => {
    return (
        <div>
            <div className='modalBody'>
                <ErrorOutlineOutlinedIcon color='warning' fontSize='large' />
                <p>本影片設定為黃標影片</p>
                <p>僅供18歲以上用戶觀賞</p>
                <p>請問您的年紀為?</p>
            </div>
        </div>
    );
};

export default WarningModal;
