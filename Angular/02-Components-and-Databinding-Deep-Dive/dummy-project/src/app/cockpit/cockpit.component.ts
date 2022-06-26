import {
	Component,
	OnInit,
	EventEmitter,
	Output,
	ViewChild,
	ElementRef,
} from '@angular/core';

@Component({
	selector: 'app-cockpit',
	templateUrl: './cockpit.component.html',
	styleUrls: ['./cockpit.component.css'],
})
export class CockpitComponent implements OnInit {
	@Output() serverCreated = new EventEmitter<{
		serverName: string;
		serverContent: string;
	}>();
	@Output() blueprintCreated = new EventEmitter<{
		blueprintName: string;
		blueprintContent: string;
	}>();
	// newServerName = '';
	// newServerContent = '';
	@ViewChild('serverContentRef') serverInputContentRef: ElementRef;

	constructor() {}

	ngOnInit(): void {}

	onAddServer(serverInputElement: HTMLInputElement) {
		this.serverCreated.emit({
			serverName: serverInputElement.value,
			serverContent: this.serverInputContentRef.nativeElement.value,
		});
	}

	onAddBlueprint(blueprintInputElement: HTMLInputElement) {
		this.blueprintCreated.emit({
			blueprintName: blueprintInputElement.value,
			blueprintContent: this.serverInputContentRef.nativeElement.value,
		});
	}
}
