import Header from "./components/header";
import Navigation from "./components/navigation";
import {Create} from "./components/create";
import {Favorite} from "./components/favorite";
import {Posts} from "./components/posts";
import Loader from "./components/loader";

new Header('header');
const navigation = new Navigation('navigation');
const loader  = new Loader('loader');
navigation.registerTabs([
    {name:'create',component : new Create('create')},
    {name:'favorite',component : new Favorite('favorite')},
    {name:'posts',component : new Posts('posts',loader)}
]);