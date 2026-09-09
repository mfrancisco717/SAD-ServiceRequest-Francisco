# Online Service Request Management System

## 1. System Overview

The Online Service Request Management System is a web-based system designed to organize and manage ICT-related service requests. It provides a centralized platform where authenticated users can submit technical concerns, view existing requests, search for specific requests, filter requests by status and priority, update request information, and delete requests.

The system uses HTML, CSS, and JavaScript for the front end, Supabase PostgreSQL as the database, Supabase Authentication for user login, and GitHub Pages for deployment.

---

## 2. Problem Statement

The ICT office receives technical concerns through verbal requests, text messages, and social media. Because requests come from different sources, some concerns may be forgotten, duplicated, or not properly monitored. The proposed Online Service Request Management System provides a centralized platform where users can submit, view, search, filter, update, and delete ICT service requests. The system also allows authenticated users to monitor the status and priority of requests, making the handling of technical concerns more organized, accessible, and efficient.

---

## 3. Objectives

The main objective of the system is to provide a centralized online platform for managing ICT service requests.

Specifically, the system aims to:

1. Allow users to securely log in to the system.
2. Allow users to create ICT service requests.
3. Allow users to view submitted service requests.
4. Allow users to update existing service requests.
5. Allow users to delete service requests.
6. Provide search functionality for service requests.
7. Provide filtering by status and priority.
8. Display request summaries through the dashboard.
9. Store service request information in a centralized database.
10. Protect service request records using authentication and Row Level Security.

---

## 4. Scope of the System

The system focuses on the management of ICT-related service requests.

The system supports the following categories:

- Computer Repair
- Software Installation
- Internet/Network Problem
- Printer Problem
- Account/Access Concern
- Other ICT Concerns

The system includes:

- User login
- User logout
- Dashboard
- Create request
- View requests
- Edit request
- Delete request
- Search requests
- Status filtering
- Priority filtering
- Dashboard statistics
- Authentication
- Database storage
- Row Level Security

---

## 5. Actors

### Primary Actor: System User / ICT Personnel

The System User or ICT Personnel interacts with the system to manage ICT service requests.

The actor can:

- Login
- View the dashboard
- Create service requests
- View service requests
- Search service requests
- Filter service requests
- Update service requests
- Delete service requests
- Logout

---

## 6. Use Cases

The system contains the following major use cases:

| Use Case | Description |
|---|---|
| Login | Allows an authenticated user to access the system. |
| View Dashboard | Displays request statistics and service request information. |
| Create Request | Allows the user to submit a new ICT service request. |
| View Requests | Displays existing service requests. |
| Search Request | Allows the user to search using requester name or description. |
| Filter Requests | Allows the user to filter requests by status and priority. |
| Update Request | Allows the user to modify an existing request. |
| Delete Request | Allows the user to remove a request after confirmation. |
| Logout | Ends the user's authenticated session. |

---

## 7. Use Case Diagram

The following diagram shows the relationship between the system user and the functions of the Online Service Request Management System.

![Use Case Diagram](use-case-diagram.png)

**Figure 1. Use Case Diagram**

---

## 8. Functional Requirements

| Requirement ID | Functional Requirement |
|---|---|
| FR-01 | The system shall allow authenticated users to log in. |
| FR-02 | The system shall allow users to create service requests. |
| FR-03 | The system shall allow users to view service requests. |
| FR-04 | The system shall allow users to update service requests. |
| FR-05 | The system shall allow users to delete service requests. |
| FR-06 | The system shall allow users to search service requests. |
| FR-07 | The system shall allow users to filter requests by status and priority. |
| FR-08 | The system shall display request summaries on the dashboard. |

---

## 9. Non-Functional Requirements

### Usability

The system should have a simple and understandable interface that allows users to easily submit and manage ICT service requests.

### Security

The system requires user authentication. Supabase Row Level Security is enabled to help prevent unauthorized database modifications.

### Reliability

The system should properly save, retrieve, update, and delete service request records.

### Accessibility

The system is accessible through a web browser and is deployed using GitHub Pages.

### Performance

The system should load the request records and dashboard information efficiently.

---

## 10. Database Design

The system uses a Supabase PostgreSQL database.

The main table is:

### SERVICE_REQUEST

| Field | Description |
|---|---|
| id | Unique identifier of the request |
| requester_name | Name of the person requesting assistance |
| department | Department of the requester |
| category | Type of ICT concern |
| description | Detailed description of the problem |
| priority | Priority level of the request |
| status | Current status of the request |
| created_at | Date and time the request was created |
| user_id | ID of the authenticated user who created the request |

The system also uses Supabase Authentication to manage users.

---

## 11. Entity Relationship Diagram

The ERD shows the relationship between the authenticated user and service requests.

![Entity Relationship Diagram](erd.png)

**Figure 2. Entity Relationship Diagram**

### Relationship

One user can create many service requests.

```text
USER 1 ─────────── M SERVICE_REQUEST