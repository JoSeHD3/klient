import React from 'react';

function OneButton(props){

    const handleClick = () => {
        window.location.href = props.route;
    };

    return (
        <button className = "col-top-nav" onClick={handleClick}>
            {props.name}
        </button>
    );
}

function NavButton(props){
    const buttons = props.routes.map((route, index) => (
        <OneButton key={index} route={route.route} name={route.name} />
    ));

    return (
        <div className="top-nav">
            {buttons}
        </div>
    );
}

export default NavButton;