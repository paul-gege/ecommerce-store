import React, {Fragment, useState} from 'react'
import {NavLink, withRouter} from 'react-router-dom'
import cube from "../user/rubiks-cube.png";
import cart from "./cart.png";
import styled from "styled-components"
import NavBar from "../styled-components/NavBar.js"
import { signout, isAuthenticated } from "../auth/index.js";
import { itemTotal } from "./cartHelpers";

const SideNav = ({history}) => {

    const [toggleInput, setToggleInput] = useState(false);

	const navLinkClicked = (e) => {
        e.preventDefault();
        removeSideBar();
        signout(() => {
            history.push("/signin");
        })
    }

    const handleToggle = (event) => {
        setToggleInput(event.target.checked)
    }

    const removeSideBar = () => {
        setToggleInput(false);
    }

	return (
        <WrapBar>
            <input type="checkbox" id="toggle" onChange={handleToggle} checked={toggleInput} name="toggle"/>
    		<SideBarDiv className="side-nav">
                <ul className="main-menu">
                    <div className="nav-content">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/shop" onClick={removeSideBar} exact activeClassName="navSelect"> Shop</NavLink>
                        </li>
                        {!isAuthenticated() && (
                            <Fragment>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signin" onClick={removeSideBar} exact activeClassName="navSelect"> Sign-in </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/signup" onClick={removeSideBar} exact activeClassName="navSelect"> Sign-up </NavLink>
                                </li>
                            </Fragment>
                        )}
                        {isAuthenticated() && (
                            <Fragment>
                            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/user/dashboard" onClick={removeSideBar} exact activeClassName="navSelect"> User Profile </NavLink>
                                </li>
                            )}
                            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                                <li className="nav-item">
                                    <NavLink className="nav-link" onClick={removeSideBar} to="/admin/dashboard" exact activeClassName="navSelect"> Admin Dashboard </NavLink>
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
                            <NavLink className="nav-link" onClick={removeSideBar} to="/cart" exact activeClassName="navSelect"> Cart {itemTotal()} </NavLink>
                        </li>
                    </div>
                </ul>
            </SideBarDiv>
        </WrapBar>
	)
}

const SideBarDiv = styled.div`
	display: flex;
	flex-direction: column;
	width: 300px;
	height: 100vh;
	min-height: 600px;
    padding-top: 100px;
    padding-left: 30px;
    box-shadow: 0px 5px 7px #E5E5E5;
    position: fixed;
    z-index: 2000;
    background-color: white;
    right: -100%;
    top: 0%;
    transition: right 0.5s;

    .nav-link {
        text-decoration: none;
        color: black;
    }

    .nav-item {
        margin-bottom: 20px;
    }

    .navSelect {
        font-weight: bold;
        text-decoration: underline;
    }

    .main-menu { 
        height: 100%;
        width: 100%;
        font-size: 30px;
        display: flex;
        justify-content: flex-start;
        margin: 0px;
        padding: 0px;
        list-style: none;
    }
`

const WrapBar = styled.div`

    input[type="checkbox"] {
        display: none;  
    }

    input[type="checkbox"]:checked + .side-nav {
        right: 0;  
    }

`

export default withRouter(SideNav);