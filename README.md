# regalospara.me

## Dependencies

- VS Code (https://code.visualstudio.com/download)
- NodeJS (https://nodejs.org/en/download)
- (optional) you need Node v18 or higher, use [NVM](https://github.com/nvm-sh/nvm) or [Volta](https://github.com/volta-cli/volta) for changing your NodeJS version
- Docker (https://docs.docker.com/engine/install/)

## Developer Setup

- create `.env` file by using `.env.example` as template by running `yarn env`
- run docker services `yarn docker`
- install dependencies `yarn`
- run migrations `yarn prisma:migrate`
- start server on dev mode `yarn dev`
