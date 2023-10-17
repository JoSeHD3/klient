import React from 'react';

import {useMargin} from '../components/MarginContext';

function ErrorSite(){
    const {marginLeft} = useMargin();

    return(
        <div className="site-first-div" style={{marginLeft}}>
            <h1>ERROR CODE: 404</h1>
        </div>
    );
}


export default ErrorSite;
