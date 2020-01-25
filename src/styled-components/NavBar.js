import styled from "styled-components";

export const NavBar = styled.nav`
    z-index: 3000;
    position: absolute;

    .logo {
        display: flex;
        align-items: center;
    }

    .navSelect {
        font-weight: bold;
        text-decoration: underline;
    }

    .main-menu {
        background: white;
        padding: 0;
        margin: 0 auto;
        display: flex;
        height: 100%;
        width: 70%;
        justify-content: space-between;
    }

    .main-menu div li {
        position: relative;
        list-style: none;
        display: flex;
        align-items: center;
    }

    .main-menu div li .nav-link {
        padding: 14px 20px 10px;
        display: inline-block;
        color: black;
        text-decoration: none;
    }

    & {
        height: 50px;
        width: 100%;
        box-shadow: 0px 5px 7px #E5E5E5;
        top: 0;
        left: 0;
    }
    
    img {
        width: 30px;
        height: 30px;
        margin-left: 
    }

    span {
        cursor: pointer;
    }

`

export const HiddenContent = styled.div`
    display: flex;
    height: 100%;

    @media (max-width: 768px) {
        display: none;
    }
`

export const HamburgerDiv = styled.div`
    display: none;

    @media (max-width: 768px) {
        display: flex;
        align-items: center;
    }
`