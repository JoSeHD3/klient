import React from "react";
import SideNav, {Toggle, Nav, NavItem, NavIcon, NavText} from "@trendmicro/react-sidenav";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { faBriefcase, faHome, faLightbulb, faUniversalAccess } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useMargin } from './MarginContext';

function Sidebar(){

    const {setMarginLeft} = useMargin();

    const sidebarStyle = {
        background: '#555555',
        color: '#fff',
    };

    const iconStyle = {
        color: '#fff',
        fontSize: '1.75em'
    };

    return (
        <SideNav style={sidebarStyle} onSelect={(selected) => {
            const to = '/' + selected;
            window.location.href = to;
        }}
            onToggle= {(expanded) => {
                setMarginLeft(expanded ? '240px' : '64px');
            }}>
            <Toggle />
            <Nav defaultSelected="">
                <NavItem eventKey="">
                    <NavIcon>
                        <FontAwesomeIcon icon={faHome} style={iconStyle}/>
                    </NavIcon>
                    <NavText>
                        Strona główna
                    </NavText>
                </NavItem>
                <NavItem eventKey="pages/Profile">
                    <NavIcon>
                        <FontAwesomeIcon icon={faUser} style={iconStyle}/>
                    </NavIcon>
                    <NavText>
                        Profil
                    </NavText>
                </NavItem>
                <NavItem eventKey="pages/Company">
                    <NavIcon>
                        <FontAwesomeIcon icon={faUniversalAccess} style={iconStyle}/>
                    </NavIcon>
                    <NavText>
                        Firma
                    </NavText>
                </NavItem>
                <NavItem eventKey="pages/Commision">
                    <NavIcon>
                        <FontAwesomeIcon icon={faBriefcase} style={iconStyle}/>
                    </NavIcon>
                    <NavText>
                        Zlecenie
                    </NavText>
                </NavItem>
                <NavItem eventKey="pages/Help">
                    <NavIcon>
                        <FontAwesomeIcon icon={faLightbulb} style={iconStyle}/>
                    </NavIcon>
                    <NavText>
                        Pomoc
                    </NavText>
                </NavItem>
            </Nav>

        </SideNav>
    );
}

export default Sidebar;