import React, { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import BarChartComponent from '../../components/BarChartComponent';
import TransactionList from '../../components/TransactionList';
import NavigationBar from '../../components/NavigationBar';
import { Container, Row, Col, Dropdown, Card, Navbar, Nav } from 'react-bootstrap';

function Dashboard() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [authenticated, setAuthenticated] = useState(false);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [dashboardData, setDashboardData] = useState({ "totalIncome": 0, "totalExpense": 0, currentMonthExpenses: [], currentMonthIncome: [], currentMonthEntries: [], labels: [] });

  const barChartData = {
    labels: dashboardData.currentMonthEntries.map(item => {
      const date = new Date(item.date).getDate();
      const month = new Date(item.date).getMonth() + 1;
      return `${date}-${month}`
    }),
    datasets: [{
      label: 'Expense',
      data: dashboardData.currentMonthExpenses.map(item => item.amount),
      backgroundColor: 'red',
      borderWidth: 1
    },
    {
      label: 'Income',
      data: dashboardData.currentMonthIncome.map(item => item.amount),
      backgroundColor: '#42f545',
      borderWidth: 1
    }]
  }

  const barChartData2 = {
    labels: dashboardData.currentMonthExpenses.map(item => {
      const date = new Date(item.date).getDate();
      const month = new Date(item.date).getMonth() + 1;
      return `${date}-${month}`
    }),
    datasets: [{
      label: 'Expense',
      data: dashboardData.currentMonthExpenses.map(item => item.amount),
      backgroundColor: 'red',
      borderWidth: 1
    }]
  }
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{
      label: 'Expense',
      data: [],
      backgroundColor: 'red',
      borderWidth: 1
    },
    {
      label: 'Income',
      data: [],
      backgroundColor: '#42f545',
      borderWidth: 1
    }]
  });

  const handleDropdownSelect = (selectedOption) => {
    switch (selectedOption) {
      case 'expenseIncome':
        setChartData(barChartData);
        break;
      case 'expenseBreakdown':
        setChartData(barChartData2);
        break;
      default:
        setChartData(barChartData);
        break;
    }
  };

  const collectDashboardData = async () => {
    const response = await fetch(`${backendUrl}/dashboard/data`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data = await response.json();

    const expense = data.currentMonthExpenses;
    const income = data.currentMonthIncome;
    const labels_d = data.currentMonthEntries.map(item => {
      const date = new Date(item.date).getUTCDate();
      return date.toLocaleString();
    });
    console.log(labels_d);
    if (response.ok) {
      setDashboardData({
        totalIncome: data.currentMonthIncomeTotal,
        totalExpense: data.currentMonthExpenseTotal,
        currentMonthExpenses: expense,
        currentMonthIncome: income,
        currentMonthEntries: data.currentMonthEntries,
        labels: labels_d
      })
    } else {
      console.error('Error creating' + response);
    }

    const response2 = await fetch(`${backendUrl}/dashboard/recent-entries`, {
      method: "GET",
      headers: {
        Authorization: token,
      },
    });
    const data2 = await response2.json();
    if (response2.ok) {
      setRecentTransactions(data2);
    } else {
      console.error('Error creating' + response);
    }
  }

  useEffect(() => {
    if (!token) {
      navigate("/login");
      setAuthenticated(false);
    } else {
      if (authenticated) {
        collectDashboardData();
        console.log("Collect data");
      } else {
        fetch(`${backendUrl}/authenticate`, {
          method: "GET",
          headers: {
            Authorization: token,
          },
        })
          .then((response) => {
            if (response.ok) {
              setAuthenticated(true); // Token is valid
              collectDashboardData();
            } else {
              navigate("/");
              setAuthenticated(false); // Token is not valid
              localStorage.removeItem("token");
            }
          })
          .catch((error) => {
            console.error("Network error:", error);
            setAuthenticated(false);
            navigate("/error");
          });
      }
    }
  }, [token]);

  return (
    <>
      {/* Navigation Bar */}
      <NavigationBar />

      <Container>
        {/* Chart Component */}
        <Row className="mt-5">
          <Col md={8}>
            <Dropdown onSelect={handleDropdownSelect}>
              <Dropdown.Toggle variant="primary" id="chart-dropdown">
                Select Chart
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="expenseIncome">Expense & Income</Dropdown.Item>
                <Dropdown.Item eventKey="expenseBreakdown">Expense Breakdown</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {/* Display the BarChartComponent based on the selected option */}
            <BarChartComponent chartData={chartData} />
          </Col>
          <Col md={4}>
            <Card style={{ marginTop: "50px" }} >
              <Card.Body>
                <h5>Recent Transactions</h5>
                {recentTransactions.length == 0 ? <p>No data</p> : <TransactionList transactions={recentTransactions} />}
              </Card.Body>
            </Card>
            <Card className='mt-2' >
              <Card.Body>
                <h5>Current Month Expense</h5>
                <p>₹ {dashboardData.totalExpense}</p>
              </Card.Body>
            </Card>
            <Card className='mt-2' >
              <Card.Body>
                <h5>Current Month Income</h5>
                <p>₹ {dashboardData.totalIncome}</p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Recent Transactions, Current Month Expense, and Current Income */}
        <Row>

        </Row>
      </Container>
    </>

  )
}

export default Dashboard