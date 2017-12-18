import fetch, {Response, RequestInit} from "node-fetch";

export default function httpSend(address: string, method: string, body: any = {}): Promise<any> {
    let requestInit: RequestInit = {
        method: method,
        body: (Object.keys(body).length === 0) ? "" : JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    };

    return fetch(address, requestInit)
        .then((response: Response) => {
            let jsonPromise = response.json();
            if (response.status >= 400) {
                return jsonPromise.then((errorJson: {error: string}) => {
                    throw errorJson;
                });
            }
            return jsonPromise;
        });
}