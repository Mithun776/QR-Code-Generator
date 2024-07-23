import { Component, OnInit, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Code } from '../../models/code';
import { Firestore, addDoc, collection, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { QRCodeModule } from 'angularx-qrcode';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, QRCodeModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent implements OnInit {

  private _router = inject(Router);
  private _firestore: Firestore = inject(Firestore);
  private _route = inject(ActivatedRoute);

  public isEdit = false;
  public nombreControl: FormControl = new FormControl('');
  public enlaceControl: FormControl = new FormControl('');
  public myCode: any = {};

  private _codeCollection = collection(this._firestore, 'codes');

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
        this.isEdit = true;
        this.myAngularxQrCode = this.myCode.url;
        this.nombreControl.setValue(this.myCode.name);
        this.enlaceControl.setValue(this.myCode.url);
      }
    })
  }

  public createOrUpdate() {
    const codeItem: Code = {
      name: this.nombreControl.value,
      url: this.enlaceControl.value
    }

    if (!this.isEdit) {
      this.create(codeItem);
      return;
    }

    this.update(codeItem);
  }

  private create(codeItem: Code) {
    addDoc(this._codeCollection, codeItem)
      .finally(() => this._router.navigateByUrl('codes'));
  }

  private update(codeItem: Code) {
    const docRef = doc(this._firestore, 'codes', this.myCode.id);
    updateDoc(docRef, { ...codeItem })
      .finally(() => this._router.navigateByUrl('codes'));
  }
}
