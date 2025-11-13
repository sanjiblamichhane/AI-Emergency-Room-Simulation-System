# 🏥 Meridian ER Operations: From Bottleneck to Breakthrough

🎉 This product was submitted to Datathon at East Texas A&M University and won the second prize. 🥈 

This project is a full-stack web application designed to help **Meridian City Hospital's ER** move from reactive problem-solving to proactive, data-driven operational planning. By analyzing historical patient flow and staffing data, we've built a suite of predictive tools and an interactive dashboard that empowers hospital administrators to reduce wait times, optimize staffing, and improve patient satisfaction.

The cornerstone of this solution is a powerful **"What-If" Simulation Planner**, allowing management to model different scenarios and receive data-backed staffing recommendations to meet their operational targets.

## Demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/e9l7RqBmxt0?si=wpWz9d31HxoVJsHq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## ✨ Key Features

-   **🤖 Predictive Triage Assistant:** A machine learning model that suggests a patient's triage level upon arrival, speeding up the initial assessment process.
-   **📈 Patient Volume Forecasting:** A time-series model that predicts patient arrival volumes for the next 24 hours, helping to anticipate demand.
-   **⏱️ Live Wait Time Prediction:** A regression model that estimates patient wait times based on the current day, shift, triage level, and staffing.
-   **🔬 "What-If" Simulation Planner:** An interactive tool for administrators to:
    -   Simulate various patient loads and staffing levels (doctors & nurses).
    -   Set a target wait time.
    -   Receive an instant, data-driven recommendation on the optimal number of staff needed to meet their goal.
-   **📊 Analytics Dashboard:** Visualizes key performance indicators (KPIs) like average wait time, patient throughput, and triage distribution.
-   **🎟️ Live Operations Queue:** A real-time view of the patient queue, allowing staff to manage patient flow effectively.

---

## 🚀 System Architecture

This project is a modern monorepo combining a Python backend with a Next.js frontend.
<img width="1465" height="747" alt="image" src="https://github.com/user-attachments/assets/09c6a118-c0cf-4e47-a8f2-f376aa5ec20d" />


### **Data Preparation** 🧹

-   **ETL & Cleaning:** [Alteryx](https://www.alteryx.com/) was used for the initial data cleaning, preparation, and blending of the raw CSV files. This crucial first step ensured that the data fed into the models was accurate, consistent, and properly formatted.

## 📊 Key Findings & Insights

Our analysis of the ER data, initially prepared and cleaned using **Alteryx**, uncovered several critical bottlenecks that directly informed the design of this solution. These are the "why" behind the "what" of our application.

1.  ** Staffing is Misaligned with Peak Wait Times, Not Peak Volume**
    Our analysis revealed that the longest wait times do not occur during peak patient arrival in the morning. Instead, they spike dramatically during the **Day-to-Evening shift change (around 3 PM)**, even as the number of new patients is declining. This proves the bottleneck is related to staff handovers and scheduling, not just raw patient numbers.
    *   **Solution Implemented:** This finding directly inspired the **"What-If" Simulation Planner**, which allows administrators to model and optimize staffing levels for these crucial periods.

2.  ** Lower-Acuity Patients Bear the Brunt of Inefficiencies**
    While the most critical (`Immediate` and `Emergency`) patients are seen relatively quickly, those with `Urgent` and `Semi-Urgent` conditions face disproportionately long and unpredictable waits. This suggests a bottleneck in the main ER flow that the Fast Track system isn't fully alleviating.
    *   **Solution Implemented:** This validated the need for the **Predictive Triage Assistant**. By speeding up the initial classification, staff can more quickly route these lower-acuity patients to the appropriate care path, reducing their time in the main queue.

3.  ** Process is a Bigger Problem Than Headcount**
    The data showed a surprisingly weak correlation between the raw patient-to-staff ratio and average wait times. This counter-intuitive finding indicates that simply hiring more people is not a silver bullet. The underlying *process*—how patients are registered, triaged, and routed—is a major source of delays.
    *   **Solution Implemented:** This finding underscores the value of our entire tool suite, which focuses on optimizing the *workflow* with predictive tools, rather than just suggesting more headcount.


### **Backend** 🐍

-   **Framework:** [FastAPI](https://fastapi.tiangolo.com/) for high-performance, asynchronous API endpoints.
-   **Machine Learning:**
    -   [Scikit-learn](https://scikit-learn.org/stable/) for classification (`RandomForestClassifier`) and regression (`RandomForestRegressor`).
    -   [Statsmodels](https://www.statsmodels.org/stable/index.html) for time-series forecasting (`SARIMA`).
-   **Data Handling:** [Pandas](https://pandas.pydata.org/) for data manipulation and analysis in Python.
-   **Server:** [Uvicorn](https://www.uvicorn.org/) as the ASGI server.

### **Frontend** ⚛️

-   **Framework:** [Next.js](https://nextjs.org/) (with App Router) for a modern, server-aware React application.
-   **UI Components:** [shadcn/ui](https://ui.shadcn.com/) for beautifully designed, accessible, and composable components.
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) for a utility-first CSS framework.
-   **Charts & Visualizations:** [Recharts](https://recharts.org/en-US/) for creating interactive and responsive charts.
-   **Language:** [TypeScript](https://www.typescriptlang.org/) for type safety and improved developer experience.

---

## 🛠️ Getting Started

Follow these instructions to get the project up and running on your local machine.

### Prerequisites

-   Python 3.10+
-   Node.js 18.17+ and npm/yarn/pnpm

### 1. Clone the Repository

```bash
git clone https://github.com/sanjiblamichhane/er-management-system.git
cd er-management-system
