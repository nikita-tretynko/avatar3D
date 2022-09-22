const ErrorMessage = ({message}) => {
    return (
        <div className="alert alert-danger mt-3" role="alert">
            {message}
        </div>
    )
}

export default ErrorMessage;