# System Analysis

## 1. Problem Statement

The university ICT office receives technical concerns through verbal requests, text messages, and social media messages. Because requests come from different channels, some concerns may be forgotten, duplicated, or not properly monitored. The ICT Service Request Management System will provide a centralized platform where authorized users can record, monitor, search, update, and manage ICT service requests.

## 2. Primary Actor

The primary actor of the system is:

- System User / ICT Personnel

## 3. Use Cases

The system includes the following use cases:

1. Login
2. View Dashboard
3. Create Request
4. View Requests
5. Search Request
6. Filter Requests
7. Update Request
8. Delete Request
9. Logout

## 4. Database Entity

### service_requests

Fields:

- id
- requester_name
- department
- category
- description
- priority
- status
- created_at
- user_id

## 5. Requirements Traceability Matrix

| Req. ID | Requirement | System Feature | Test |
|---|---|---|---|
| FR-01 | User can log in | Login Page | TC-01 |
| FR-02 | User can create request | Request Form | TC-02 |
| FR-03 | User can view requests | Request Table | TC-03 |
| FR-04 | User can update request | Edit Function | TC-04 |
| FR-05 | User can delete request | Delete Function | TC-05 |
| FR-06 | User can search | Search Function | TC-06 |
| FR-07 | User can filter | Filter Function | TC-07 |
| FR-08 | System displays summaries | Dashboard | TC-08 |

## 6. Functional Testing

| Test ID | Test Scenario | Expected Result | Result |
|---|---|---|---|
| TC-01 | Login using valid account | Dashboard appears | |
| TC-02 | Submit valid request | Request saved | |
| TC-03 | Display requests | Existing records appear | |
| TC-04 | Modify request | Changes saved | |
| TC-05 | Delete request | Confirmation appears and record is removed | |
| TC-06 | Search requester | Matching records displayed | |
| TC-07 | Filter Pending requests | Only Pending records displayed | |
| TC-08 | Open deployed URL | Application loads online | |