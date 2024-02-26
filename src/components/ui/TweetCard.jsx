import React from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function TweetCard({ tweet }) {
  return (
    <Card className="m-2">
      <Card.Header>Featured</Card.Header>
      <Card.Body>
        <Row>
          <Col xs={2} className="d-flex justify-content-center align-items-start">
            <Image src="/images/no-profile-pic.jpg" alt="profile" style={{ borderRadius: '50%', width: '40%' }} />
          </Col>
          <Col xs={10}>
            <Card.Title>{tweet?.User?.name || 'DELETED'}</Card.Title>
            <Card.Text>
              {tweet.body}
            </Card.Text>
            <Button variant="primary">Go somewhere</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
