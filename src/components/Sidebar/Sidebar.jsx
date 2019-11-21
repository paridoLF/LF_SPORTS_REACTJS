/*!

=========================================================
* LF SPORTS v1.0.0
=========================================================

*/
/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
// nodejs library to set properties for components
import { PropTypes } from "prop-types";

// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

// reactstrap components
import {
  Nav,
  UncontrolledCollapse
} from "reactstrap";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  linkOnClick = () => {
    document.documentElement.classList.remove("nav-open");
  };

  asignSport = (id) => {
    this.props.getSportSelected(id);
  };
  asignCountry = (id) => {
    this.props.getCountrySelected(id);
  };  
  asignLeague = (id) => {
    this.props.getLeagueSelected(id);
    console.log(id);
  };    
  render() {
    const { bgColor, routes, sports, countries, leagues, rtlActive, logo } = this.props;
    let logoImg = null;
    let logoText = null;
    if (logo !== undefined) {
      if (logo.outterLink !== undefined) {
        logoImg = (
          <a
            href={logo.outterLink}
            className="simple-text logo-mini"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </a>
        );
        logoText = (
          <a
            href={logo.outterLink}
            className="simple-text logo-normal"
            target="_blank"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </a>
        );
      } else {
        logoImg = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-mini"
            onClick={this.props.toggleSidebar}
          >
            <div className="logo-img">
              <img src={logo.imgSrc} alt="react-logo" />
            </div>
          </Link>
        );
        logoText = (
          <Link
            to={logo.innerLink}
            className="simple-text logo-normal"
            onClick={this.props.toggleSidebar}
          >
            {logo.text}
          </Link>
        );
      }
    }
    return (
      <div className="sidebar" data={bgColor}>
        <div className="sidebar-wrapper" ref="sidebar">
          {logoImg !== null || logoText !== null ? (
            <div className="logo">
              {logoImg}
              {logoText}
            </div>
          ) : null}
          <Nav>
            {routes.map((prop, key) => {
              if (prop.redirect) return null;
              return (
                <li
                  className={
                    this.activeRoute(prop.path) +
                    (prop.pro ? " active-pro" : "")
                  }
                  key={key}
                >
                  <NavLink
                    to={prop.layout + prop.path}
                    className="nav-link"
                    activeClassName="active"
                    onClick={this.props.toggleSidebar}
                  >
                    <i className={prop.icon} />
                    <p>{rtlActive ? prop.rtlName : prop.name}</p>
                  </NavLink>
                </li>
              );
            })}
             <div className="logo"></div>
          </Nav>
          <div>
             {sports.map((sport) => {             
              return (
                <React.Fragment>
                    <li id={sport.id} onClick={() => this.asignSport(sport.id)} className="nav-link">
                      <ul><p>{sport.name}</p></ul>
                    </li>
                    <UncontrolledCollapse toggler={"#"+sport.id}>
                       {countries.filter(cty => cty.fkid === sport.id).map((country)=>{
                          return (
                            <React.Fragment>
                              <li id={country.id} onClick={() => this.asignCountry(country.id)} className="nav-link">
                                <ul><p> <i className={country.icon} />{" "}{country.name}</p></ul>
                              </li>
                              <UncontrolledCollapse toggler={"#"+country.id}>
                                { leagues.filter(lg => lg.sid === sport.id && lg.cid === country.id).map((league) => {
                                   return (
                                    <React.Fragment>
                                        <li id={league.id} onClick={() => this.asignLeague(league.id)} className="nav-link">
                                          <ul><p className="nav-link-bold"> <i className={league.icon} />{" "}{league.name}</p>
                                          </ul>
                                        </li>
                                    </React.Fragment>
                                   );
                                 })
                                }
                              </UncontrolledCollapse>
                            </React.Fragment>
                          );
                       })}
                    </UncontrolledCollapse>
                </React.Fragment>
              );
            })
          }            
          </div>
        </div>
      </div>
    );
  }
}

Sidebar.defaultProps = {
  rtlActive: false,
  bgColor: "primary",
  routes: [{}],
  sports: [{}],
  countries: [{}],
  leagues: [{}]
};

Sidebar.propTypes = {
  // if true, then instead of the routes[i].name, routes[i].rtlName will be rendered
  // insde the links of this component
  rtlActive: PropTypes.bool,
  bgColor: PropTypes.oneOf(["primary", "blue", "green"]),
  routes: PropTypes.arrayOf(PropTypes.object),
  sports: PropTypes.arrayOf(PropTypes.object),
  countries: PropTypes.arrayOf(PropTypes.object),
  leagues: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    // innerLink is for links that will direct the user within the app
    // it will be rendered as <Link to="...">...</Link> tag
    innerLink: PropTypes.string,
    // outterLink is for links that will direct the user outside the app
    // it will be rendered as simple <a href="...">...</a> tag
    outterLink: PropTypes.string,
    // the text of the logo
    text: PropTypes.node,
    // the image src of the logo
    imgSrc: PropTypes.string
  })
};

export default Sidebar;
