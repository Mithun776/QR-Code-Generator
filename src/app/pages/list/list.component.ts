import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { Router, RouterLink } from '@angular/router';
import { Code } from '../../models/code';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent implements OnInit {

  private _router = inject(Router);
  private _firestore = inject(Firestore);
  private _codeCollection = collection(this._firestore, 'codes');

  public codeList: any[] = [];

  async ngOnInit(): Promise<void> {
    this.codeList = [];
    const documents = await getDocs(this._codeCollection);
    for await (const document of documents.docs) {
      this.codeList.push({ ...document.data(), id: document.id })
    }
  }

  openEditForm(item: Code) {
    this._router.navigateByUrl(`/form?id=${item.id}`)
  }

  openViewForm(item: Code) {
    this._router.navigateByUrl(`/view?id=${item.id}`)
  }
}
