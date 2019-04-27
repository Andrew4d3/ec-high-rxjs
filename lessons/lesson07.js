/*
  As you may suppose, concatMap is simply "map + concatAll"
  which, at the same time, is equivalent to mergeMap(_,_, 1)

  The rest is easy...
*/

import { fromEvent } from "rxjs";
import { concatMap } from "rxjs/operators";

const clickObservable = fromEvent(document, "click");

function performRequest() {
  return fetch("https://jsonplaceholder.typicode.com/users/1").then(res =>
    res.json()
  );
}

const emailObservable = clickObservable.pipe(
  concatMap(click => performRequest(), (click, res) => res.email)
  // Above line is the same as: mergeMap(click => performRequest(), (click, res) => res.email, 1)
);

// concatMap = map ... + ... concatAll
// mergeMap
// switchMap

emailObservable.subscribe(email => console.log(email));

/*
 Test this again with a slow connection and click multiple times
 to see how the requests will start one after the other one
 (not requests in paralell)
*/
