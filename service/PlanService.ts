import axios from "axios";
import {expect} from "chai";

export class PlanService {
    private url: string;
    private accessToken: string;

    constructor(private baseUrl, private token) {
        this.url = baseUrl + "/plans";
        this.accessToken = token;
    }

    async getPlanByName(planName: string): Promise<Plan> {
        const response = await axios.get<Plan[]>(`${this.url}`, {
            params: {name: planName},
            headers: {Authorization: `Bearer ` + this.accessToken}
        });

        if (response.data.length > 1) {
            console.log('More than one plan found in the response. First plan will be retrieved.');
        }

        if (response.status == 200  && response.data[0] && response.data[0]._id) {
            return response.data[0];
        } else {
            throw new Error('Failed to create membership');
        }
    }

    // TODO: Add other service methods to the /plans endpoint
}