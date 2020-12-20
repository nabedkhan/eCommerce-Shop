import React, { useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../redux/actions/productsAction';
import Loader from './Loader';
import ProductCard from './ProductCard';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { loading, products } = useSelector(state => state.getProductList);
    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <section className="py-5">
            <Container>
                <Row>
                    {
                        loading ? <Loader /> : (
                            products.map(product => <ProductCard key={product._id} product={product} />)
                        )
                    }
                </Row>
            </Container>
        </section>
    );
};

export default HomeScreen;