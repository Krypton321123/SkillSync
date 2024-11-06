# Description 

This is a project where users can create communities based on their skills and they can conenct with each other on this basis

v1 - We will do this We know -> Basic functionality v2 - will have to research --> Advanced functionality semi v2 - we'll try --> Don't know whether can do 

# Todos 
Tech stack 
db 
overall architecture


# Tech Stack 

 - Backend - express and mongo
 - Frontend - vite(React) 
 - Ui-library - Chakra-ui or shadcn or material or aceternity
# Feature List

 - User profile creation with skills (Make a skill schema connect it with user) - v1
 - Communities with a description, with a head or creator, users who can join, follow unfollow - implement - v1
 - User should be able to create posts within the community - v1 
 - Post - Imagee or video, description, name, poster, and likes unlikes comments or upvote downvote - v1 
 - Audio rooms for community where members can join - semi v2 
 
 - Personal chats - v2 
 - User indidual posts different schema completely - v2 
 - Follow unfollow for user - v2
 - Recommendation system based on skills - in v2

# Overall Architecture 

 Models: 
  - User - FirstName, LastName, Email_id, password, phone_no(optional), community(array of communites where he's connected) --> Will continue later on (subject to changes)
  - Community - Creator, Description, name, users(array of users who are members), rules(Alpha feature = can try it), posts(posts of this community)
  - CommunityPost - community_id, image/video, title, description, user_id, upvotes, downvotes, (need to verify that user is in the community)
  - CommentBox - arrays of comments/arrays of text or Strings, post_id
  - Comment - text, user_id (will need to decide whether only parts of the community can comment or more people can)
  - Room - array of users, community_id 
  - UserPost - later 

  Frontend: 
  - Postpone having a universal sidebar - v2 it is too much hassle 


  # Urgent Tasks 

    - Appbar for normal site (fe) -> Raj 
    - dashboard design + work (fe + be) -> Raj backend only
    - create community page (fe) 
    - create post page (fe)
    - chat functionality (fe + be + need to study ws) ->
    - community functionality - high priority 
    - post functionality (frontend + backend) -> high priority 
    - logout button (fe) ->
    - update profile (fe + be) -> high priority 
    - detailed profile page (fe + be) -> high priority 
    - posts from community and people user is friends with should show up front on dashboard (fe + be) ->
    - create community page (frontend) ->
    - putting logo on the appbar -> mukti

    

  WE NEED FRONTEND FAST 