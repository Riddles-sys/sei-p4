import { Col, Row, Card, Container } from 'react-bootstrap'
import githubImg from '../../images/github.png'
import linkedInImg from '../../images/linkedIn.png'
import about from '../../images/smaug.png'

const About = () => {
  return (
    <>
      <h1 className="text-center m-4">Meet The Developer</h1>
      <Container className=" about-container min-vh-100">
        <Row className='about-row'>
          <Col className="col-lg-4">
            <Card className="card p-0">
              <Card.Img className="card-image" src={about}
                alt=""></Card.Img>
              <Card.Body className="card-content d-flex flex-column align-items-center">
                <h4 className="pt-2">Ridwan Arshad</h4>
                <p className="font-weight-normal mb-0">Software Engineer</p>
                <div className="profile-link">
                  <a target='_blank' rel="noreferrer" href='https://github.com/Riddles-sys'><img className=" github align-items-center" src={githubImg} alt="github"/></a>
                  <a target='_blank' rel="noreferrer" href='https://www.linkedin.com/in/ridwan-arshad-mbpss-a99ba350/'><img className="github align-items-center" src={linkedInImg} alt="linkedIn"/></a>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}


export default About