import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
    closePopupHandler: () => void;
    handleConfirmClick?: () => void;
}

const WarningModal = (props: IProps) => {
    const { closePopupHandler, handleConfirmClick } = props;

    return (
        <>
            <div className='modal'>
                <div className='modalWrapper'>
                    <div className='modalHeader'>
                        <Box width={40}></Box>
                        <IconButton onClick={closePopupHandler}>
                            <CloseIcon className='modalCloseBtn' />
                        </IconButton>
                    </div>
                    <div className='modalBody'>
                        <ErrorOutlineOutlinedIcon color='warning' fontSize='large' />
                        <p>本影片設定為黃標影片</p>
                        <p>僅供18歲以上用戶觀賞</p>
                    </div>
                    <div className='modalFooter'>
                        <Button className='modalBtn' onClick={closePopupHandler}>
                            離開
                        </Button>
                        <Button className='modalBtn' onClick={handleConfirmClick}>
                            進入
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default WarningModal;
