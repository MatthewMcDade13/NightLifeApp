module app.services
{
    import NightLifeUser = app.models.NightLifeUser;
    import Bar = app.models.Bar;

    export class StyleService
    {
        constructor()
        {

        }

        setRSVPButtonStyle(currentUser: NightLifeUser, bars: Array<Bar>): void
        {
            for (var i = 0; i < bars.length; i++)
            {                                
                if (bars[i].users.findIndex(u => u.email === currentUser.email) === -1)
                {
                    bars[i].RSVPButtonStyle = "btn-success";
                    bars[i].RSVPButtonText = "Im Going!"
                }
                else
                {
                    bars[i].RSVPButtonStyle = "btn-danger";
                    bars[i].RSVPButtonText = "Im Not Going."
                }
            }
        }

        setDefaultRSVPButtonStyle(bars: Array<Bar>)
        {
            for (var i = 0; i < bars.length; i++)
            {
                bars[i].RSVPButtonStyle = "btn-primary";
                bars[i].RSVPButtonText = "RSVP";
            }
        }
    }

    angular.module("NightLife").service("StyleService", StyleService);
}