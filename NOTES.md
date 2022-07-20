If I had more time Id:

1. Refactor the responses if the url's were never going to change. I could then cache the data in a variable so that further calls to the data source at not needed which would speed up future queries.
2. Have stronger error handling and error checking. Currently the logging isn't very good or as helpful as I'd like. Having the error itself printed out would help a developer to debug this in the future
3. In the second API route of /cards/:cardId/:sizeId? I'd make sure to refactor some of the logic into functions. Currently the function is far too long as is harder to read than it should be.
4. I'd also make sure not to inline maps or function calls inside the pricedCard constructor to keep the code cleaner.
5. Having helper functions in their own directory and .ts file would clean up the server.ts file. This would allow the server.ts to be clean to look at to see exactly what each route does.
6. Having a business logic layer would help to abstract away all of the object construction. This would then leave the API routes in server.ts to be slim and easy to read.
7. I'd use variables for the data source urls and any static strings that are laying about. This would increase readability and reusability across the codebase/file.
8. My unit tests are very slim and test the bear minimum. Having stricter tests and more of them would improve code quality overtime.
9. I'd research how to have a JSON object without a wrapper as the examples stressed that no wrapper should be present
10. I would double check all of my types on function calls and variables to make code more readable due to Typescript.

Thank you for the opportunity.
