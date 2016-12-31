# Agent

The _Agent_ is the service situated on each managed host, facilitating interactions between the _API_ and the host itself. It is also translation point for converting generic _API_ instructions into platform-specific commands.

## Endpoints

### API endpoint

The API endpoint is the main listener that receives instructions from the _API_. All _API_ primitives use this endpoint to send instructions and receive data, with the exception of file uploads.

### File transfer endpoint

The File transfer endpoint is a dedicated listener for receiving files. Behind the scenes, the _Agent_ uses the terribly named [ZFileXfer](https://github.com/betweenlines/zfilexfer) project to handle uploads.

### Security

Socket listeners, like those used by the _Agent_ service, add an attack surface to your hosts. Read the section on [Attack Surfaces](ch04-01-security-attack.html#2.%20Socket%20listeners) for more information and advice.
