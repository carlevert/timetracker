import axios from "axios";
import * as ko from "knockout";
import * as moment from "moment"
import * as $ from "jquery";
import "jquery-ui-dist/jquery-ui.min.js";

interface BreakResp {
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

    constructor(i: BreakResp) {
        this.id = i.id;
        this.userId = i.userId;
        this.from(moment(i.from, "X"));
        this.to(moment(i.to, "X"));
        this.adjustment = i.adjustment;
        this.note = i.note;
        this.deleted = i.deleted;
    }

    public txtId = ko.pureComputed

    public txtFrom = ko.pureComputed<string>(() => {
        return this.from().format("YYYY-MM-DD HH:mm:ss");
    });
    public txtTo = ko.pureComputed<string>(() => {
        return this.to().format("HH:mm:ss");
    });
    public txtDuration = ko.pureComputed<string>(() => {
        let fromMs = this.from().milliseconds();
        let toMs = this.to().milliseconds();
        return moment.duration(toMs - fromMs, "milliseconds").humanize();
    });


}

class BreaksViewModel {

    public breaks = ko.observableArray<Break>();


    constructor() {
        this.fetch();
    }

    public fetch = () => {
        axios.get("https://timetracker-160918.appspot.com/list")
            .then(response => {
                this.breaks(response.data.map(item => new Break(item)));
                console.log(response.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    public cmdDetail(b: Break, event: MouseEvent) {
        
        $("#detail").dialog({
            position: {
                my: "center top", at: "center", of: event
            },
            modal: true,
            show: { effect: "scale", duration: 100 },
            create: (event, ui) => {
                
            },
            close: (event, ui) => console.log(event, ui),
            resizable: false,
            title: "TimeTracker",
            closeOnEscape: true
        });


    }



}

var breaks = new BreaksViewModel();
ko.applyBindings(breaks)
