# Library of surveys used by CiCL social network experiments

Surveys to use with CiCL experiments built with React. These surveys are generated as JavaScript component.

## Installation

```
npm i @comanlab/surveys
```

## Usage

Import surveys by name for React pages and components.

```
import { ExampleSurvey } from "@comanlab/surveys";
```

Process and store survey responses using a callback function that takes a scored survey response as its input parameter.

```
const onCompleteCallback = (record) => {
  console.log(record);
};
```

Then, include the survey as a React component:

```
<ExampleSurvey onComplete={onCompleteCallback} />
```

## Development

Add new surveys to `surveys/` as a subdirectory named for the survey via camelCase, e.g., `surveys/exampleSurvey/`.

Run this project in development by running `npm install` in the root directory to install dependencies listed in `package.json`. Tne, run `npm run build` to build the surveys in this project.

### Survey file

### Scoring function

### Documentation

### Packaging

### Testing

### Publishing

## Acknowledgments

This repository is modeled off of [@Watts-Lab/surveys](https://github.com/Watts-Lab/surveys/).