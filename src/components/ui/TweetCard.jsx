import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Col, Image, Row } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function TweetCard({ tweet, handleDelete, user }) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prev) => {
        console.log(`id: ${tweet.id}\tcounter: ${prev}`);
        return prev + 1;
      });
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  // useEffect(() => {
  //   if (tweet.id !== 1) return;
  //   const controller = new AbortController();
  //   axios('/api/auth', { signal: controller.signal }).then(() => setData('DATA MUTATED')).catch(console.log);
  //   return () => controller.abort();
  // }, []);

  return (
    <Card className="m-2">
      <Card.Header>
        {counter}
        {' '}
        s
      </Card.Header>
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
            <Button variant="danger" disabled={user?.id !== tweet.authorId} onClick={() => handleDelete(tweet.id)}>Delete</Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
