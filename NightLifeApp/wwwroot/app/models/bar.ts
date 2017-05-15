module app.models
{
    export class Bar
    {
        id: number;
        name: string;
        address: string;
        placeId: string;
        photoReference: string;
        peopleAttending: Array<NightLifeUser>;
        numberOfPeopleAttending: number;
        rating: number;
    }
}