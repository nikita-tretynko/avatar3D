import ImageLoading from "./image-loading";
import BodiesBar from "../bodies-bar";
import React from "react";
import LoadingPage from "../loading-page";

const EmptyBodyMessage = () => {
    return (
        <div className="alert alert-warning text-center mt-5" role="alert">
            <h4>If you will not choose the body, only the head will be generated</h4>
        </div>
    )
}

const InitialPage = ({parent, onUploadedImage, onCreateAvatar, onChangeAvatarName, bodies, onSelectAvatarsBody}) => {
    const {
        isLoading,
        selectedBodyId,
        userImage,
        avatarName
    } = parent.state;

    return (
        <div>
            {isLoading
                ?
                    <LoadingPage/>
                :
                    <ImageLoading parent={parent}
                              onUploadedImage={onUploadedImage}
                              onCreateAvatar={onCreateAvatar}
                              onChangeAvatarName={onChangeAvatarName}/>
            }
            {
                userImage && avatarName && !selectedBodyId && <EmptyBodyMessage/>
            }
            {bodies.length && <BodiesBar bodies={bodies}
                                         selectedBodyId={selectedBodyId}
                                         onSelectAvatarsBody={onSelectAvatarsBody}/>}
        </div>
    )
}

export default InitialPage;