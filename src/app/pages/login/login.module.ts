import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginRoutes} from "./login.routing";
import {CommonModule} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import {LoginComponent} from "./login.component";

@NgModule({
    imports: [
        RouterModule.forChild(LoginRoutes),
        CommonModule,
        FormsModule,
        MaterialModule
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}