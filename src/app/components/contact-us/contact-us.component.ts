import { Component, OnInit } from '@angular/core';
import * as EmailJS from 'emailjs-com';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit{
  isLoading: boolean = false;
  ngOnInit() {
    EmailJS.init('l4n2KH-NrqSSL-cW_');
  }
  contactUsForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    message: new FormControl(null, [Validators.required]),
  })

  sendEmail() {
    const templateParams = {
      from_name: this.contactUsForm.get('name')?.value,
      to_name: 'ibrahim shafiq',
      email: this.contactUsForm.get('email')?.value,
      phone: this.contactUsForm.get('phone')?.value,
      message: this.contactUsForm.get('message')?.value,
    };
  
    EmailJS.send('service_cl89amb', 'template_4rlv5h6', templateParams)
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.log('FAILED...', error);
      });
  }
}
