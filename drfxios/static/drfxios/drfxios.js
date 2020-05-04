axios.defaults.xsrfCookieName = 'csrftoken'; // so we will not need to add csrftoken to every request
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"; // so we will not need to add csrftoken to every request

function capitalize(text){
    // in: "some_string"
    // out: "Some_string"
    return text.charAt(0).toUpperCase() + text.slice(1);
}

function camelCaseize(text) {
    // in: "some_string"
    // out: "SomeString"
    var parts = text.split('_')
    var final = ''
    for (var part of parts) {
        final += capitalize(part);
    }
    return final
}

class DrfXios {
    constructor(urlPrefix, models) {
        this.models = models; // we will use this in methods
        this.urlPrefix = urlPrefix; // we will use this in methods
        this.generateMethods(); // dynamically adds CRUD methods to the DrfXios protorype
    }

    generateMethods() {
        var self = this;
        for (let model of this.models) {
            var modelCapitalized = camelCaseize(model);
            // add list, detail, delete, update, create
            // getModelList

            DrfXios.prototype['get' + modelCapitalized + 'List'] = (filter) => {
                var params = new URLSearchParams();
                if (filter) {
                    for (let [key, value] of Object.entries(filter)) {
                        if (Array.isArray(value)) {
                            for (let i of value) {
                                if (value !== null) {
                                    params.append(key, i);
                                }
                            }
                        } else {
                            if (value !== null) {
                                params.append(key, value);
                            }
                        }
                    }
                }

                var request = {
                    params: params
                };

                return axios.get(self.getUrl(model), request)
            };
            // getModelDetail
            DrfXios.prototype['get' + modelCapitalized] = function (id) {
                var url = self.getUrl(model,id)
                return axios.get(url)
            };
            // deleteModel
            DrfXios.prototype['delete' + modelCapitalized] = id => {
                var url = self.getUrl(model,id)
                return axios.delete(url)
            };
            // createModel
            DrfXios.prototype['create' + modelCapitalized] = data => {
                var url = self.getUrl(model)
                return axios.post(url, data)
            };
            // updateModel
            DrfXios.prototype['update' + modelCapitalized] = (data, id = null) => {
                var url = self.getUrl(model, id !== null ? id : data.id);
                return axios.put(url, data)
            };
            // patchModel
            DrfXios.prototype['patch' + modelCapitalized] = (data, id = null) => {
                var url = self.getUrl(model, id !== null ? id : data.id);
                return axios.patch(url, data)
            };
        }
    }

    getUrl(model, id = null) {
        model = model.toLowerCase(); // ensure model name is in lowercase
        return urljoin('/', this.urlPrefix, model, id ? id + '/' : '/')
    }
}


