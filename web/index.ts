import axios from "axios";
import * as ko from "knockout";
import moment from "moment"

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
    public from: moment.Moment;
    public to: moment.Moment;
    public adjustment: number;
    public note: string;
    public deleted: boolean;

    constructor(i: BreakResp) {
        this.id = i.id;
        this.userId = i.userId;
        this.from = moment(i.from);
        this.to = moment(i.to);
        this.adjustment = i.adjustment;
        this.note = i.note;
        this.deleted = i.deleted;
    }

}

class BreaksViewModel {

    public breaks = ko.observableArray();


    constructor() {
        this.fetch();
    }

    public fetch = () => {
        axios.get("http://localhost:8080/list")
            .then(response => {
                this.breaks(response.data);
                console.log(response.data);

            })
            .catch(function (error) {
                console.log(error);
            });
    }
}

var breaks = new BreaksViewModel();
ko.applyBindings(breaks)
