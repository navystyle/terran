import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";

@Component({
    selector: 'user-delete-form',
    templateUrl: './user-delete-form.component.html'
})
export class UserDeleteFormComponent implements OnInit {

    loading: boolean = false;
    errorResponse: string;

    @Input('user') user: User = new User;
    @Output() success: EventEmitter<any> = new EventEmitter<any>();

    formGroup: FormGroup = new FormGroup({
        'Id': new FormControl('', Validators.required),
    });

    constructor(private service: UserService) {
    }

    ngOnInit() {
        this.reset();
    }

    public reset() {
        this.formGroup.reset(this.user);
    }

    public submit() {
        if (this.formGroup.valid) {
            this.loading = true;
            this.service.delete(this.formGroup.getRawValue())
                .subscribe(
                    response => this.successful(response),
                    error => this.failure(error),
                    () => console.log('user-delete-form::submit done.')
                )
        }
    }

    public successful(response: any): void {
        this.loading = false;
        this.reset();
        this.success.emit(response.data);
    }

    public failure(error: any): void {
        this.loading = false;
        this.errorResponse = error;
        console.log(this.errorResponse);
    }
}
