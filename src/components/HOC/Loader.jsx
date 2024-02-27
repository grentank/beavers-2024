import React from 'react';
import { Col, Spinner } from 'react-bootstrap';

export default function Loader({ loading, children }) {
  if (loading) {
    return (
      <Col xs={2}>
        <Spinner style={{ width: '200px', height: '200px' }} animation="border" />
      </Col>
    );
  }
  return children;
}
