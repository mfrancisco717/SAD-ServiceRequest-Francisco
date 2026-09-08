// =====================================
// SERVICE REQUEST APPLICATION
// =====================================

let currentUser = null;
let allRequests = [];


// =====================================
// CHECK USER SESSION
// =====================================

async function checkUser() {

    const {
        data: { user },
        error
    } = await supabaseClient.auth.getUser();

    if (error) {

        console.error(
            "Session error:",
            error
        );

        window.location.href = "login.html";

        return false;
    }

    if (!user) {

        window.location.href = "login.html";

        return false;
    }

    currentUser = user;

    console.log(
        "Logged in user:",
        currentUser.email
    );

    return true;
}


// =====================================
// LOAD DASHBOARD
// =====================================

async function loadDashboard() {

    const {
        data,
        error
    } = await supabaseClient
        .from("service_requests")
        .select("status");

    if (error) {

        console.error(
            "Error loading dashboard:",
            error
        );

        return;
    }

    const total = data.length;

    const pending = data.filter(
        request =>
            request.status === "Pending"
    ).length;

    const inProgress = data.filter(
        request =>
            request.status === "In Progress"
    ).length;

    const completed = data.filter(
        request =>
            request.status === "Completed"
    ).length;


    const totalElement =
        document.getElementById(
            "totalRequests"
        );

    const pendingElement =
        document.getElementById(
            "pendingRequests"
        );

    const inProgressElement =
        document.getElementById(
            "inProgressRequests"
        );

    const completedElement =
        document.getElementById(
            "completedRequests"
        );


    if (totalElement) {

        totalElement.textContent =
            total;

    }


    if (pendingElement) {

        pendingElement.textContent =
            pending;

    }


    if (inProgressElement) {

        inProgressElement.textContent =
            inProgress;

    }


    if (completedElement) {

        completedElement.textContent =
            completed;

    }

}


// =====================================
// LOAD SERVICE REQUESTS
// =====================================

async function loadRequests() {

    const {
        data,
        error
    } = await supabaseClient
        .from("service_requests")
        .select("*")
        .order("created_at", {
            ascending: false
        });


    if (error) {

        console.error(
            "Error loading requests:",
            error
        );

        return;
    }


    allRequests = data;

    displayRequests(
        allRequests
    );

}


// =====================================
// DISPLAY REQUESTS
// =====================================

