# ICT Service Request Management System

A web-based system designed for a university ICT office to manage and monitor technical service requests in one centralized platform. The system allows users to submit, view, search, filter, update, and delete ICT service requests.

The system was developed for **Laboratory Exercise 3 – Systems Analysis and Design** using HTML, CSS, JavaScript, Supabase, GitHub, and GitHub Pages.

---

## 1. Problem Statement

The ICT office receives technical concerns through verbal requests, text messages, and social media. Because requests come from different sources, some concerns may be forgotten, duplicated, or not properly monitored. The proposed Online Service Request Management System provides a centralized platform where users can submit, view, search, filter, update, and delete ICT service requests. The system also allows users to monitor the status and priority of requests, making the handling of technical concerns more organized, accessible, and efficient.

---

## 2. ERD

The Entity Relationship Diagram shows the relationship between users and service requests in the system.

![Entity Relationship Diagram](documentation/erd.png)

[View ERD](documentation/erd.png)

### Relationship

```text
USER 1 ───────── M SERVICE_REQUEST
```

One user can create many service requests.

---

## 3. Use Case Diagram

The Use Case Diagram shows how the System User interacts with the different functions of the system.

![Use Case Diagram](documentation/use-case-diagram.png)

[View Use Case Diagram](documentation/use-case-diagram.png)

### Main Use Cases

- Login
- View Dashboard
- Create Request
- View Requests
- Search Request
- Filter Requests
- Update Request
- Delete Request
- Logout

---

## 4. Project Structure

```text
SAD-ServiceRequest-Francisco/
│
├── index.html
├── login.html
│
├── css/
│   └── style.css
│
├── js/
│   ├── supabase.js
│   ├── auth.js
│   └── app.js
│
├── documentation/
│   ├── system-analysis.md
│   ├── erd.png
│   └── use-case-diagram.png
│
└── README.md
```

### File Description

| File/Folder | Description |
|---|---|
| `index.html` | Main dashboard and service request management page |
| `login.html` | User login page |
| `css/style.css` | System design and styling |
| `js/supabase.js` | Supabase client configuration |
| `js/auth.js` | Login, logout, and session management |
| `js/app.js` | Dashboard, CRUD, search, filter, and validation |
| `documentation/` | System analysis and diagrams |
| `README.md` | Project documentation |

---

## 5. Main Features

The system provides the following features:

- User Login
- User Logout
- Session Management
- Dashboard
- Create Service Request
- View Service Requests
- Update Service Request
- Delete Service Request
- Search Service Requests
- Filter by Status
- Filter by Priority
- Combined Search and Filtering
- Dashboard Statistics
- Input Validation
- Access Control

### Service Request Categories

- Computer Repair
- Software Installation
- Internet/Network Problem
- Printer Problem
- Account/Access Concern
- Other ICT Concerns

### Request Priority

- Low
- Medium
- High

### Request Status

- Pending
- In Progress
- Completed

New service requests are automatically assigned the **Pending** status.

---

## 6. Deployment

The system is deployed online using **GitHub Pages**.

### Deployment Configuration

- Repository: `SAD-ServiceRequest-Francisco`
- Branch: `main`
- Folder: `/(root)`
- Hosting: GitHub Pages

### Live System

[Open ICT Service Request Management System](https://mfrancisco717.github.io/SAD-ServiceRequest-Francisco/)

The system opens with the login page. After successful authentication, the user is redirected to the dashboard.

---

## 7. Requirements Traceability Matrix

| Req. ID | Requirement | System Feature | Test |
|---|---|---|---|
| FR-01 | User can log in | Login Page and Authentication | TC-01 |
| FR-02 | User can create a request | New Request Form | TC-02 |
| FR-03 | User can view requests | Request Table | TC-03 |
| FR-04 | User can update a request | Edit Request Function | TC-04 |
| FR-05 | User can delete a request | Delete Function | TC-05 |
| FR-06 | User can search requests | Search Function | TC-06 |
| FR-07 | User can filter requests | Status and Priority Filters | TC-07 |
| FR-08 | System displays summaries | Dashboard Statistics | TC-08 |

The complete requirements, business rules, and traceability information are available in [`documentation/system-analysis.md`](documentation/system-analysis.md).

---

## 8. Functional Testing

| Test ID | Test Scenario | Expected Result | Result |
|---|---|---|---|
| TC-01 | Login using valid account | Dashboard appears | PASS |
| TC-02 | Submit valid request | Request is saved | PASS |
| TC-03 | Display requests | Existing records appear | PASS |
| TC-04 | Modify request | Changes are saved | PASS |
| TC-05 | Delete request | Confirmation appears and record is removed | PASS |
| TC-06 | Search requester | Matching records are displayed | PASS |
| TC-07 | Filter by status and priority | Matching records are displayed | PASS |
| TC-08 | Open deployed URL | Application loads online | PASS |

> Test results should only be marked **PASS** after the corresponding function has been successfully tested.

---

## 9. System Documentation

The complete Systems Analysis and Design documentation is available in:

[`documentation/system-analysis.md`](documentation/system-analysis.md)

The documentation contains:

- Problem Statement
- System Objectives
- Scope
- Actors
- Use Cases
- Use Case Diagram
- Functional Requirements
- Non-Functional Requirements
- Database Design
- Entity Relationship Diagram
- Business Rules
- CRUD Operations
- Search and Filtering
- Dashboard
- Authentication and Access Control
- System Architecture
- Requirements Traceability Matrix
- Functional Testing
- Conclusion

The system diagrams are also available in the repository:

- [`documentation/erd.png`](documentation/erd.png)
- [`documentation/use-case-diagram.png`](documentation/use-case-diagram.png)

---

## 10. Security Notes

- Authentication is required before accessing the main dashboard.
- User sessions are managed through the authentication system.
- Row Level Security (RLS) is enabled for the service request data.
- Database access is controlled through authenticated user policies.
- Users can only modify service requests they are authorized to modify.
- Required fields are validated before submitting a request.
- Delete operations require confirmation before removing a request.
- The Supabase `service_role` key is not exposed in the front-end application.
- Passwords and test account credentials are not included in this README.

---

## Conclusion

The ICT Service Request Management System provides a centralized and organized way of handling technical concerns. It supports authentication, CRUD operations, searching, filtering, dashboard monitoring, and secure database access. The system is deployed through GitHub Pages and uses Supabase for authentication and data management.