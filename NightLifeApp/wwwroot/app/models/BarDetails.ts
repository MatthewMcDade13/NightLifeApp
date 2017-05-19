module app.models
{
    import BarReview = app.models.BarReview;

    export class BarDetails
    {
        phoneNumber: string;
        isOpenNow: boolean;
        priceLevel: number;
        rating: number;
        daysOpen: Array<string>;
        reviews: Array<BarReview>;
    }
}

//public string PhoneNumber { get; set; }
//public bool IsOpenNow { get; set; }
//public List<string> DaysOpen { get; set; }
//public float PriceLevel { get; set; }
//public float Rating { get; set; }
//public List<BarReviewViewModel> Reviews { get; set; }


