import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// Datos de productos
const products = [
  { id: 1, name: 'Hueso para Perro', detail: 'Para perros grandes', size: 'L', type: 'Dog', price: '$15', image: 'https://via.placeholder.com/150' },
  { id: 2, name: 'Rascador para Gato', detail: 'Ideal para gatos pequeños', size: 'M', type: 'Cat', price: '$20', image: 'https://via.placeholder.com/150' },
  { id: 3, name: 'Jaula para Pájaro', detail: 'Con perchas y comedero', size: 'S', type: 'Bird', price: '$30', image: 'https://via.placeholder.com/150' },
  { id: 4, name: 'Rueda para Roedor', detail: 'Rueda silenciosa', size: 'S', type: 'Rodent', price: '$10', image: 'https://via.placeholder.com/150' },
  { id: 5, name: 'Camita para Mascotas', detail: 'Comodidad para todos', size: 'L', type: 'Other', price: '$25', image: 'https://via.placeholder.com/150' },
];

const ProductFilters = ({ onFilterChange, onSearchChange }) => {
  return (
    <Row className="mb-3 align-items-center">
      <Col xs={12} md={6}>
        <h3>Listado de Productos</h3>
      </Col>
      <Col xs={12} md={6} className="text-md-right">
        <Row className="align-items-center">
          <Col xs={12} md={6} className="mb-2 mb-md-0">
            <Form.Group controlId="searchFilter" className="mb-0">
              <Form.Control type="text" placeholder="Buscar producto" onChange={e => onSearchChange(e.target.value)} />
            </Form.Group>
          </Col>
          <Col xs={12} md={6} className="d-flex align-items-center">
            <div className="mr-3">Filtrar por:</div>
            <Form.Group controlId="productFilter" className="mb-0">
              <Form.Control as="select" onChange={e => onFilterChange(e.target.value)} style={{ width: '200px' }}>
                <option value="">Todos</option>
                <option value="Dog">Perros</option>
                <option value="Cat">Gatos</option>
                <option value="Bird">Pájaros</option>
                <option value="Rodent">Roedores</option>
                <option value="Other">Otros</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

const ListadoProductos = () => {
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');

  const handleFilterChange = (selectedType) => {
    setFilter(selectedType);
  };

  const handleSearchChange = (searchTerm) => {
    setSearch(searchTerm);
  };

  const filteredProducts = products.filter(product => 
    (filter === '' || product.type === filter) &&
    (product.name.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <Container fluid style={{ padding: '2rem' }}>
      {/* Contenedor Superior con el Título y Filtro */}
      <div className="mb-4" style={{ backgroundColor: '#f8f9fa', padding: '1rem', borderRadius: '8px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <ProductFilters onFilterChange={handleFilterChange} onSearchChange={handleSearchChange} />
      </div>

      {/* Contenedor Inferior con los Productos */}
      <Row>
        {filteredProducts.map(product => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card className="h-100 text-center">
              <Card.Img variant="top" src={product.image} style={{ height: '150px', objectFit: 'cover' }} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">Detalle: {product.detail}</Card.Subtitle>
                {product.size && <Card.Subtitle className="mb-2 text-muted">Tamaño: {product.size}</Card.Subtitle>}
                <Card.Subtitle className="mb-2 text-muted">Para: {product.type}</Card.Subtitle>
                <Card.Text>{product.price}</Card.Text>
                <div className="d-flex justify-content-evenly">
                  <Button variant="primary" className="mr-2">Agregar al carrito</Button>
                  <Button variant="secondary">Ver detalle</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ListadoProductos;
