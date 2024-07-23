import { Component, OnInit, inject } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [RouterLink, QRCodeModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.scss'
})
export class ViewComponent implements OnInit {
  
  private _router = inject(Router);
  private _firestore: Firestore = inject(Firestore);
  private _route = inject(ActivatedRoute);
  public myCode: any = {};
  // para el qr
  public myAngularxQrCode: string = 'prueba';

  async ngOnInit(): Promise<void> {
    this._route.queryParams.subscribe(async (param: any) => {

      if (!param.id) return;

      const { id } = param;
      const docRef = doc(this._firestore, 'codes', id); // referencia al documento por su id
      this.myCode = (await getDoc(docRef)).data();
      this.myCode.id = id;

      if (this.myCode) {
        this.myAngularxQrCode = this.myCode.url;
      }
    })
  }
  
}
