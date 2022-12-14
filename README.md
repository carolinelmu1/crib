# The Crib

The Crib is a web application that creates a simplified dashboard for roommates to communicate household needs, schedules, shared events, etc.. The goal of this project is to simplify and streamline communication for college students and young adults who share roomates. The application features three primary features: a bulletin board for roomates to have a source of centralized communication, a shared shopping list which implements the spoonacular API, and a group calendar where roomates can share events and schedules for efficent time management. The Crib is hosted via Firestore and users are authenticated via Firebase Auth.

## Audience
The crib is created for people with roommates. As college students, we often struggle corresponding with each our roommates on specific things. Particularly,  buying groceries and managing schedules. The crib allows its users to have a virtual, centralized location for communication.

### Live Link: https://the-crib-51d5e.web.app

<img src="/screenshots/homeScreen.png" height=300 />



We used google docs to create a [Design Document](https://docs.google.com/document/d/1qVWHEj-IDcK8vzpuq9Sd558u5bWY9UGDGsRuFjIjNYI/edit?usp=sharing).

### Day Pilot for Calendar

| Name                                                                                              | Description              |
| ------------------------------------------------------------------------------------------------- | ------------------------ |
| [`@daypilot/daypilot-lite-react`](https://code.daypilot.org/42221/react-weekly-calendar-tutorial) | React Calendar Component |

### Spoonacular API

| Name                                                | Description           |
| --------------------------------------------------- | --------------------- |
| [Spoonacular API](https://spoonacular.com/food-api) | API for shopping list |

## Functionality
The crib uses multiple functions to connect its users

### Bulletin Board

<img src="/screenshots/bulletinEx.png" height=300/>

The bulletin board displays other users posts on the bulletin page. To add a new post, click create post. Then after inputing a message. It stores to the database and appears to the left.


### Shopping List

<img src="/screenshots/listEx.png" height=300 />

The shopping list uses the spoonacular API to display a food item when entered. First, type a food item into the search bar, a picture of that item should show up. Click on the picture to add it to the list below and the database. The item can be removed by clicking on the image in the list.


### Group Calendar

<img src="/screenshots/calendarEx.png"  height=300 />

The calendar page displays a calendar that all members have access to. They can view and edit the calendar events of all roommates. An event can be created by clicking on the calendar, inputing a name, and dragging to fit the specified time.

### Future
To improve our product we want to implement the functionality of grouping people up by rooms. That way we can provide the service to multiple users at once.

## Created By

Breea Toomey, Jack Seymour, Denali Tonn, Caroline Ellis <br />
For CMSI2021 Project 4
