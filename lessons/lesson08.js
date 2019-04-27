/*
 Using the high order operators we have seen so far we can customize 
 the behaviour of any source observable to do many specific things
*/
import { interval, of } from "rxjs";
import { mergeMap, take } from "rxjs/operators";

const sourceObservable = interval(500).pipe(take(5));

const resultObservable = sourceObservable.pipe(
  mergeMap(x => {
    // Example: we can filter odd and even values
    if (x % 2 === 0) {
      return of(x); // and return specific high order observables with them
    } else {
      return of(x + 1, x + 2); // like this one
    }
  })
);

resultObservable.subscribe(x => console.log(x));

/*
---0---1---2---3---4|

---+---+---+---+---+|
   \   \   \   \   \
   0|  23|  2| 45| 4|
   
---0---23--2---45--4|
*/

// mergeMap
// concatMap
// switchMap
