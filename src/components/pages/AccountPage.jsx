import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import axios from 'axios';
import ProfilePicEdit from '../ui/ProfilePicEdit';
import Loader from '../HOC/Loader';

export default function AccountPage() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;
    axios('/api/auth', { signal })
      .then((res) => setUser(res.data))
      .catch(console.log);

    return () => controller.abort();
  }, []);
  console.log(user);
  return (
    <Row className="justify-content-center align-items-center">
      <Loader loading={!user}>
        <Col xs={4}>
          <ProfilePicEdit user={user} />
        </Col>
        <Col xs={8}>
          <Row>
            <Col xs={12}>
              <p>
                Name:
                {user?.name}
              </p>
            </Col>
            <Col xs={12}>
              <p>
                Email:
                {user?.email}
              </p>
            </Col>
            <Col xs={12}>
              <p>
                Total tweets:
                {user?.totalTweets}
              </p>
            </Col>
          </Row>
        </Col>
      </Loader>
    </Row>
  );
}
