import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Calculator } from '../../components/calculator/calculator';

@Component({
  selector: 'calculater-view',
  imports: [Calculator],
  templateUrl: './calculater-view.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculaterView {}