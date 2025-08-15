import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {LoginRoutes} from "./login.routing";
import {CommonModule, NgOptimizedImage} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MaterialModule} from "../../../material.module";
import {LoginComponent} from "./login.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

@NgModule({
    imports: [
        RouterModule.forChild(LoginRoutes),
        CommonModule,
        FormsModule,
        MaterialModule,
        MatIconModule,
        MatButtonModule,
        NgOptimizedImage
    ],
    declarations: [LoginComponent]
})
export class LoginModule {
}