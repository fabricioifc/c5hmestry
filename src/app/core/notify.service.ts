import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';

/// Notify users about errors and other helpful stuff
export interface Msg {
  content: string;
  style: string;
}

@Injectable()
export class NotifyService {

  private _msgSource = new Subject<Msg | null>();

  msg = this._msgSource.asObservable();

  update(content: string, style: 'error' | 'info' | 'success') {
    this.clear()
    const msg: Msg = { content, style };
    // setTimeout(()=>{ this._msgSource.next(msg) }, 10)
    this._msgSource.next(msg)
  }

  clear() {
    this._msgSource.next(null);
  }
}
