import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { lastValueFrom, map } from 'rxjs';

@Injectable()
export class ApisService {
  constructor(private http: HttpService) {}

  //toPromise() 없어짐. https://rxjs.dev/deprecations/to-promise
  async apiGet(inUrl: string, config: any): Promise<AxiosResponse> {
    // console.log(' inUrl = ', inUrl);
    try {
      const response = await lastValueFrom(
        this.http.get(`${inUrl}`, { ...config }).pipe(),
      );
      return response;
    } catch (error) {
      const { response } = error;

      return response;
    }
  }

  async apiPost(url: string, data: any = null, config: any): Promise<any> {
    const response = await lastValueFrom(
      this.http.post(url, data, { ...config }).pipe(),
    );

    return response;
  }

  async apiPut(
    url: string,
    data: any = null,
    config: any,
  ): Promise<AxiosResponse> {
    const response = await lastValueFrom(
      this.http.put(url, data, { ...config }).pipe(),
    );

    return response;
  }
  async apiRequest(config: any): Promise<any> {
    const response = await lastValueFrom(
      this.http.request({ ...config }).pipe(
        map((response) => {
          console.log('response.data  = ', response.data);
          return response.data;
        }),
      ),
    );

    return response;
  }
}
