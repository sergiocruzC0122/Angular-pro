import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pricing-page',
  imports: [],
  templateUrl: './pricing-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class PricingPage implements OnInit { 
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);
   
    ngOnInit() {
        this.title.setTitle('Pricing - My Application');
        this.meta.updateTag({ name: 'description', content: 'View our pricing options.' });
        this.meta.updateTag({ name: 'og.title', content: 'Pricing - My Application' });
        this.meta.updateTag({ name: 'keywords', content: 'pricing, plans, subscription' });
    }
}
