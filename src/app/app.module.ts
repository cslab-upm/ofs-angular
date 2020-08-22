import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule, RECAPTCHA_SETTINGS, RecaptchaSettings, RecaptchaFormsModule } from 'ng-recaptcha';

import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { WeatherComponent } from './components/weather/weather.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AccountComponent } from './components/account/account.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { httpInterceptorProviders } from './http-interceptors';

@NgModule({
	declarations: [
		LandingComponent,
		NavbarComponent,
		WelcomeComponent,
		CarouselComponent,
		WeatherComponent,
		FooterComponent,
		AppComponent,
		LoginComponent,
		RegisterComponent,
		AccountComponent,
		UserFormComponent,
		NotFoundComponent
	],
	imports: [
		AppRoutingModule,
		BrowserModule,
		HttpClientModule,
		NgbModule,
		FontAwesomeModule,
		TranslateModule.forRoot(),
		FormsModule,
		ReactiveFormsModule,
		RecaptchaModule,
		RecaptchaFormsModule
	],
	providers: [
		httpInterceptorProviders,
		{
			provide: RECAPTCHA_SETTINGS,
			useValue: {
				siteKey: '6LdxR74ZAAAAAEwaPD8lsdZ28Y-806q5eL6tBguk'
			} as RecaptchaSettings
		}
	],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
