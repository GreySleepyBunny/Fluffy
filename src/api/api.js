import firebase from "firebase";
import moment from "moment";

const getUrlParas = () => {
    var vars = {};
    window.location.href.replace(
        /[?&]+([^=&]+)=([^&]*)/gi,
        (str, key, value) => {
            vars[key] = value;
        }
    );
    return vars;
};

const firebaseConfig = {
    apiKey: getUrlParas().d,
    authDomain: "fluffy-6070b.firebaseapp.com",
    databaseURL: "https://fluffy-6070b.firebaseio.com",
    projectId: "fluffy-6070b",
    storageBucket: "fluffy-6070b.appspot.com",
    messagingSenderId: "682706664864",
    appId: "1:682706664864:web:2ca751fe7534e708c578c5",
    measurementId: "G-09W4SMXHFH",
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const api_InsertData = (child, data) => {
    return firebase
        .database()
        .ref(`${child}/${moment().format("YYYY-MM-DD")}/${moment().unix()}`)
        .set(data);
};

export const api_GetData = child => {
    return firebase.database().ref(`${child}/`).once("value");
};

export const api_UpdateData = (child, date, unixTime, data) => {
    var updates = {};
    updates[`/${child}/${date}/${unixTime}`] = data;
    return firebase.database().ref().update(updates);
};

export const api_DeleteData = (child, date, unixTime) => {
    return firebase.database().ref(`${child}/${date}/${unixTime}`).remove();
};
