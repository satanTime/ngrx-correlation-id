import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {EntityComponent} from './entity.component';
import {EntityEffects} from './store/entity.effects';
import {reducers} from './store/reducers';

@NgModule({
  declarations: [EntityComponent],
  imports: [CommonModule, StoreModule.forFeature('users', reducers.users), EffectsModule.forFeature([EntityEffects])],
  exports: [EntityComponent],
})
export class EntityModule {}
