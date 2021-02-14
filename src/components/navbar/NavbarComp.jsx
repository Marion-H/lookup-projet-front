import React, { useState, useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import Axios from 'axios';

import styles from './NavbarComp.module.css';
import logo from './LookUp.png';
import facebook from './facebook.png';
import linkedin from './In-Blue-34.png';
import apiUrl from '../../apiUrl';

const MyNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [productDataInfo, setProductDataInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const toggle = () => setIsOpen(!isOpen);

  const getDataProduct = async () => {
    try {
      const res = await Axios.get(`${apiUrl}/products_info`);
      setProductDataInfo(res.data);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  if (isLoading) {
    return <Spinner color="primary" />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Navbar fixed="top" className={styles.Nav} color="light" light expand="md">
      <Col lg="2" md="3">
        <Link to="/">
          <NavbarBrand href="/">
            <img className={styles.logo} src={logo} alt="logo" />
          </NavbarBrand>
        </Link>
      </Col>
      <Col lg="10" md="9">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Produits
              </DropdownToggle>
              <DropdownMenu right>
                {productDataInfo.map((product) => (
                  <>
                    <Link to={`/product/${product.ProductUuid}`}>
                      <DropdownItem>{product.title}</DropdownItem>
                    </Link>
                  </>
                ))}
              </DropdownMenu>
            </UncontrolledDropdown>
            <NavItem>
              <Link to="/services">
                <NavLink>Services</NavLink>
              </Link>
            </NavItem>
            <NavItem>
              <Link to="/about">
                <NavLink>A propos</NavLink>
              </Link>
            </NavItem>
          </Nav>
          <NavLink>
            <Link
              className={styles.contact}
              style={{ color: 'inherit' }}
              to="/contact"
            >
              Contact
            </Link>
          </NavLink>
          <NavLink href="https://www.facebook.com/LookUp.FR/" target="_blank">
            <img className={styles.facebook} src={facebook} alt="facebook" />
          </NavLink>
          <NavLink
            href="https://www.linkedin.com/company/lookup-fr/"
            target="_blank"
          >
            <img
              className={styles.linkedin}
              src={linkedin}
              alt="linkedin"
              width="30px"
            />
          </NavLink>
        </Collapse>
      </Col>
    </Navbar>
  );
};
export default MyNavbar;
