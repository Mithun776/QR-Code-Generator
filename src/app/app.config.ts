import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideFirebaseApp(() => initializeApp({ 
        apiKey: "AIzaSyDkgnqYOvYFW5l1J7jmUUxeg-g51dkPCMo",
        authDomain: "generator-qr-f7fa1.firebaseapp.com",
        projectId: "generator-qr-f7fa1",
        storageBucket: "generator-qr-f7fa1.appspot.com",
        messagingSenderId: "668170010544",
        appId: "1:668170010544:web:6a1c7f5c4b41355368e075"      
    })),
    provideFirestore(() => getFirestore())
  ]
};
