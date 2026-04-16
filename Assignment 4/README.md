# Hospital Emergency Monitoring Dashboard

## Overview
This project is a front-end dashboard designed to visualize and monitor emergency department activity across multiple hospitals. It provides real-time-like insights into patient flow, wait times, department load, and bed occupancy using interactive charts and controls.

## Objective
The purpose of this project is to simulate a real-time hospital monitoring system that helps in analyzing operational pressure and resource utilization in emergency departments.

## Technologies Used
- HTML5 for structuring the dashboard layout
- CSS3 for styling and responsive design
- JavaScript for data handling and interactivity
- Chart.js for data visualization

## Features

### Interactive Dashboard
- Displays key performance metrics such as patient count, average wait time, and admission rate
- Visual representation using charts for better understanding

### Dynamic Filtering
- Filter data by hospital
- Adjust time range using a slider
- Select specific departments to analyze

### Data Visualization
- Line chart for arrivals vs admissions
- Doughnut chart for severity distribution
- Bar charts for wait time and occupancy
- Real-time updates on charts when filters change

### Live Simulation
- “Simulate Live Refresh” button updates data dynamically
- Mimics real-time fluctuations in hospital conditions

### Alert System
- Highlights the most critical department based on calculated pressure
- Provides actionable insight based on current data

### Priority Feed
- Displays top high-risk departments
- Ranked based on operational pressure score

## Project Structure
```
Hospital-Dashboard/
│
├── index.html       # Main dashboard UI
├── style.css        # Styling and layout
├── script.js        # Data logic and interactivity
```

## How It Works
1. Predefined hospital data is stored in JavaScript
2. User inputs (filters, range, departments) modify the displayed data
3. Data is aggregated dynamically based on selected options
4. Charts are updated in real-time using Chart.js
5. A scoring system identifies high-pressure departments

## Key Concepts Implemented
- DOM manipulation
- Event handling
- Data aggregation and transformation
- Interactive UI design
- Chart-based data visualization

## Learning Outcomes
This project demonstrates:
- Building interactive dashboards using JavaScript
- Working with charting libraries like Chart.js
- Managing application state in frontend development
- Designing responsive and user-friendly interfaces

## Future Enhancements
- Integration with real-time APIs
- Backend support with database connectivity
- User authentication system
- Advanced analytics and predictive insights

## Author
Anuj Ahire
