# `incli payload`

### Create a payload

To create a payload, use the `init` subcommand from your project root:

```bash
incli payload init nginx rust
```

You can create payloads in any [supported language](ch01-02-intro-installation.html#System%20Requirements), irrespective of the project's language.

### Build payloads

When running a project, payloads are automatically compiled (where necessary). If you wish to build payloads ahead of time, use the `build` subcommand from your project root:

```bash
incli payload build
```

This will build all payloads that require compiling and ignore those that don't. To build a specific payload, just pass its name as an extra argument:

```bash
incli payload build nginx squid
```
