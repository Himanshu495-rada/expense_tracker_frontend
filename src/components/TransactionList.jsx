// TransactionList.jsx

import React from 'react';
import { ListGroup } from 'react-bootstrap';

const TransactionList = ({ transactions }) => {
    return (
        <ListGroup>
            {transactions.map((transaction) => (
                <ListGroup.Item key={transaction.id}>
                    <span>
                        ₹ {Math.abs(transaction.amount).toFixed(2)}
                    </span>
                    <span> {transaction.date}</span>
                </ListGroup.Item>
            ))}
        </ListGroup>
    );
};

export default TransactionList;
