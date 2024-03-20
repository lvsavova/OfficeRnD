import axios from "axios";
import {expect} from "chai";

export class AuthorizationService {
    private url: string;

    constructor(private baseUrl = 'https://identity.officernd.com/oauth/token') {
        this.url = baseUrl;
    }

    async getAccessToken(clientID, clientSecret): Promise<string> {
        const requestBody = new URLSearchParams();
        requestBody.append('client_id', clientID);
        requestBody.append('client_secret', clientSecret);
        requestBody.append('grant_type', 'client_credentials');
        requestBody.append('scope', 'officernd.api.read officernd.api.write');

        const response = await axios.post(`${this.url}`, requestBody, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.status == 200 && response.data.access_token) {
            return response.data.access_token;
        } else {
            throw new Error('Failed to create Bearer token authorization');
        }
    }

    // TODO: Add other authorization methods
}