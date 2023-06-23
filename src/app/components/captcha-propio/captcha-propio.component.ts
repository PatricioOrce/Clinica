import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-captcha-propio',
  templateUrl: './captcha-propio.component.html',
  styleUrls: ['./captcha-propio.component.css']
})
export class CaptchaPropioComponent implements OnInit {
  captchaText!: string;
  userInput!: string;
  @Output () UserInput: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
    this.refreshCaptcha();
  }
  sendCaptcha(){
    this.UserInput.emit(this.userInput == this.captchaText);
  }

  refreshCaptcha() {
    this.captchaText = this.generateRandomText();
    this.userInput = '';
  }

  generateRandomText(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let randomText = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      randomText += chars[randomIndex];
    }
    return randomText;
  }
}
