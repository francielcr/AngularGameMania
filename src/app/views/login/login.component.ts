import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginModel: any;

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  userModel = new User()
  mensagem = "";
  receberDados(): void {
    console.log(this.userModel)

    const listaPalavras: string[] = ["select ", "from ", "drop ", "or ", "having ", "group ", "by ", "insert ", "exec ", "\"", "\'", "-- ", " #", "*", ";" ]

    listaPalavras.forEach(palavra => {
      if (this.userModel.email?.toLowerCase().includes(palavra)) {
        this.mensagem = "Dados Inválidos"
        return;
        
      }
      
    });

    this.loginService.login(this.userModel).subscribe((response) => {
      
      /*console.log("response:", response)
      console.log("O status Code é:", response.status)
      console.log("O Token de permissão é:", response.body.accessToken)*/
      this.mensagem = "Bem vindo " + response.body.user.nome
      console.log(this.mensagem)
    }, (responseErro) => {
      console.log("responseErro", responseErro)
      this.mensagem = responseErro.error;
      
    })
  }
}
