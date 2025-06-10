import { LightningElement, api, track } from 'lwc';
//make the quotes available to the component
import { getQuotes } from 'data/quoteService';
import { routeMeTo } from 'my/routerModule';

var quotes = [];
export default class Quote extends LightningElement {
    quotes = [];
    connectedCallback() {
        getQuotes().then(result => {
            this.quotes = this.allQuotes = result;
        });
    }

    goToHome() {
        routeMeTo('home');
    }
}
