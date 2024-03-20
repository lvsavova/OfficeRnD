interface Membership {
    _id: string;
    name: string;
    member?: string;
    team: string;
    startDate: Date;
    office: string;
    plan: string;
    isPersonal?: boolean;
}