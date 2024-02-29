import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import TweetCard from '../ui/TweetCard';
import AddTweetForm from '../ui/AddTweetForm';

export default function TweetsPage({ tweetsFromBackend, user }) {
  const [tweets, setTweets] = useState(tweetsFromBackend || []);
  const [data, setData] = useState(null);
  const handleSubmit = async (tweet) => {
    const res = await axios.post('/api/tweets', { body: tweet });
    if (res.status === 200) {
      setTweets([...tweets, res.data]);
    }
  };

  const handleDelete = async (id) => {
    const res = await axios.delete(`/api/tweets/${id}`);
    if (res.status === 200) {
      setTweets((prev) => prev.filter((tweet) => tweet.id !== id));
    }
  };
  return (
    <Row>
      <Col xs={12}>
        <AddTweetForm handleSubmit={handleSubmit} />
      </Col>
      {data}
      {tweets.map((tweet) => (
        <Col xs={12} key={tweet.id}>
          <TweetCard user={user} setData={setData} tweet={tweet} handleDelete={handleDelete} />
        </Col>
      ))}
    </Row>
  );
}
