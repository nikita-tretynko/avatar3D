import React from "react";

const LoadingPage = () => {
    return (
        <div className="text-center">
            <h3>Please wait</h3>
            <p>
                Avatar generation takes approximately 30 seconds
            </p>
            <i className="fas fa-spinner fa-spin fa-5x"></i>
        </div>
    )
}

export default LoadingPage