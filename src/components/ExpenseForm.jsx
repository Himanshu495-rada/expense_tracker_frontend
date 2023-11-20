// ExpenseForm.js
import React, { useState } from 'react';
import { Form, Button, Card } from 'react-bootstrap';

const ExpenseForm = () => {

    const token = localStorage.getItem("token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [expenseFormData, setExpenseFormData] = useState({
        amount: '',
        description: '',
        date: '',
        category: 'expense'
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setExpenseFormData({ ...expenseFormData, [name]: value });
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
                body: JSON.stringify(expenseFormData),
            });

            console.log(response);

            if (response.ok) {
                alert("Expense entry was successfull");
                setExpenseFormData({ amount: '', description: '', date: '', category: 'expense' });
            } else {
                console.error('Error submitting expense:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting expense:', error.message);
        }
    };

    return (
        <Card className='p-3' >
            <Card.Title>
                <h2>Add Expense</h2>
            </Card.Title>
            <Card.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="expenseAmount">
                        <Form.Label>Amount</Form.Label>
                        <Form.Control
                            type="number"
                            name="amount"
                            value={expenseFormData.amount}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="expenseDescription">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                            type="text"
                            name="description"
                            value={expenseFormData.description}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="expenseDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control
                            type="date"
                            name="date"
                            value={expenseFormData.date}
                            onChange={handleInputChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="danger" type="submit" className="mt-3" >
                        Add Expense
                    </Button>
                </Form>
            </Card.Body>
        </Card>

    );
};

export default ExpenseForm;
