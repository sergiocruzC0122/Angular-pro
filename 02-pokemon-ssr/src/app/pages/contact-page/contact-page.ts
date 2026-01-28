import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'contact-page',
  imports: [],
  templateUrl: './contact-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ContactPage implements OnInit {
    private readonly title = inject(Title);
    private readonly meta = inject(Meta);
   
    ngOnInit() {
        this.title.setTitle('Contact Us - My Application');
        this.meta.updateTag({ name: 'description', content: 'Get in touch with us.' });
        this.meta.updateTag({ name: 'og.title', content: 'Contact Us - My Application' });
        this.meta.updateTag({ name: 'keywords', content: 'contact, email, phone' });
    }
 }
