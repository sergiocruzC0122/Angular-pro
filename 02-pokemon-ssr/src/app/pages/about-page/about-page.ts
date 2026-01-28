import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'about-page',
  imports: [],
  templateUrl: './about-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AboutPage implements OnInit { 
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);
   
    ngOnInit() {
        this.title.setTitle('About Us - My Application');
        this.meta.updateTag({ name: 'description', content: 'Learn more about My Application, our mission, and our team.' });
        this.meta.updateTag({ name: 'og.title', content: 'About Us - My Application' });
        this.meta.updateTag({ name: 'keywords', content: 'about, mission, team' });
    }
}
