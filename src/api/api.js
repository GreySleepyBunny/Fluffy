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
    authDomain: `${getUrlParas().p}.firebaseapp.com`,
    databaseURL: `https://${getUrlParas().p}.firebaseio.com`,
    projectId: getUrlParas().p,
    storageBucket: `${getUrlParas().p}.appspot.com`,
    messagingSenderId: "682706664864",
    appId: getUrlParas().id,
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

export const api_UpdateData = (child, key, data) => {
    var updates = {};
    updates[`/${child}/${key}`] = data;
    return firebase.database().ref().update(updates);
};

export const api_DeleteData = (child, key) => {
    return firebase.database().ref(`${child}/${key}`).remove();
};
