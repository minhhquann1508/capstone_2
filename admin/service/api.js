function Api() {
    //property

    //method
    this.callApi = function (uri, method, data) {
        let url = `https://6471e5116a9370d5a41acc1a.mockapi.io`;
        return axios({
            url: `${url}/${uri}`,
            method: method,
            data: data,
        });
    };
};