function displayRequests(requests) {

    const tableBody =
        document.getElementById(
            "requestTableBody"
        );


    if (!tableBody) {

        return;

    }


    tableBody.innerHTML = "";


    if (requests.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="8">

                    No service requests found.

                </td>

            </tr>

        `;

        return;
    }


    requests.forEach(request => {

        const row =
            document.createElement("tr");


        const date =
            new Date(
                request.created_at
            ).toLocaleString();


        row.innerHTML = `

            <td>
                ${request.id}
            </td>

            <td>
                ${request.requester_name}
            </td>

            <td>
                ${request.department}
            </td>

            <td>
                ${request.category}
            </td>

            <td>
                ${request.priority}
            </td>

            <td>
                ${request.status}
            </td>

            <td>
                ${date}
            </td>

            <td>

                <button
                    class="edit-btn"
                    onclick="editRequest(${request.id})"
                >
                    Edit
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteRequest(${request.id})"
                >
                    Delete
                </button>

            </td>

        `;


        tableBody.appendChild(row);

    });

}


// =====================================
// SEARCH AND FILTER
// =====================================

function filterRequests() {

    const searchInput =
        document.getElementById(
            "searchInput"
        );

    const statusFilter =
        document.getElementById(
            "statusFilter"
        );

    const priorityFilter =
        document.getElementById(
            "priorityFilter"
        );


    if (
        !searchInput ||
        !statusFilter ||
        !priorityFilter
    ) {

        return;

    }


    const searchText =
        searchInput.value
            .toLowerCase()
            .trim();


    const selectedStatus =
        statusFilter.value;


    const selectedPriority =
        priorityFilter.value;


    const filteredRequests =
        allRequests.filter(
            request => {

                const requesterName =
                    (
                        request.requester_name ||
                        ""
                    )
                    .toLowerCase();


                const description =
                    (
                        request.description ||
                        ""
                    )
                    .toLowerCase();


                const matchesSearch =
                    requesterName.includes(
                        searchText
                    ) ||
                    description.includes(
                        searchText
                    );


                const matchesStatus =
                    selectedStatus === "All" ||
                    request.status ===
                        selectedStatus;


                const matchesPriority =
                    selectedPriority === "All" ||
                    request.priority ===
                        selectedPriority;


                return (
                    matchesSearch &&
                    matchesStatus &&
                    matchesPriority
                );

            }
        );


    displayRequests(
        filteredRequests
    );

}


// =====================================
// SEARCH EVENT
// =====================================

const searchInput =
    document.getElementById(
        "searchInput"
    );


if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterRequests
    );

}


// =====================================
// STATUS FILTER EVENT
// =====================================

const statusFilter =
    document.getElementById(
        "statusFilter"
    );


if (statusFilter) {

    statusFilter.addEventListener(
        "change",
        filterRequests
    );

}


// =====================================
// PRIORITY FILTER EVENT
// =====================================

const priorityFilter =
    document.getElementById(
        "priorityFilter"
    );


if (priorityFilter) {

    priorityFilter.addEventListener(
        "change",
        filterRequests
    );

}


// =====================================
// CREATE SERVICE REQUEST
// =====================================

const requestForm =
    document.getElementById(
        "requestForm"
    );


if (requestForm) {

    requestForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            if (!currentUser) {

                alert(
                    "Your session has expired. Please log in again."
                );


                window.location.href =
                    "login.html";


                return;

            }


            const requesterName =
                document
                    .getElementById(
                        "requesterName"
                    )
                    .value
                    .trim();


            const department =
                document
                    .getElementById(
                        "department"
                    )
                    .value
                    .trim();


            const category =
                document
                    .getElementById(
                        "category"
                    )
                    .value;


            const description =
                document
                    .getElementById(
                        "description"
                    )
                    .value
                    .trim();


            const priority =
                document
                    .getElementById(
                        "priority"
                    )
                    .value;


            // =====================================
            // VALIDATION
            // =====================================

            if (!requesterName) {

                alert(
                    "Requester name is required."
                );

                return;

            }


            if (!department) {

                alert(
                    "Department is required."
                );

                return;

            }


            if (!category) {

                alert(
                    "Please select a category."
                );

                return;

            }


            if (description.length < 10) {

                alert(
                    "Description must contain at least 10 characters."
                );

                return;

            }


            if (!priority) {

                alert(
                    "Please select a priority."
                );

                return;

            }


            // =====================================
            // INSERT REQUEST
            // =====================================

            const {
                error
            } = await supabaseClient
                .from("service_requests")
                .insert([

                    {

                        requester_name:
                            requesterName,

                        department:
                            department,

                        category:
                            category,

                        description:
                            description,

                        priority:
                            priority,

                        status:
                            "Pending",

                        user_id:
                            currentUser.id

                    }

                ]);


            if (error) {

                console.error(
                    "Insert error:",
                    error
                );


                alert(
                    "Failed to submit request: " +
                    error.message
                );


                return;

            }


            alert(
                "Service request submitted successfully!"
            );


            requestForm.reset();


            await loadRequests();

            await loadDashboard();

        }
    );

}


// =====================================
// START APPLICATION
// =====================================

async function startApplication() {

    const loggedIn =
        await checkUser();


    if (!loggedIn) {

        return;

    }


    await loadRequests();

    await loadDashboard();

}


// =====================================
// RUN APPLICATION
// =====================================

const currentPath =
    window.location.pathname;


// =====================================
// GITHUB PAGES ROOT
// =====================================
//
// Example:
//
// https://username.github.io/SAD-ServiceRequest-Francisco/
//
// The root URL should open LOGIN first.
// After successful login, auth.js sends
// the user to index.html.
//
// =====================================

if (
    currentPath.endsWith("/") &&
    !currentPath.endsWith("login.html")
) {

    window.location.href =
        "login.html";

}


// =====================================
// DASHBOARD PAGE
// =====================================

else if (
    currentPath.endsWith(
        "index.html"
    )
) {

    startApplication();

}


// =====================================
// EDIT SERVICE REQUEST
// =====================================

async function editRequest(id) {

    if (!currentUser) {

        alert(
            "Please log in again."
        );

        window.location.href =
            "login.html";

        return;

    }


    const request =
        allRequests.find(
            item => item.id === id
        );


    if (!request) {

        alert(
            "Request not found."
        );

        return;

    }


    const requesterName =
        prompt(
            "Requester Name:",
            request.requester_name
        );


    if (requesterName === null) {

        return;

    }


    const department =
        prompt(
            "Department:",
            request.department
        );


    if (department === null) {

        return;

    }


    const description =
        prompt(
            "Description:",
            request.description
        );


    if (description === null) {

        return;

    }


    const priority =
        prompt(
            "Priority (Low, Medium, High):",
            request.priority
        );


    if (priority === null) {

        return;

    }


    const status =
        prompt(
            "Status (Pending, In Progress, Completed):",
            request.status
        );


    if (status === null) {

        return;

    }


    const validPriorities = [

        "Low",

        "Medium",

        "High"

    ];


    const validStatuses = [

        "Pending",

        "In Progress",

        "Completed"

    ];


    if (!requesterName.trim()) {

        alert(
            "Requester name is required."
        );

        return;

    }


    if (!department.trim()) {

        alert(
            "Department is required."
        );

        return;

    }


    if (description.trim().length < 10) {

        alert(
            "Description must contain at least 10 characters."
        );

        return;

    }


    if (
        !validPriorities.includes(
            priority
        )
    ) {

        alert(
            "Priority must be Low, Medium, or High."
        );

        return;

    }


    if (
        !validStatuses.includes(
            status
        )
    ) {

        alert(
            "Status must be Pending, In Progress, or Completed."
        );

        return;

    }


    const {
        error
    } = await supabaseClient
        .from("service_requests")
        .update({

            requester_name:
                requesterName.trim(),

            department:
                department.trim(),

            description:
                description.trim(),

            priority:
                priority,

            status:
                status

        })
        .eq(
            "id",
            id
        )
        .eq(
            "user_id",
            currentUser.id
        );


    if (error) {

        console.error(
            "Update error:",
            error
        );


        alert(
            "Failed to update request: " +
            error.message
        );


        return;

    }


    alert(
        "Service request updated successfully!"
    );


    await loadRequests();

    await loadDashboard();

}


// =====================================
// DELETE SERVICE REQUEST
// =====================================

async function deleteRequest(id) {

    if (!currentUser) {

        alert(
            "Please log in again."
        );

        window.location.href =
            "login.html";

        return;

    }


    const confirmed =
        confirm(
            "Are you sure you want to delete this service request?"
        );


    if (!confirmed) {

        return;

    }


    const {
        error
    } = await supabaseClient
        .from("service_requests")
        .delete()
        .eq(
            "id",
            id
        )
        .eq(
            "user_id",
            currentUser.id
        );


    if (error) {

        console.error(
            "Delete error:",
            error
        );


        alert(
            "Failed to delete request: " +
            error.message
        );


        return;

    }


    alert(
        "Service request deleted successfully!"
    );


    await loadRequests();

    await loadDashboard();

}