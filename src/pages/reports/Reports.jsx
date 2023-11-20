import React, { useState, useEffect } from 'react'
import NavigationBar from '../../components/NavigationBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import { Button, Row, Col, Table, Dropdown, Container } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

function Reports() {

  const token = localStorage.getItem("token");
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [selectedMonth, setSelectedMonth] = useState('01');
  const [selectedYear, setSelectedYear] = useState('2023');
  const [reportData, setReportData] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`${backendUrl}/entries/${selectedYear}/${selectedMonth}`, {
      method: 'GET',
      headers: {
        'Authorization': token
      }
    });
    const data = await response.json();
    if (response.ok) {
      setReportData(data);
      console.log(data);
    } else {
      console.error(response);
    }

  };

  const handleDownload = () => {
    console.log('Downloading...');
    const unit = "pt";
    const size = "A4";
    const orientation = "portrait";
    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);
    doc.setFontSize(15);
    const title = "Expense & Income report";
    const headers = [["ID", "Description", "Amount", "Date"]];
    const data = reportData.map((entry) => {
      return [entry.id, entry.description, entry.amount, entry.date]
    });

    data.push([null, 'Total Income', reportData.reduce((total, item) => {
      if (item.category == "income") {
        return total + item.amount;
      }
      return total;
    }, 0), null]);
    data.push([null, 'Total Expenses', reportData.reduce((total, item) => {
      if (item.category == "expense") {
        return total + item.amount;
      }
      return total;
    }, 0), null]);

    let content = {
      startY: 50,
      head: headers,
      body: data
    };
    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };

  return (
    <>
      <NavigationBar />

      <Container >
        <Row >
          <Col style={{ display: 'flex', flexDirection: 'row', marginTop: '20px', marginBottom: '20px', justifyContent: 'flex-end' }} >
            <Dropdown className="mr-2" >
              <Dropdown.Toggle variant="primary" id="dropdown-month">
                Month: {selectedMonth}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedMonth('01')}>January</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('02')}>February</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('03')}>March</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('04')}>April</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('05')}>May</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('06')}>June</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('07')}>July</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('08')}>August</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('09')}>September</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('10')}>October</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('11')}>November</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedMonth('12')}>December</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Dropdown className="mr-2" style={{ marginLeft: '10px' }}>
              <Dropdown.Toggle variant="primary" id="dropdown-year">
                Year: {selectedYear}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setSelectedYear('2023')}>2023</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedYear('2022')}>2022</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedYear('2021')}>2021</Dropdown.Item>
                <Dropdown.Item onClick={() => setSelectedYear('2020')}>2020</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Button variant="primary" onClick={handleSearch} style={{ marginLeft: '10px' }} >
              Search
            </Button>

            <Button onClick={handleDownload} style={{ marginLeft: '10px' }} >
              <FontAwesomeIcon icon={faDownload} size="1x" />
            </Button>
          </Col>
        </Row>

        <Row>
          <Col>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Type</th>
                  <th>Date</th>
                  {/* Add more table headers based on your data */}
                </tr>
              </thead>
              <tbody>
                {reportData.map((entry) => (
                  <tr key={entry.id}>
                    <td>{entry.id}</td>
                    <td>{entry.description}</td>
                    <td>{entry.amount}</td>
                    <td>{entry.category}</td>
                    <td>{new Date(entry.date).toLocaleDateString()}</td>
                    {/* Add more table cells based on your data */}
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

export default Reports