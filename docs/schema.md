# Schema Information

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null
email           | string    | not null
password_digest | string    | not null
profile_pic     | string    | not null
session_token   | string    | not null

## followings
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
followed_id    | integer   | not null, foreign key (ref users)
follower_id    | integer   | not null, foreign key (ref users)

## posts
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (ref users)
body        | string    |

## comments
column name  | data type | details
-------------|-----------|-----------------------
id           | integer   | not null, primary key
commentor_id | integer   | not null, foreign key (ref users)
post_id      | integer   | not null, foreign key (ref posts)

## likes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
post_id     | integer   | not null, foreign key (ref posts)
liker_id    | integer   | not null, foreign key (ref users)
