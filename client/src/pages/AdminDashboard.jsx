import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { api } from '../utils/api';

const AdminDashboard = () => {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    setLoading(true);
    try {
      const res = await api.admin.getDashboard();
      setMetrics(res.data.data);
    } catch (err) {
      setError('Failed to fetch dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;
  if (!metrics) return null;

  return (
    <Container className="py-4">
      <h2 className="mb-4">📊 Admin Dashboard</h2>
      <Row className="mb-4">
        <Col md={3}><Card body><h5>Total Users</h5><h2>{metrics.users.total}</h2></Card></Col>
        <Col md={3}><Card body><h5>Owners</h5><h2>{metrics.users.owners}</h2></Card></Col>
        <Col md={3}><Card body><h5>Renters</h5><h2>{metrics.users.renters}</h2></Card></Col>
        <Col md={3}><Card body><h5>Suspended</h5><h2>{metrics.users.suspended}</h2></Card></Col>
      </Row>
      <Row className="mb-4">
        <Col md={3}><Card body><h5>Total Properties</h5><h2>{metrics.properties.total}</h2></Card></Col>
        <Col md={3}><Card body><h5>Verified</h5><h2>{metrics.properties.verified}</h2></Card></Col>
        <Col md={3}><Card body><h5>Pending</h5><h2>{metrics.properties.pending}</h2></Card></Col>
        <Col md={3}><Card body><h5>Rejected</h5><h2>{metrics.properties.rejected}</h2></Card></Col>
      </Row>
      <Row className="mb-4">
        {metrics.properties.byCategory.map(cat => (
          <Col md={2} key={cat._id}><Card body><h6>{cat._id}</h6><h4>{cat.count}</h4></Card></Col>
        ))}
      </Row>
      <Row className="mb-4">
        <Col md={3}><Card body><h5>Total Bookings</h5><h2>{metrics.bookings.total}</h2></Card></Col>
        <Col md={3}><Card body><h5>Ongoing</h5><h2>{metrics.bookings.ongoing}</h2></Card></Col>
        <Col md={3}><Card body><h5>Completed</h5><h2>{metrics.bookings.completed}</h2></Card></Col>
        <Col md={3}><Card body><h5>Canceled</h5><h2>{metrics.bookings.canceled}</h2></Card></Col>
      </Row>
      <h4 className="mt-4">Recent Activity</h4>
      <Row>
        <Col md={4}><Card body><h6>Recently Added Properties</h6><ul>{metrics.recent.properties.map(p => <li key={p._id}>{p.title}</li>)}</ul></Card></Col>
        <Col md={4}><Card body><h6>Recently Registered Users</h6><ul>{metrics.recent.users.map(u => <li key={u._id}>{u.name} ({u.email})</li>)}</ul></Card></Col>
        <Col md={4}><Card body><h6>Recently Completed Bookings</h6><ul>{metrics.recent.bookings.map(b => <li key={b._id}>Booking #{b._id}</li>)}</ul></Card></Col>
      </Row>
    </Container>
  );
};

export default AdminDashboard;
