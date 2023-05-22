import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'ms-core-shell',
  templateUrl: 'core.shell.html',
  styleUrls: ['core.shell.scss'],
})
export class CoreShell implements OnDestroy {
    ngOnDestroy(): void {
        alert('Destroyed');
    }
}
