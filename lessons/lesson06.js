/*
  Just as switchMap is "map + switch",
  MergeMap is "map + merge"

  It works exactly the same!
*/
import { fromEvent } from "rxjs";
import { mergeMap } from "rxjs/operators";

const clickObservable = fromEvent(document, "click");

function performRequest() {
  return fetch("https://jsonplaceholder.typicode.com/users/1").then(res =>
    res.json()
  );
}

const emailObservable = clickObservable.pipe(
  mergeMap(click => performRequest(), (click, res) => res.email, 3)
  /*
    Here we receive two additional parameters
    1.- it's a handler function which receives as parameters:
       The first order observable return (the click event) as one first parameter
      And the high observable return (the request response) as the second one
    Bear in mind, whatever you retun within this function will be the return of your entire observable

    The second parameter is how many subscriptions we will keep at any moment
    This behaves exactly the same as mergeAll(n)
  */
);

// mergeMap = map ... + ... mergeAll

emailObservable.subscribe(email => console.log(email));

/*
  Test again using a slow connection (developer tools)
  You will see how the responses merge at the end
  But just a maximum of 3 request would be working at the same time at any moment
*/
