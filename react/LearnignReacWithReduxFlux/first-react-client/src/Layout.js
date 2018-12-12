import React from 'react';
import { App,AppHeader,AppLink,AppLogo } from './styles';
import logo from './logo.svg';

const pagraphStyles = { backgroundColor:"orange" };

export default function Layout({title,renderContent}){
    return(
        <App>
          <AppHeader>
            <AppLogo src={logo} alt="logo" />
            <p>
              {title}
            </p>
            {renderContent()}
          </AppHeader>
        </App>
    );
}