module app.models
{
    export class Bar
    {
        id: number;
        name: string;
        address: string;
        placeId: string;
        RSVPButtonStyle: string;
        RSVPButtonText: string;
        photoReference: string;
        users: Array<NightLifeUser>;
        numberOfPeopleAttending: number;
        rating: number;
    }
}