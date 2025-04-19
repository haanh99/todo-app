import { Component } from "@angular/core";
import { HeaderComponent } from "./component/header/header.component";
import { MainComponent } from "./component/main/main.component";
import { FooterComponent } from "./component/footer/footer.component";

@Component ({
    selector: 'app-todos',
    templateUrl: './todos.component.html',
    styleUrls: ['./todos.component.css'],
    imports: [HeaderComponent, MainComponent, FooterComponent],
    standalone: true
})
export class TodosComponent {}