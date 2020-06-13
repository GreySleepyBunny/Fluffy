import moment from "moment";

export const columnDefs = {
    time: {
        col: "time",
        defaultValue: moment(new Date()).format("HH:mm:ss"),
    },
    date: {
        col: "date",
        defaultValue: moment(new Date()).format("YYYY-MM-DD"),
    },
    g: { col: "g" },
    calories: { col: "calories" },
    brand: { col: "brand" },
    foodType: { col: "foodType" },
    flavor: { col: "flavor" },
    gel: { col: "gel" },
    like: { col: "like", defaultValue: false },
    diarrhea: { col: "diarrhea", defaultValue: false },
    throwUp: { col: "throwUp", defaultValue: false },
    others: { col: "others" },
    cereals: { col: "cereals", defaultValue: false },
    child: { col: "child", defaultValue: "Hugo" },
};
