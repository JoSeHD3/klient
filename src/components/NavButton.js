import React from 'react';
import { Link } from 'react-router-dom';


function OneButton(props){
    return (
        <div className="col-top-nav">
            <Link to={props.route} >{props.name}</Link>
        </div>
    );
}

function NavButton(props){
    const buttons = props.routes.map((route, index) => (
        <OneButton key={index} route={route.route} name={route.name} />
    ));

    return (
        <div>
            {buttons}
        </div>
    );
}

export default NavButton;