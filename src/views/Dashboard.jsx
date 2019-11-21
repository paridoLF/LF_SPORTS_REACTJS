/*!

=========================================================
* LF SPORTS v1.0.0
=========================================================

*/
import React from "react";
// nodejs library that concatenates classes

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  UncontrolledCollapse,
  Input,
  Row,
  Col,
  CardText,
  CardFooter,
} from "reactstrap";


import matches from "_data/matches.js";
import match_details from "_data/match_details.js";


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      props
    };
    this.matches = matches;
    this.match_details = match_details;
  }
  componentWillReceiveProps({someProp}) {
    this.sportSelected = localStorage.getItem('sportSelected');
    this.countrySelected = localStorage.getItem('countrySelected');
    this.leagueSelected = localStorage.getItem('leagueSelected');
  }
  setBgChartData = name => {
    this.setState({
      bigChartData: name
    });
  };
  render() {
    return (
      <>
        <div className="content">
          <Row>
            <Col lg="9" md="12">
              <Card className="card-tasks">
                <CardHeader>
                    <h6 className="title d-inline">Games(s)</h6>
                    <p className="card-category d-inline"> updated at today</p>
                    <Row>
                       <Col lg="4" md="12">
                         Match
                       </Col>
                       <Col lg="2" md="12">
                         Spread
                       </Col>
                       <Col lg="2" md="12">
                         Money Line
                       </Col>  
                       <Col lg="2" md="12">
                         Total
                       </Col>
                       <Col lg="2" md="12">
                         Team Total
                       </Col>                                                                                               
                    </Row>
                </CardHeader>
                <CardBody>
                  <div className="table-full-width table-responsive">
                  {
                    matches.filter(mt => mt.sid === this.sportSelected && mt.cid === this.countrySelected && mt.lid === this.leagueSelected).map((match,index)=>{
                    return (
                       <React.Fragment>
                        <Row id={"match_tr"+index} style={{  height: '40px' }}>
                            <Col lg="2" md="12">
                               {match.date}
                            </Col>
                            <Col lg="3" md="12">
                                {match.team1} {"  "}
                                - vrs - {"  "}
                                {match.team2}                              
                            </Col>
                            <Col lg="2" md="12">
                                {match.spread}
                            </Col>
                            <Col lg="2" md="12">
                                {match.moneyline}                              
                            </Col>
                            <Col lg="1" md="12">
                                {match.total}                              
                            </Col>
                            <Col lg="2" md="12">
                              {match.teamtotal}
                            </Col>   
                        </Row>
                        <UncontrolledCollapse toggler={"#match_tr"+ index}>
                        {
                        match_details.filter(md => md.fkid === match.id).map((match_detail,index)=>{
                          return (
                            <React.Fragment>
                              <Row id={"match_tr"+index} style={{  height: '50px' }}>
                                <Col lg="2" md="12">
                                  {match_detail.lapso}
                                </Col>
                                <Col lg="3" md="12">
                                    {match.team1} {"  "}
                                    - vrs - {"  "}
                                    {match.team2}                              
                                </Col>
                                <Col lg="2" md="12">
                                    {match_detail.spread}
                                </Col>
                                <Col lg="2" md="12">
                                    {match_detail.moneyline}                              
                                </Col>
                                <Col lg="1" md="12">
                                    {match_detail.total}                              
                                </Col>
                                <Col lg="2" md="12">
                                  {match_detail.teamtotal}
                                </Col>   
                              </Row>
                            </React.Fragment>
                          );
                          })
                        }  

                        </UncontrolledCollapse>  
                      </React.Fragment>
                      );
                    })
                  }
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="12">
            <Card className="card-user">
                <CardBody>
                  <CardText />
                  <div className="author">
                    <div className="block block-one" />
                    <div className="block block-two" />
                    <div className="block block-three" />
                    <div className="block block-four" />
                    <a href="#luis" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        src={require("assets/img/vegas.jpg")}
                      />
                      <h5 className="title">Now In Play</h5>
                    </a>
                    <p className="description">Casino Las vegas Nevada</p>
                  </div>
                  <div className="card-description">
                    <form>
                       <Row>
                          <Input
                            defaultValue=""
                            placeholder="BETSLIP"
                            type="text"
                          />
                       </Row>
                    </form>
                    <div className="button-container">
                      <Button className="btn-fill" color="secondary" type="submit">
                         YOUR BETSLIP IS EMPTY
                      </Button>
                    </div>
                  </div>
                </CardBody>
                <CardFooter>
                  <div className="button-container">
                    <Button className="btn-icon btn-round" color="facebook">
                      <i className="fab fa-facebook" />
                    </Button>
                    <Button className="btn-icon btn-round" color="twitter">
                      <i className="fab fa-twitter" />
                    </Button>
                    <Button className="btn-icon btn-round" color="google">
                      <i className="fab fa-google-plus" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default Dashboard;
