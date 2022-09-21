import {Config} from "../Config";

export default class Requests {
    constructor(component) {
        this.component = component;
        this.headers = new Headers();
        this.headers.append('Authorization', `Bearer ${Config.access_token}`);
        this.headers.append('Content-Type', 'application/json');
        this.url = Config.api_url;
    }

    validateAvatar() {
        const { component } = this;
        const userImage = component.state.userImage;
        const url = this.url + '/validation/head';
        component.setState({isLoading: true}, () => {
            fetch(url, {
                method: 'POST',
                headers: this.headers,
                body: JSON.stringify({
                    'img': userImage
                })
            })
                .then(response => {
                    if (response.status === 422) {
                        component.setState({errorMessage: 'Wrong image, please upload correct image', isLoading: false});
                    }

                    if (response.status === 200) {
                        component.setState({isLoading: false});
                    }
                });
        });
    }

    getBodies() {
        const { component } = this;
        const url = this.url + '/bodies';
        fetch(url, {
            headers: this.headers
        })
            .then(response => response.json())
            .then(bodies => {
                component.setState({bodies});
            })
    }

    createAvatar() {
        const { component } = this;
        const {
            userImage,
            avatarName,
            selectedBodyId
        } = component.state;

        const url = this.url + '/avatars';
        component.setState({isLoading: true}, () => {
           fetch(url, {
              method: 'POST',
              headers: this.headers,
              body: JSON.stringify({
                'name': avatarName,
                'img': userImage,
                'body': selectedBodyId,
                'output_format': 'glb'
              })
           })
               .then(response => response.json())
               .then(avatarData => {
                   component.setState({isLoading: false, avatar: avatarData, page: 2});
               });
        });
    }
}