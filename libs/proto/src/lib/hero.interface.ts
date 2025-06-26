import { Observable } from 'rxjs';

export interface HeroById {
  id: number;
}

export interface Hero {
  id: number;
  name: string;
}

export interface HeroService {
  findOne(data: HeroById): Observable<Hero>;
}
