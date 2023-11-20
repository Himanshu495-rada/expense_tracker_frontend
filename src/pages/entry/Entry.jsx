import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/NavigationBar'
import ExpenseForm from '../../components/ExpenseForm';
import IncomeForm from '../../components/IncomeForm';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

function Entry() {

    const token = localStorage.getItem("token");
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [expenseFormData, setExpenseFormData] = useState({
        amount: '',
        description: '',
        date: '',
    });

    const [incomeFormData, setIncomeFormData] = useState({
        amount: '',
        description: '',
        date: '',
    });

    const [entries, setEntries] = useState([
    ]);

    const handleExpenseFormSubmit = (event) => {
        event.preventDefault();
        // Add your logic to handle expense form submission
        console.log('Expense Form Data:', expenseFormData);
        // Update the entries state with the new expense entry
        setEntries([
            ...entries,
            { id: entries.length + 1, ...expenseFormData, type: 'expense' },
        ]);
        // Clear the form data
        setExpenseFormData({ amount: '', description: '', date: '' });
    };

    const handleIncomeFormSubmit = (event) => {
        event.preventDefault();
        // Add your logic to handle income form submission
        console.log('Income Form Data:', incomeFormData);
        // Update the entries state with the new income entry
        setEntries([
            ...entries,
            { id: entries.length + 1, ...incomeFormData, type: 'income' },
        ]);
        // Clear the form data
        setIncomeFormData({ amount: '', description: '', date: '' });
    };

    const handleRemoveEntry = async (entryId) => {
        //send delete request to '/entries/id'
        const response = await fetch(`${backendUrl}/entries/${entryId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            }
        })
        if (response.ok) {
            alert("Entry deleted successfully");
        } else {
            console.error("Error deleting" + response.message);
        }
    };

    const collectData = async () => {
        const response = await fetch(`${backendUrl}/entries`, {
            method: "GET",
            headers: {
                Authorization: token,
            },
        });
        const data = await response.json();
        if (response.ok) {
            setEntries(data);
        } else {
            console.error('Error creating' + response);
        }
    }

    useEffect(() => {
        collectData();
    }, [entries])

    return (
        <>
            <NavigationBar />
            <Container>
                <Row className="mb-4 mt-4">
                    <Col >
                        <ExpenseForm />
                    </Col>
                    <Col >
                        <IncomeForm />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2>Recent Entries</h2>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Description</th>
                                    <th>Date</th>
                                    <th>Amount</th>
                                    <th>Type</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {entries.length == 0 ?
                                    <h2>No Data</h2> :
                                    entries.map((entry) => (
                                        <tr key={entry.id} style={{ backgroundColor: entry.type === 'expense' ? 'red' : 'green', color: 'white' }}>
                                            <td>{entry.id}</td>
                                            <td>{entry.description}</td>
                                            <td>{entry.date}</td>
                                            <td>₹ {entry.amount}</td>
                                            <td>{entry.category}</td>
                                            <td>
                                                <Button variant="danger" onClick={() => handleRemoveEntry(entry.id)}>
                                                    Remove
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Entry