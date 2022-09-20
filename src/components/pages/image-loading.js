import React from "react";

const ImageLoading = ({parent, onUploadedImage, onCreateAvatar, onChangeAvatarName}) => {
    const {
        errorMessage
    } = parent.state;

    return (
        <div className="image-uploading-container">
            <div className="form-group mt-2">
                <h3 className="header">Please, upload your selfie</h3>
                <input type="file" className="form-control" placeholder="Upload File" accept="image/*" onChange={onUploadedImage}/>
            </div>
            <div className="form-group mt-2">
                <div>
                    <label htmlFor="avatar-name">Enter avatar name</label>
                    <input type="text" className="form-control" required={true} onChange={onChangeAvatarName}/>
                </div>
                {
                    errorMessage.length < 1 &&
                    <button type="button"
                            className="btn btn-success mt-2"
                            onClick={onCreateAvatar}>
                         Create avatar
                    </button>
                }
            </div>
        </div>
    )
}

export default ImageLoading;