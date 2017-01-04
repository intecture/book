# `incli run`

### Run a project

To run a project, use the `run` command from your project root:

```bash
incli run
```

Most projects require you to pass one or more arguments to them, for example, the name of the host you want to target. To pass arguments to your project, simply append them to the command:

```bash
incli run web1.example.com 'another arg'
```

These will be provided to your project via `stdin`.
