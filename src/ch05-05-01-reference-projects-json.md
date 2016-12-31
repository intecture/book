# project.json

#### `language`

_Default value: user-defined_

This is the language that the project is written in, and is set by the _CLI_ when you created the project. **This value should not be changed.**

#### `auth_server`

_Default value: auth.example.com_

The IP address or hostname of the _Auth_ server.

#### `auth_api_port`

_Default value: 7101_

The _Auth_ server's `api_port`, which the _API_ uses to retrieve host certificates.

#### `auth_update_port`

_Default value: 7102_

The _Auth_ server's `update_port`, which is used by the _CLI_ when bootstrapping a host to configure the _Agent_.
