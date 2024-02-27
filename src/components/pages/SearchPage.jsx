import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import TweetCard from '../ui/TweetCard';

export default function SearchPage() {
  const [tweets, setTweets] = useState([]);
  const [searchedText, setSearchedText] = useState('');
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchedText.length > 0) {
        axios(`/api/tweets/search?text=${searchedText}`)
          .then((res) => setTweets(res.data));
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [searchedText]);
  return (
    <Row>
      <Col xs={12}>
        <h1>Search</h1>
      </Col>
      <Col xs={12}>
        <Form.Control
          value={searchedText}
          onChange={(e) => setSearchedText(e.target.value)}
          type="text"
          placeholder="Search"
        />
      </Col>
      {tweets.map((tweet) => (
        <Col xs={12} key={tweet.id}>
          <TweetCard tweet={tweet} />
        </Col>
      ))}
    </Row>
  );
}
