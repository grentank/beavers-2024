import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';

export default function IndexPage({ inDocker }) {
  return (
    <Row>
      <Col xs={12}>
        <h1>
          In docker:
          {inDocker ? 'true' : 'false'}
        </h1>
      </Col>
      <Col xs={12}>
        <Image src="/images/start-logo.jpg" style={{ width: '100%' }} />
      </Col>
    </Row>
  );
}
