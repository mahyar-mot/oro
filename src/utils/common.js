import {Url, Header, removeToken, Token} from './utils';
import {error} from "./message";


export function fetcher(url = Url("/url-not-filled", {}), header = {}, extra = {}) {

    function handleResponse(response) {
        return response.json()
            .then((json) => {
                if (!response.ok) {
                    const error = Object.assign({}, json, {
                        status: response.status,
                        statusText: response.statusText,
                    });

                    return Promise.reject(error);
                }
                return json;
            });
    }

    return fetch(Url(url, extra["query"]), Header(header))
        .then(handleResponse)
        .then((response) => response)
        .catch(e => {
            // if (e.status === 405) {
            //     error("اجازه دسترسی ندارید")
            // }
            if (e.status === 401) {
                removeToken();
                window.location = "/#/login";
            }
            return Promise.reject(e)
        })
}


export function fetcherFile(url = Url("/url-not-filled", {}), options = {}, extra = {}) {
    let token = Token(), headers = new Headers();

    token && headers.set('Authorization', "Bearer " + token);
    options.headers && Object.entries(options.headers).forEach(([k, v]) => headers.set(k, v));
    options.headers = headers;
    return fetch(Url(url, extra["query"]), options)
        .then((response) => response)
        .catch(e => {
            if (e.status === 401) {

                removeToken();
                window.location = "/#/login";
            }
            return Promise.reject(e)
        })
}

export function fetcherUpload(url = Url("/url-not-filled"), options = {}, extra = {}) {

    let token = Token(), headers = new Headers();

    token && headers.set('Authorization', "Bearer " + token);
    options.headers && Object.entries(options.headers).forEach(([k, v]) => headers.set(k, v));
    options.headers = headers;

    return fetch(Url(url, extra["query"]), options)
        .then((response) => response.json())
        .catch(e => {

            return e;
        })
}
