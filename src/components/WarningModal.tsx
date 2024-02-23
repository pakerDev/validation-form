import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Box, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

interface IProps {
    handleConfirmClick: () => void;
}

const WarningModal = (props: IProps) => {
    const { handleConfirmClick } = props;
    const navigate = useNavigate();

    const closeWarningHandler = () => {
        navigate("/");
    };

    return (
        <>
            <div className='modal'>
                <div className='warningModalWrapper'>
                    <div className='warningModalHeader'>
                        <Box width={40}></Box>
                        {"Warning"}
                        <IconButton onClick={closeWarningHandler}>
                            <CloseIcon className='modalCloseBtn' />
                        </IconButton>
                    </div>
                    <div className='row'>
                        <ErrorOutlineOutlinedIcon color='warning' fontSize='large' />
                        <div>
                            <p>本影片設定為黃標影片</p>
                            <p>僅供18歲以上用戶觀賞</p>
                        </div>
                    </div>
                    <div className='modalFooter'>
                        <Button className='modalBtn' onClick={closeWarningHandler}>
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
