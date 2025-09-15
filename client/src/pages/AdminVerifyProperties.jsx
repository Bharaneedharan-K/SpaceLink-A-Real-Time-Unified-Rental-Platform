import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert, Modal, Form } from 'react-bootstrap';
import { api } from '../utils/api';

const AdminVerifyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [verifyStatus, setVerifyStatus] = useState('verified');
  const [verifyNote, setVerifyNote] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPending();
  }, []);

  const fetchPending = async () => {
    setLoading(true);
    try {
      const res = await api.admin.getPendingProperties();
      setProperties(res.data.data);
    } catch (err) {
      setError('Failed to fetch pending properties');
    } finally {
      setLoading(false);
    }
  };

  const openModal = (property) => {
    setSelected(property);
    setShowModal(true);
    setVerifyStatus('verified');
    setVerifyNote('');
  };

  const handleVerify = async () => {
    if (!selected) return;
    setSubmitting(true);
    try {
      await api.admin.verifyProperty(selected._id, verifyStatus, verifyNote);
      setShowModal(false);
      fetchPending();
    } catch {
      alert('Failed to update property status');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <Spinner animation="border" className="d-block mx-auto my-5" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      <h2 className="mb-4">Property Verification</h2>
      <Row>
        {properties.map(p => (
          <Col md={6} key={p._id} className="mb-4">
            <Card>
              <Card.Body>
                <h5>{p.title}</h5>
                <p><strong>Owner:</strong> {p.ownerId?.name} ({p.ownerId?.email})</p>
                <p><strong>Category:</strong> {p.category}</p>
                <p><strong>Address:</strong> {p.address.street}, {p.address.city}, {p.address.state} - {p.address.pincode}</p>
                <Button variant="info" onClick={() => openModal(p)}>Review & Verify</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Verify Property</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <h5>{selected.title}</h5>
              <p><strong>Description:</strong> {selected.description}</p>
              <p><strong>Owner:</strong> {selected.ownerId?.name} ({selected.ownerId?.email})</p>
              <p><strong>Contact:</strong> {selected.contact}</p>
              <p><strong>Proof Documents:</strong></p>
              <Row>
                <Col md={6}>
                  <strong>Owner Proof:</strong><br />
                  {selected.ownerProof && selected.ownerProof.startsWith('data:application/pdf') ? (
                    <a href={selected.ownerProof} target="_blank" rel="noopener noreferrer">View PDF</a>
                  ) : selected.ownerProof ? (
                    <img src={selected.ownerProof} alt="Owner Proof" style={{ maxWidth: '100%', maxHeight: '180px', border: '1px solid #ccc', borderRadius: '6px' }} />
                  ) : 'Not uploaded'}
                </Col>
                <Col md={6}>
                  <strong>Property Proof:</strong><br />
                  {selected.propertyProof && selected.propertyProof.startsWith('data:application/pdf') ? (
                    <a href={selected.propertyProof} target="_blank" rel="noopener noreferrer">View PDF</a>
                  ) : selected.propertyProof ? (
                    <img src={selected.propertyProof} alt="Property Proof" style={{ maxWidth: '100%', maxHeight: '180px', border: '1px solid #ccc', borderRadius: '6px' }} />
                  ) : 'Not uploaded'}
                </Col>
              </Row>
              <Form className="mt-4">
                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select value={verifyStatus} onChange={e => setVerifyStatus(e.target.value)}>
                    <option value="verified">Verified ✅</option>
                    <option value="rejected">Rejected ❌</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Note (optional)</Form.Label>
                  <Form.Control as="textarea" rows={2} value={verifyNote} onChange={e => setVerifyNote(e.target.value)} />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
          <Button variant="primary" onClick={handleVerify} disabled={submitting}>{submitting ? 'Saving...' : 'Save'}</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminVerifyProperties;
