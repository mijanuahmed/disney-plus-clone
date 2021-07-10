import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  SelectUserName,
  SelectUserPhoto,
  setSignOut,
  setUserLogin,
} from "../features/user/userSlice";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { auth, provider } from "../firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";

const Nav = styled.nav`
  height: 70px;
  background: #090b13;
  display: flex;
  align-items: center;
  padding: 0 36px;
  overflow-x: hidden;
`;

const Logo = styled.img`
  width: 80px;
`;

const Navmenu = styled.div`
  display: flex;
  flex: 1;
  margin-left: 25px;
  align-items: center;
  // justify-content: center;

  a {
    display: flex;

    align-items: center;
    padding: 0 12px;
    text-decoration: none;
    cursor: pointer;

    img {
      height: 20px;
    }

    span {
      font-size: 13px;
      letter-spacing: 1.42px;
      position: relative;

      &:after {
        content: "";
        height: 2px;
        background: white;
        position: absolute;

        left: 0;
        right: 0;
        bottom: -6px;
        opacity: 0;
        transform-origin: left center;
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        transform: scaleX(0);
      }
    }
    &:hover {
      span:after {
        transform: scaleX(1);
        opacity: 1;
      }
    }
  }
`;

const UserImg = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  cursor: pointer;
  margin-left: 20px;
`;

const Login = styled.div`
  border: 1px solid #f9f9f9;
  padding: 8px 16px;
  border-radius: 4px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transform;
  }
`;
const Logout = styled.div`
  border: 1px solid #f9f9f9;
  padding: 5px 10px;
  border-radius: 4px;
  margin-left: 20px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: all 0.2s ease 0s;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transform;
  }
`;

const LoginContainer = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
`;

const Header = () => {
  const history = useHistory();
  const userName = useSelector(SelectUserName);
  const userPhoto = useSelector(SelectUserPhoto);

  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );
        history.push("/");
      }
    });
  }, []);

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        let user = result.user;
        console.log(user);
        dispatch(
          setUserLogin({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
          })
        );

        history.push("/");
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        console.log(errorCode);
        alert(errorCode);

        var errorMessage = error.message;
        console.log(errorMessage);
        alert(errorMessage);
      });
  };

  const signOut = () => {
    auth.signOut().then(() => {
      dispatch(setSignOut());
      history.push("/login");
    });
  };

  return (
    <Nav>
      <Link to="/">
        <Logo src="/images/logo.svg" />
      </Link>
      {!userName ? (
        <LoginContainer>
          <Login onClick={signIn}>Login</Login>
        </LoginContainer>
      ) : (
        <>
          <Navmenu>
            <a href="">
              <img src="/images/home-icon.svg" alt="" />
              <span>HOME</span>
            </a>
            <a href="">
              <img src="/images/search-icon.svg" alt="" />
              <span>SEARCH</span>
            </a>
            <a href="">
              <img src="/images/watchlist-icon.svg" alt="" />
              <span>WATCHLIST</span>
            </a>
            <a href="">
              <img src="/images/original-icon.svg" alt="" />
              <span>ORIGINALS</span>
            </a>
            <a href="">
              <img src="/images/movie-icon.svg" alt="" />
              <span>MOVIES</span>
            </a>
            <a href="">
              <img src="/images/series-icon.svg" alt="" />
              <span>SERIES</span>
            </a>
          </Navmenu>
          <userProfileName>Hello {userName}</userProfileName>
          <Logout onClick={() => signOut()}>LOG OUT</Logout>
          <UserImg onClick={() => signOut()} src={userPhoto} />
        </>
      )}
    </Nav>
  );
};

export default Header;
