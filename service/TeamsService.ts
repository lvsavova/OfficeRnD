import axios from "axios";
import {expect} from "chai";

export class TeamsService {
    private url: string;
    private accessToken: string;

    constructor(private baseUrl, private token) {
        this.url = baseUrl + "/teams";
        this.accessToken = token;
    }

    async getTeamByCompanyName(companyName: string): Promise<Team> {
        const response = await axios.get<Team[]>(`${this.url}`, {
            headers: {Authorization: `Bearer ${this.accessToken}`}
        });

        if (response.status === 200) {
            const teams: Team[] = response.data;
            return teams.find(team => team.name === companyName);
        } else {
            throw new Error(`Failed to fetch teams. Status code: ${response.status}`);
        }

    }

    // TODO: Add other service methods to the /teams endpoint
}