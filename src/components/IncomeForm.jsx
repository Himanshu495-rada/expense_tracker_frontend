// IncomeForm.js
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const IncomeForm = ({ onSubmit }) => {

    const token = localStorage.getItem("token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [incomeFormData, setIncomeFormData] = useState({
        amount: '',
        description: '',
        date: '',
        category: 'income'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setIncomeFormData({ ...incomeFormData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Make a POST request to your backend API
            const response = await fetch(`${backendUrl}/entries`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                },
                body: JSON.stringify(incomeFormData),
            });

            console.log(response);

            if (response.ok) {
                alert("Expense entry was successfull");
                setIncomeFormData({ amount: '', description: '', date: '', category: 'income' });
            } else {
                console.error('Error submitting expense:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting expense:', error.message);
        }
    };

    return (
        <Card className="p-3">
            <Card.Title>
                <h2>Add Income</h2>
            </Card.Title>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="incomeAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            value={incomeFormData.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="incomeDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={incomeFormData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="incomeDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={incomeFormData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="success" type="submit" className="mt-3" >
                        Add Income
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
};

export default IncomeForm;
