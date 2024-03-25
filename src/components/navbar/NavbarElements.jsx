import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  background: white;
  height: 55px;
  padding: 0.2rem calc((100vw - 1000px) / 2);
  z-index: 12;
  border-bottom: 1px solid grey;
  /* Third Nav */
  /* justify-content: flex-start; */
`;

export const SubNav = styled.div`
  display: none;
  position: absolute;
  width: 250px;
  top: 80%;
  left: -30px;
  background: white;
  z-index: 10;
  border-radius: 5px;
  box-shadow: 0 0 15px 2px rgba(125, 125, 125, 0.3);
`;

export const SubNavItem = styled(Link)`
  display: list-item;
  color: black;
  text-decoration: none;
  list-style-type: none;
  padding: 1rem 2rem;
  &:hover {
    background-color: rgba(125, 125, 125, 0.3);
  }
  &:hover:first-child {
    border-radius: 5px 5px 0 0;
  }
`;

export const NavLink = styled(Link)`
  color: black;
  position: relative;
  display: flex;
  height: 100%;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  cursor: pointer;
  &.active {
    color: #000000;
  }
  &:hover {
    ${SubNav} {
    display: block;
    }
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #808080;
  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  /* display: flex;
     align-items: center;*/
  /* margin: 0 -25px;*/
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  margin-right: 24px;
  /* Third Nav */
  /* justify-content: flex-end;
  width: 100vw; */
  @media screen and (max-width: 768px) {
    display: none;
  }
`;

export const NavBtnLink = styled(Link)`
  border-radius: 4px;
  background: #808080;
  padding: 10px 22px;
  color: #000000;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  /* Second Nav */
  margin-left: 24px;
  &:hover {
    transition: all 0.2s ease-in-out;
    background: #fff;
    color: #808080;
  }
`;

