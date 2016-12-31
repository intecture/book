# API

The _API_ provides cross-platform abstractions that enable users to centrally manage their server infrastructure. It has two main areas of focus - _primitives_ and payload helpers.

## Primitives

The _API_ is predominantly made up of structures that form the building blocks of a system. We call them _primitives_, because they represent the low level elements in a machine. By themselves they are not very powerful, but when they are used together, you can build sophisticated configurations to apply to diverse infrastructures.

Here is the full list of primitives:

- [Command](ch05-02-01-reference-api-command.html)
- [Directory](ch05-02-02-reference-api-directory.html)
- [File](ch05-02-03-reference-api-file.html)
- [Host](ch05-02-04-reference-api-host.html)
- [Package](ch05-02-05-reference-api-package.html)
- [Service](ch05-02-07-reference-api-service.html)
- [Template](ch05-02-08-reference-api-template.html)

## Payload helpers

The _API_ also provides a structure for running payloads, which looks after process execution and proxying your host connection. See [Payload reference](ch05-02-06-reference-api-payload.html).

## Programming reference

The reference material in this chapter gives you usage examples and explanations of each _primitive_, however it is not a programming reference. For technical documentation, see each language's auto-generated docs:

- [C](/c/)
- [PHP 5](/php5/)
- [PHP 7](/php7/)
- [Rust](/rust/inapi/)
