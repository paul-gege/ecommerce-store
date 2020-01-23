import React, {Fragment} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import cube from "../user/rubiks-cube.png";
import cart from "./cart.png";
import menu from "./menu.png";
import styled from "styled-components"
import {NavBar, HiddenContent, HamburgerDiv} from "../styled-components/NavBar.js"
import { signout, isAuthenticated } from "../auth/index.js";
 import { itemTotal } from "./cartHelpers";


const Menu = ({history}) => {

    const navLinkClicked = (e) => {
        e.preventDefault();
        signout(() => {
            history.push("/signin");
        })
    }

    return (
        <NavBar>
            <ul className="main-menu">
                <div className="logo">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" exact activeClassName="navSelect"> 
                            <img src={cube} alt="logo"/>
                        </NavLink>
                    </li>
                </div>
                <HiddenContent className="nav-content">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/shop" exact activeClassName="navSelect"> Shop </NavLink>
                    </li>
                    {!isAuthenticated() && (
                        <Fragment>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signin" exact activeClassName="navSelect"> Sign-in </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/signup" exact activeClassName="navSelect"> Sign-up </NavLink>
                            </li>
                        </Fragment>
                    )}
                    {isAuthenticated() && (
                        <Fragment>
                        {isAuthenticated() && isAuthenticated().user.role === 0 && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/user/dashboard" exact activeClassName="navSelect"> User Profile </NavLink>
                            </li>
                        )}
                        {isAuthenticated() && isAuthenticated().user.role === 1 && (
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/admin/dashboard" exact activeClassName="navSelect"> Admin Dashboard </NavLink>
                            </li>
                        )}
                            <li className="nav-item">
                                <NavLink to="/signout" className="nav-link" 
                                        onClick={navLinkClicked}
                                >
                                    Signout
                                </NavLink>
                            </li>
                        </Fragment>
                    )}
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/cart" exact activeClassName="navSelect"> 
                            <img src={cart} alt="logo"/>
                            <sup>
                                <small className="cart-badge">{itemTotal()}</small>
                            </sup>
                        </NavLink>
                    </li>
                </HiddenContent>
                <HamburgerDiv className="menu">
                    <li className="nav-item">
                        <label htmlFor="toggle"><img src={menu} alt="menu"/></label>
                    </li>
                </HamburgerDiv>
            </ul>
        </NavBar>
    )

}


export default withRouter(Menu);
