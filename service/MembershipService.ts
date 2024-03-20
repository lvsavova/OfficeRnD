import axios from "axios";
import {expect} from "chai";

export class MembershipService {
    private url: string;
    private accessToken: string;

    constructor(private baseUrl, private token) {
        this.url = baseUrl + "/memberships";
        this.accessToken = token;
    }

    async createMembership(mName: string, teamId: string, startDate: string, officeId: string, planId: string, mIsPersonal: boolean): Promise<Membership> {
        const requestBody = {
            name: mName,
            team: teamId,
            startDate: startDate,
            office: officeId,
            plan: planId,
            isPersonal: mIsPersonal
        };

        const response = await axios.post<Membership>(`${this.url}`, requestBody, {
            headers: {Authorization: `Bearer ${this.accessToken}`}
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

    // TODO: Add other service methods to the /membership endpoint
}