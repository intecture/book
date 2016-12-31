# payload.json

#### `author`

_Default value: me_

It's you! If you wrote this payload, you should take credit for it.

#### `repository`

_Default value: https://github.com/\<ORG\>/\<project_name\>.git_

The URL to this payload's repository. It doesn't have to be GitHub, by the way!

#### `language`

_Default value: user-defined_

This is the language that the payload is written in, and is set by the _CLI_ when you created the payload. **This value should not be changed.**

#### `dependencies`

_Default value: none_

An optional array of other payloads that this payload depends on. Payloads here should be named after their directories.

For example, if I'm installing Nginx but also rely on the firewall and Squid payloads, I should include it as a dependency:

```json
{
    "dependencies": [
        "firewall",
        "squid"
    ]
}
```
