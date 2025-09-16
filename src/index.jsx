/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'
import './index.css'
import Home from './Home.jsx'
import Yinxixue from './yinxixue/index.jsx'
const base = import.meta.env.BASE_URL;

render(
    () => (
        <>
            <link rel="icon" type="image/svg+xml" href={base+"zhong.svg"} />
        </>
    ), document.head
);

function Layout(props) {
    return (
        <>
            <div class="icon" id="nav-icon">
                <svg viewBox="0 0 10 10">
                    <path d="M 0 .5 H 10 M 0 3.5 H 10 M 0 6.5 H 10 M 0 9.5 H 10"/>
                </svg>
            </div>
            <nav>
                <ul>
                    <li><a href={base}>Home</a></li>
                    <li><a href={base+"yinxixue"}>音系学</a></li>
                    <li><a href={base+"cihai"}>辞海</a></li>
                </ul>
            </nav>
            <main>
                {props.children}
            </main>
        </>
    );
}

render(
    () => (
        <Router root={Layout}>
            <Route path={base+"/"} component={Home} />
            <Route path={base+"yinxixue"} component={Yinxixue} />
        </Router>
    ),
    document.getElementById('root')
);