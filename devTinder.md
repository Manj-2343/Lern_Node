##authRouter
->POST->signup
->Post/login
->Post/logout

###profileRouter
->GET->/profile/view
->PATCH->/profile/edit
->PATCH->/profile/password

#####connection requestRouter
-POST :/request/send/interested/:userId
->POST /request/send/ignored/:userId
-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

#####userRouter
-GET /user/connections
-Get /user/request
-GET /user/feed ->gets you the profiles of others

status"ignore,interested,accepted,rejected"
