import axios from "axios";
import * as ko from "knockout";
import * as moment from "moment"
import * as $ from "jquery";
import "jquery-ui/ui/widgets/draggable";
import "jquery-ui/ui/position";


interface RegisterData {
    id: number;
    userId: string;
    from: number;
    to: number;
    adjustment: number;
    note: string;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
}


interface BreakEntityData {
    id: number;
    userId: string;
    from: number;
    to: number;
    adjustment: number;
    note: string;
    deleted: boolean;
    createdAt: number;
    updatedAt: number;
}

class Break {

    public id: number;
    public userId: string;
    public from = ko.observable<moment.Moment>();
    public to = ko.observable<moment.Moment>();
    public adjustment: number;
    public note: string;
    public deleted: boolean;

    constructor(i?: BreakEntityData) {
        if (i) {
            this.id = i.id;
            this.userId = i.userId;
            this.from(moment(i.from, "X"));
            this.to(moment(i.to, "X"));
            this.adjustment = i.adjustment;
            this.note = i.note;
            this.deleted = i.deleted;
        }
    }

    public txtPeriod = ko.pureComputed<string>(() => {
        let period = this.from().format("YYYY-MM-DD");
        period += "&emsp;";
        period += this.from().format("HH:mm");
        period += " &ndash; ";
        period += this.to().format("HH:mm");
        return period;
    });

    public txtDuration = ko.pureComputed<string>(() => {
        let totalMinutes = this.to().diff(this.from(), "minutes");
        let minutes = totalMinutes % 60;
        let hours = (totalMinutes - minutes) / 60;
        return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
    });



}

class BreaksViewModel {


    public breaks = ko.observableArray<Break>();
    private $newDialog: JQuery;
    public calendar: JQuery = undefined;
    public newBreakInput = {
        from: ko.observable<string>("2016-10-10 14:20"),
        to: ko.observable<string>("2016-10-10 15:20"),
        note: ko.observable<string>(),
        txtAdjustment: ko.observable<string>()
    };

    constructor() {
        // axios.defaults.baseURL = "http://localhost:8080/";
        axios.defaults.baseURL = "https://timetracker-160918.appspot.com/";
        axios.defaults.timeout = 1000;

        this.fetch();
        // this.$newDialog = $("#newBreak").dialog({
        //     position: {
        //         my: "center", at: "center", of: window
        //     },
        //     modal: true,
        //     show: { effect: "scale", duration: 100 },
        //     create: (event, ui) => {

        //     },
        //     close: (event, ui) => console.log(event, ui),
        //     resizable: false,
        //     title: "TimeTracker",
        //     closeOnEscape: true
        // });
    }

    public fetch = () => {
        axios.get("list")
            .then(response => {
                this.breaks(response.data.map(item => new Break(item)));
                console.log(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    public cmdClose() {
        this.$newDialog.dialog("close");
    }

    public cmdSave() {

        let newBreak = <BreakEntityData>{};


        newBreak.userId = "timetracker";

        let from = moment(this.newBreakInput.from(), "YYYY-MM-DD HH:mm", true);
        let to = moment(this.newBreakInput.to(), "YYYY-MM-DD HH:mm", true);

        if (from.isValid() && to.isValid() && from.isBefore(to)) {
            newBreak.from = Number(from.format("X"));
            newBreak.to = Number(to.format("X"));
            newBreak.userId = "timetracker";
            console.log(newBreak);

            axios.post("register", newBreak).then(response => {
                console.log(response);
            }).catch(error => console.log(error));

        }
        else {
            console.log("Fail");
            return;
        }
    }


    // public cmdDetail(b: Break, event: MouseEvent) {
    //     $("#calendar").dialog({
    //         position: {
    //             my: "center top", at: "center", of: event
    //         },
    //         modal: true,
    //         show: { effect: "scale", duration: 100 },
    //         create: (event, ui) => {

    //         },
    //         close: (event, ui) => console.log(event, ui),
    //         resizable: false,
    //         title: "TimeTracker",
    //         closeOnEscape: true
    //     });

    // }

    public hideCalendar() {
        console.log("hide", this);
        if (this.calendar.data("on") == 1) {
            this.calendar.removeData("on");
            this.calendar.fadeOut(100);
        }
    }

    public showCalendar(date: KnockoutObservable<moment.Moment>, event: MouseEvent) {

        let options: JQueryUI.JQueryPositionOptions = {
            my: "center top",
            at: "center",
            of: event.currentTarget
        };

        if (this.calendar == undefined) {
            this.calendar = $("#calendar").draggable();
        }
 
        let data = this.calendar.data("on");
        if (data == undefined) {
            this.calendar.fadeIn(150).position(options);
            this.calendar.data("on", 1)
        } else if (data == 1) {
            this.calendar.position(options);
        }

    }

}

var breaks = new BreaksViewModel();
ko.applyBindings(breaks)
