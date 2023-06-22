import { Injectable } from '@nestjs/common';
import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
 // Interface que define as configurações de requisição HTTP com os headers customizados
interface AxiosRequestConfigWithHeadersToken extends AxiosRequestConfig {
  headersToken: {
    [key: string]: string;
  };
}

@Injectable()
export class CpfService {
  // Função assíncrona que obtém o token de autenticação
  async SerproToken(clientId: string, clientSecret: string): Promise<string> {
    const url = 'https://gateway.apiserpro.serpro.gov.br/token/';
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + Buffer.from((`${clientId}:${clientSecret}`), 'binary').toString('base64'),
        'Accept': 'application/json'
    };
    console.log(headers);

    try {
        const response = await axios.post(url, 'grant_type=client_credentials',{ headers });

        return response.data.access_token;
    } catch (error) {

        throw(error);
    }
  }

   // Função assíncrona que consulta o CPF
  async CPFconsulting(clientInfo): Promise<any> {
    const regex = /[^a-z0-9]/gi;
    const cpf = clientInfo.cpf_customer.replace(regex, '');
    console.log(cpf);
    const token = await this.SerproToken(process.env.SERPRO_ID, process.env.SERPRO_KEY);

    const url = `https://gateway.apiserpro.serpro.gov.br/consulta-cpf-df/v1/cpf/${cpf}`;
    const data = await axios.get(url, {headers: {Authorization: `Bearer ${token}`,  'Content-type':'application/json'}})
    console.log(data.data)
    return (data.data.situacao.descricao).toString();
    }
}