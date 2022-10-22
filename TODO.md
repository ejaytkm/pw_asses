# TASK
## BACKEND
- ~~Build backend SQL~~
- ~~CRUD user - name, password via Oauth2.0~~
- ~~Set up GRAPHQL~~
- CRUD ingredient = create, read, update, delete
- CRUD outlets =
- CRUD user_outlets - admin/managers should be able to assign users to outlets =
- CRUD ingredients_outlets - admin [create] manager [update,view], employee [view] =
- Complete Ouath middleware routes
- ROLES ingredients =
- ROLES outlets =
- ROLES user_outlets =
- ROLES ingredients_outlets =
- SEEDER - outlets [hard coded into the system] =

## FRONTEND
- LOGIN page =
- SIGNUP page = please wait for your respective manager to assign you
- INGREDIENTS page = admin [create>], manager [update> amount], user [view]
- OUTLETS page = Admin can add outlets? admin can assign a manager to an outlet to location
- GOOGLE_MAPS_API =

# QUESTION
Problem Statement &amp; Assignment
You have been hired as the lead in-house software developer of a restaurant chain, tasked
with resolving their most immediate problems. The restaurant chain has multiple outlets and
is constantly expanding. Each outlet has been keeping track of ingredients stock levels
manually, and HQ admin is able to view remaining stocks and action accordingly.

Deliverables
1. Design a business use case diagram showing the functionality you are targeting in
your solution.
2. Build a functional web application prototype (both front-end and back-end) with
following functionalities:
  a. Login &amp; Logout
  b. View / Create / Update Ingredient
  c. View Outlet

Business Rules
1. The web application should be able to cater for different user type upon login:
  a. Admin
  b. Store Manager
  c. Employee
2. Following attributes are stored for each User:
  a. Username
  b. Password
  c. User type (Admin, Store Manager and Employee)
  d. Outlet (Applicable for Store Manager and Employee only)
3. Following attributes are stored for each Ingredient:
  a. Ingredient Name
  b. Assigned Location
  c. Amount in each location
4. Following attributes are stored for each Outlet:
  a. Outlet Name
  b. GPS location displayed in map
5. Password must be mixture of lowercase, uppercase &amp; number ONLY
6. Admin is able to:
  a. Create new Ingredient and assign to outlet (1 or many)
  b. View balance amount of Ingredient for all outlet (Default is 0)
7. One Store Manager is assigned to one Outlet only. Each store manager is able to
  a. View Ingredient assigned to respective outlet
  b. Update Amount to each ingredient available
8. Employees are assigned to one Outlet only. Each employee is able to:
  a. View Ingredient assigned to respective outlet
9. There are two outlet available currently, which are:
  a. Mid Valley (GPS: 3.117933, 101.676847)
  b. Pavillion (GPS: 3.1492146, 101.7135288)

Scope / Requirement Guidance
 Implement a functional prototype for both FE and BE, your prototype can include only
a subset of the requirement, in the interest of time. We would also like to encourage
you to go beyond the requirement scope and think of innovative ways to enhance
your solution.
 Use any JavaScript Library of your choice for implementation.
 Implement Social Login (e.g. Facebook) or a way to identify unique users if
applicable.
 Consider using cloud – AWS, GCP, Azure. If not, an app that can run on localhost is
still acceptable.
 Consider using building blocks you can find from other APIs - Google Maps API etc.
 Ensure that your prototype demonstrates sufficient breadth – it should include front
end and back end components and APIs.
 Connectivity to Database is OPTIONAL, you may hardcode data in code as a
variable and refresh upon every build.
 You may hardcode User &amp; Outlet data as static variable in Backend since RBAC of
User &amp; Outlet is out of scope.
