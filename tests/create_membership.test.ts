import {expect} from "chai";
import axios from "axios";
import * as fs from "fs";
import Config = Chai.Config;
import {MembershipService} from '../service/MembershipService.js';
import {TeamsService} from "../service/TeamsService.js";
import {PlanService} from "../service/PlanService.js";
import {AuthorizationService} from "../service/AuthorizationService.js";

function readConfig(): Config {
    const rawConfig = fs.readFileSync('tests/testConfig.json', 'utf-8');
    return JSON.parse(rawConfig) as Config;
}

let config = readConfig();
;
let baseURL;
let accessToken;
let plan: Plan;
let team: Team;

let authService;
let teamService;
let planService;
let membershipService;

describe('Test', function () {
    before(async function () {
        // Read config file
        config = readConfig();
        baseURL = 'https://app.officernd.com/api/' + config.apiVersion + '/organizations/' + config.orgSlug;

        // Authorize and get an access token
        authService = new AuthorizationService();
        accessToken = await authService.getAccessToken(config.clientID, config.clientSecret);

        // Initialize services
        teamService = new TeamsService(baseURL, accessToken);
        planService = new PlanService(baseURL, accessToken);
        membershipService = new MembershipService(baseURL, accessToken);
    });

    it('Get plan', async function () {
        plan = await planService.getPlanByName(config.planName);
    });

    it('Get office and team for company', async function () {
        team = await teamService.getTeamByCompanyName(config.companyName);
    });

    it('Create membership for team', async function () {
        await membershipService.createMembership(config.membershipName, team._id, config.startDate, team.office, plan._id, false)
    });
});

