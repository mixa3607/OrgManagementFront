import {BehaviorSubject, Observable, of} from 'rxjs';
import {IIdNamePair} from '../models/interfaces/i-id-name-pair';
import {filter, map, switchMap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

export class TypesGetMgr {
    private inTypesGetting = false;
    private typesIsActualSubject = new BehaviorSubject<boolean>(false);
    private typesCache = new Map<number, IIdNamePair>();

    public typesChangedObs = this.typesIsActualSubject.pipe(filter(value => value === false));

    constructor(private http: HttpClient, private typesUrl: string) {
    }

    public flush(): void {
        this.typesIsActualSubject.next(false);
    }

    getAll(): Observable<IIdNamePair[]> {
        if (this.inTypesGetting) {
            return this.typesIsActualSubject.pipe(filter(x => x === true), switchMap(() => of(Array.from(this.typesCache.values()))));
        } else if (this.typesIsActualSubject.value === true) {
            return of(Array.from(this.typesCache.values()));
        } else {
            return this.http.get<IIdNamePair[]>(this.typesUrl).pipe(
                map(value => {
                    value.forEach(x => this.typesCache.set(x.id, x));
                    this.typesIsActualSubject.next(true);
                    this.inTypesGetting = false;
                    return value;
                }));
        }
    }

    get(id: number): Observable<IIdNamePair> {
        if (this.typesIsActualSubject.value === true) {
            return of(this.typesCache.get(id));
        } else {
            return this.getAll().pipe(switchMap(() => of(this.typesCache.get(id))));
        }
    }

    add(name: string): Observable<any> {
        return this.http.post<any>(this.typesUrl, JSON.stringify(name)).pipe(
            map(value => {
                this.typesIsActualSubject.next(false);
                return value;
            }));
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.typesUrl}/${id}`).pipe(
            map(value => {
                this.typesIsActualSubject.next(false);
                return value;
            }));
    }
}
