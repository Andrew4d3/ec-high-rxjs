/*
  We already know we can "map" an observable and then flatten it using
  "switchAll".

  But there's a better way to do this using a shorcut method called "switchMap"
*/
import { fromEvent } from "rxjs";
import { switchMap } from "rxjs/operators";

const clickObservable = fromEvent(document, "click");

// It also works with promises so we don't have to do any special transformation here
// The promise will be handled as if it were an obserbable
function performRequest() {
  return fetch("https://jsonplaceholder.typicode.com/users/1").then(res =>
    res.json()
  );
}

// Observable<Event> ---> Observable<Response>
const responseObservable = clickObservable.pipe(
  switchMap(click => performRequest()) // This will map + switch
);

// switchMap = map ... + ... switchAll

responseObservable.subscribe(x => console.log(x.email));

/*
 Remember switchMap (map + switchAll) will keep only one oserbable subscription going at the time
 So if you click while the past fetch request hasn't completed yet,
 it will suspend that request and start a new one

 You can test this by simulating a "throlling a network" with the Chrome developer tools
 Use some slow connection and then try clicking twice very quickly
 You will see only the response from the latest click
 */
