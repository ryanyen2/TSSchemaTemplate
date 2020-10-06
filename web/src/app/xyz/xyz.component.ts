import maleP from './../../../../utility/userUtilitiy';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-xyz',
  templateUrl: './xyz.component.html',
  styleUrls: ['./xyz.component.scss']
})
export class XyzComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const user = {
      name: 'low',
      age: 20
    };
    console.log(maleP(user));

  }

}
