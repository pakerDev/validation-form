import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

const EmptyResult = () => {
    return (
        <div className='emptyResultContainer'>
            <ErrorOutlineIcon fontSize='large' color='error' />
            <p>查無資料</p>
        </div>
    );
};

export default EmptyResult;
