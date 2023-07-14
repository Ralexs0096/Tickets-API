# How we use routes in this project?

1. we need to understand how is our router structured

first at all we need to take a look at `src/routes.ts`, this file is the main router file, here we've created two Context, public and private one.

this two context will be registered when we call the function `routes()` on our `server.ts`
