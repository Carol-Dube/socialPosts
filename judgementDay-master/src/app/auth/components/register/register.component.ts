import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from '../../../shared/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers:[ UsersService ],
})
export class RegisterComponent implements OnInit {

  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
  }

  onSubmit(f: NgForm) {
    this.usersService.registerUser(f.value).subscribe((res) => {});
    console.log(f.value);
    this.router.navigate(['/login']);
  }

}
