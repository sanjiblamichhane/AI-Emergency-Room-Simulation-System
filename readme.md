# 🏥 Meridian ER Operations: From Bottleneck to Breakthrough

> 🥈 **Datathon Champion: Second Prize Winner!**  
> This project was developed for the East Texas A&M University Datathon, where it proudly secured the second prize for its innovative approach to solving real-world operational challenges in healthcare.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

This project is a full-stack web application designed to help **Meridian City Hospital's ER** move from reactive problem-solving to proactive, data-driven operational planning. By analyzing historical patient flow and staffing data, we've built a suite of predictive tools and an interactive dashboard that empowers hospital administrators to reduce wait times, optimize staffing, and improve patient satisfaction.

The cornerstone of this solution is a powerful **"What-If" Simulation Planner**, allowing management to model different scenarios and receive data-backed staffing recommendations to meet their operational targets.

🔴👉 **[Watch the 60-Second Demo Video](https://youtu.be/e9l7RqBmxt0?si=mXqvWKdfrLh4fb_x)**

---

## 📸 Screenshots

The core of the application is the **Simulation & Planning** tool, which allows administrators to model scenarios and get instant, data-driven staffing recommendations.

<img width="1465" alt="Simulation Planner Screenshot" src="https://github.com/user-attachments/assets/09c6a118-c0cf-4e47-a8f2-f376aa5ec20d" />

## ✨ Key Features

-   **🤖 Predictive Triage Assistant:** A machine learning model that suggests a patient's triage level upon arrival, speeding up the initial assessment process.
-   **📈 Patient Volume Forecasting:** A time-series model that predicts patient arrival volumes for the next 24 hours, helping to anticipate demand.
-   **⏱️ Live Wait Time Prediction:** A regression model that estimates patient wait times based on the current day, shift, triage level, and staffing.
-   **🔬 "What-If" Simulation Planner:** An interactive tool for administrators to:
    -   Simulate various patient loads, available beds, and staffing levels (doctors & nurses).
    -   Set a target wait time (e.g., the national benchmark).
    -   Receive an instant, actionable recommendation on the optimal number of staff needed to meet their goal.
-   **📊 Analytics Dashboard:** Visualizes key performance indicators (KPIs) and performance against national benchmarks.
-   **🎟️ Live Operations Queue:** A real-time view of the patient queue, allowing staff to manage patient flow effectively.

---

## 📊 Key Findings & Insights

Our analysis of the ER data, initially prepared and cleaned using **Alteryx**, uncovered several critical bottlenecks that directly informed the design of this solution.

1.  ** Staffing is Misaligned with Peak Wait Times, Not Peak Volume**
    Our analysis revealed that the longest wait times do not occur during peak patient arrival in the morning. Instead, they spike dramatically during the **Day-to-Evening shift change (around 3 PM)**.
    *   **Solution:** This finding directly inspired the **"What-If" Simulation Planner**, which allows administrators to model and optimize staffing levels for these crucial periods.

2.  ** Lower-Acuity Patients Bear the Brunt of Inefficiencies**
    While the most critical patients are seen relatively quickly, those with `Urgent` and `Semi-Urgent` conditions face disproportionately long waits, suggesting a bottleneck in the main ER flow.
    *   **Solution:** This validated the need for a **Predictive Triage Assistant** to speed up initial classification and route patients more efficiently.

3.  ** Process is a Bigger Problem Than Headcount**
    The data showed a surprisingly weak correlation between the raw patient-to-staff ratio and wait times. This counter-intuitive finding indicates that simply hiring more people is not a silver bullet.
    *   **Solution:** This finding underscores the value of our entire tool suite, which focuses on optimizing the *workflow* with predictive tools, rather than just suggesting more headcount.

---

## 🚀 Technology Stack & Architecture

This project is a modern monorepo combining a Python backend with a Next.js frontend, following a clear data pipeline from preparation to presentation.

<img width="1465" height="747" alt="System Architecture Diagram" src="https://github.com/user-attachments/assets/09c6a118-c0cf-4e47-a8f2-f376aa5ec20d" />

### **Data Preparation** 🧹
-   **ETL & Cleaning:** [Alteryx](https://www.alteryx.com/) was used for the initial data cleaning, preparation, and blending of the raw CSV files.

### **Backend** 🐍
-   **Framework:** [FastAPI](https://fastapi.tiangolo.com/) for high-performance, asynchronous API endpoints.
-   **Machine Learning:**
    -   [Scikit-learn](https://scikit-learn.org/stable/) for classification (`RandomForestClassifier`) and regression (`RandomForestRegressor`).
    -   [Statsmodels](https://www.statsmodels.org/stable/index.html) for time-series forecasting (`SARIMA`).
-   **Data Handling:** [Pandas](https://pandas.pydata.org/) for data manipulation and analysis.
-   **Server:** [Uvicorn](https://www.uvicorn.org/) as the ASGI server.

### **Frontend** ⚛️
-   **Framework:** [Next.js](https://nextjs.org/) (with App Router) for a modern, server-aware React application.
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) for beautifully designed, accessible, and composable components.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first CSS framework.
-   **Charts & Visualizations:** [Recharts](https://recharts.org/en-US/) for creating interactive and responsive charts.
-   **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety and improved developer experience.

---

## 🛠️ Running the Project Locally

Follow these instructions to get the project up and running on your local machine.

### **Prerequisites**
-   Python 3.10+
-   Node.js 18.17+ and npm/yarn/pnpm

### **1. Clone the Repository**
```bash
git clone https://github.com/sanjiblamichhane/er-management-system.git
cd er-management-system