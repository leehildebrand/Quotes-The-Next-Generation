import { LightningElement, track } from 'lwc';
import { routeMeTo } from 'my/routerModule';

export default class App extends LightningElement {
    goToList() {
        routeMeTo('list');
    }
}
``