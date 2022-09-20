import {Config} from "../Config";

export default class Requests {
    constructor(component) {
        this.component = component;
        this.headers = new Headers();
        this.headers.append('Authorization', `Bearer ${Config.access_token}`);
        this.headers.append('Content-Type', 'application/json');
    }

    validateAvatar() {
        const { component } = this;
        const userImage = component.state.userImage;
        const url = 'https://api.unionavatars.com/validation/head';
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
                        component.setState({errorMessage: 'Wrong image, please upload correct image'});
                    }

                    if (response.status === 200) {
                        component.setState({isLoading: false});
                    }
                });
        });
    }

    getBodies() {
        const { component } = this;
        const url = 'https://api.unionavatars.com/bodies';
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

        const url = 'https://api.unionavatars.com/avatars';
        component.setState({isLoading: true}, () => {
            console.log('loading');
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