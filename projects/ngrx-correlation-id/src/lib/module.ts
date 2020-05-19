import {NgModule} from '@angular/core';
import {Store, StoreModule} from '@ngrx/store';

import {cidReducer} from './reducer';

export let ngrxCorrelationIdStore: Store;

@NgModule({
    imports: [StoreModule.forFeature('ngrxCorrelationId', cidReducer)],
})
export class NgrxCorrelationIdModule {
    constructor(store: Store) {
        ngrxCorrelationIdStore = store;
    }
}
