import React from "react";
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useMargin } from './MarginContext';

function Sidebar(){

    const {setMarginLeft} = useMargin();

    return (
        <SideNav onSelect={(selected) => {
            const to = '/' + selected;
            window.location.href = to;
        }}
            onToggle= {(expanded) => {
                setMarginLeft(expanded ? '240px' : '64px');
            }}>
            <SideNav.Toggle />
            <SideNav.Nav defaultSelected="">
                <NavItem eventKey="">
                    <NavIcon>
                        <FontAwesomeIcon icon={faHome} style={{fontSize: "1.75em"}}/>
                    </NavIcon>
                    <NavText>
                        Home
                    </NavText>
                </NavItem>
                <NavItem eventKey="pages/Test">
                    <NavIcon>
                        <FontAwesomeIcon icon={faUser} style={{fontSize: "1.75em"}}/>
                    </NavIcon>
                    <NavText>
                        Profile
                    </NavText>
                </NavItem>
            </SideNav.Nav>

        </SideNav>
    );
}

export default Sidebar;