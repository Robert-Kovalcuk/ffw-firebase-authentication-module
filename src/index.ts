import Observable from "./observer/Observable";
import Subscriber from "./observer/Subscriber";
import {watch} from "./utilities/watch";
import Authentication from "./authentication";

Authentication.currentAuthStatus().then(e => {
	console.log("asa")
	console.log(e)
})
Authentication.login("test@gmail.com", "test123456").then(r => {

})
