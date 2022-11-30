import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

//bcrypt
@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  async login(username: string, password: string) {
    try {
      const { data } = await firstValueFrom(
        this.http.post(
          'http://localhost:8000/auth/realms/master/protocol/openid-connect/token',
          new URLSearchParams({
            client_id: 'nest',
            client_secret: '7P5jeDYabXPCs72m9TiFhCl8Kj6Ua3jV',
            grant_type: 'password',
            username,
            password,
          }),
        ),
      );

      return data;
    } catch (err: any) {
      const { data } = err.response;
      if (data.error === 'invalid_grant') {
        throw new Error('Usuário ou senha inválidos');
      }
    }
  }
}
//auth0 - jsonwebtoken
