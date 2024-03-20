interface Plan {
    _id: string;
    useValueCredits: boolean;
    type: string;
    deposit: string;
    intervalLength: string;
    price: string;
    extras: string[];
    setupFees: string[];
    credits: {
        type: string;
        rates: string[];
        resourceTypes: string[];
        oneOffPlans: string[];
        goods: string[];
        validFor: string;
        count: number;
    }[];
}