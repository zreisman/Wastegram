# Hastigram

[Heroku link][heroku]

[heroku]: https://murmuring-dusk-1251.herokuapp.com/

## Minimum Viable Product
Hastigram is a clone of Instagram on Rails and Backbone for users
to share pictures they haven't put enough thought into. Users can:

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Email validation
- [x] Create posts
- [x] Add images to posts
- [x] Search Users
- [x] Follow Users
- [x] Comment on posts
- [x] View posts and their comments
- [ ] Like posts
- [ ] View a feed of subscribed user's posts


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Verification, Root (~1 day)
I will implement user authentication in Rails based on the practices learned at App Academy. By completion of this phase, Users will be able to register for an account. An email will be sent out to validate a users address. The app will be deployed to Heroku.

[Details][phase-one]

### Phase 2: Create Posts, View Posts (~2 days)
Here I will build out a posts api and construct Backbone views to render the data. Users will be able to view individual posts or a feed of all posts in the database.

[Details][phase-two]

### Phase 3: Find Users, Follow Users (~2 days)
I'll add a Backbone view for a search form. Backbone will query the database through Api::UsersController, but only filtered results will be returned with minimal information.

[Details][phase-three]

### Phase 4: View Feed of Posts For Followed Users (~2 days)
I'll build Backbone composite view of a feed using post and usertag subviews.  A user's feed will be built using the association on the Rails end. The client will display all posts returned.

[Details][phase-four]

### Phase 5: Like Posts, Comment on Posts (~2 days)
By the end this phase, users should be able to like and comment on posts of their followees. The post subview will be broken out into comment and like subviews.

[Details][phase-five]


### Bonus Features (TBD)
- [ ] Filters
- [ ] Notifications
- [ ] Video support
- [ ] Callouts (@bsmith) gives user an alert.

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
