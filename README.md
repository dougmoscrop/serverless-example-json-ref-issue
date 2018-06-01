# serverless issue - json-cycle $ref

This repo shows how to reproduce a new-ish problem with Serverless plugins.

## Steps

- `npm install`
- `npm test`

What will happen is the CloudFormation update template will contain a $ref because `json-cycle` sees that the same `===` object was included twice in the compiled template even though there's no cycle that I can see.

This problem occurs when e.g. a plugin reads something from the serverless.yml configuration and writes it multiple times in to the CF template (e.g. "one thing for each function that has a similar property" (such as a role ARN)).

It only seems to happen when the "thing" is a complex type, such as an `Fn::Join` object, not a simple string.

This can be avoided by the plugin doing a _.cloneDeep but it's not ideal.
