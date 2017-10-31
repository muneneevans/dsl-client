import React, { Component } from 'react'
import { Button, Container, Menu, } from 'semantic-ui-react'
import { Link } from "react-router-dom"

const Header = () => (
    <Menu fixed='top' size='massive' color='blue' tertiary inverted width={5}>
        <Container>
            
            <Menu.Item as='a' href='/' link={true}  >Home</Menu.Item>
            <Menu.Item as='a' href='/#/facilities'>Facilities</Menu.Item>
            <Menu.Item as='a'>Commodities</Menu.Item>
            <Menu.Item as='a'>Human Resource</Menu.Item>            
        </Container>
    </Menu>
)

export default Header