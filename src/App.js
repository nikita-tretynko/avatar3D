import React, {Component} from "react";
import Scene from "./components/scene";
import Requests from "./Requests/Requests";
import InitialPage from "./components/pages/initial-page";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import './App.css';

export default class App extends Component {

    constructor(props) {
        super(props);
        this.requests = new Requests(this);
        this.state = {
            userImage: '',
            isImageLoaded: false,
            isValidated: false,
            page: 1,
            isLoading: false,
            errorMessage: '',
            avatar: {},
            avatarName: '',
            bodies: [],
            selectedBodyId: ''
        }
    }

    componentDidMount() {
        this.loadBodies();
    }

    loadBodies() {
        this.requests.getBodies();
    }

    getBase64(file, callback) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            callback(reader.result);
        }
    }

    uploadImageHandler = (e) => {
        this.getBase64(e.target.files[0], (base64Image) => {
            this.setState({
                userImage : base64Image,
                isImageLoaded: true
            }, () => this.requests.validateAvatar());
        })
    }

    onChangeAvatarName = (e) => {
        this.setState({avatarName: e.target.value});
    }

    onSelectAvatarsBody = (bodyId) => {
        this.setState({selectedBodyId: bodyId});
    }

    createAvatar = () => {
        this.requests.createAvatar();
    }

    step = () => {
        const {
            avatar,
            page,
            bodies
        } = this.state;

        switch (page) {
            case 1:
                return <InitialPage parent={this}
                                    onUploadedImage={this.uploadImageHandler}
                                    onCreateAvatar={this.createAvatar}
                                    onChangeAvatarName={this.onChangeAvatarName}
                                    bodies={bodies}
                                    onSelectAvatarsBody={this.onSelectAvatarsBody}/>
            case 2:
                return <Scene parent={this}
                              avatar={avatar}/>
            default:
                return '';
        }
    }

    setStep(page) {
        this.setState({page});
    }

    render() {
        const page = this.state.page;

        return (
            <div>
                {this.step()}
                {
                    page > 1
                        ?
                            <button type="button" onClick={() => this.setStep(this.state.page - 1)}>Previous</button>
                        :
                            ''
                }

            </div>
        )
    }
}