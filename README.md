# Library of surveys used by CiCL social network experiments

Surveys to use with CiCL experiments built with React. These surveys are generated as JavaScript component.

[![Surveys](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/simple/z7p66s&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/s6qray/runs)
[![npm version](https://badge.fury.io/js/@comanlab%2Fsurveys.svg)](https://badge.fury.io/js/@comanlab%2Fsurveys)

## Installation

```
npm i @comanlab/surveys
```

## Usage

Import surveys by name for React pages and components.

```js
import { ExampleSurvey } from "@comanlab/surveys";
```

Process and store survey responses using a callback function that takes a scored survey response as its input parameter.

```js
const onCompleteCallback = (record) => {
  console.log(record);
};
```

Then, include the survey as a React component:

```js
<ExampleSurvey onComplete={onCompleteCallback} />
```

## Development

Add new surveys to `surveys/` as a subdirectory named for the survey via camelCase, e.g., `surveys/exampleSurvey/`.

Run this project in development by running `npm install` in the root directory to install dependencies listed in `package.json`. Tne, run `npm run build` to build the surveys in this project.

### Survey file

Create a SurveyJS `.json` file with the same name as the directory (_e.g._ `exmampleSurvey/exampleSurvey.json`) following the surveyJS format.

You can use the online SurveyJS visual editor if you would like: https://surveyjs.io/create-free-survey

Question names should be a one-word camelCase descriptor of the question that can be included directly in a json file.

Make the default completion message not show using ```"showCompletedPage": false```

### Scoring function

To replicate a survey, we need to include not only the questions and scales, but also the function that aggregates the survey into a particular score.

This function lives in a file with the same name as the directory and ending in `.score.js` (_e.g._ `exampleSurvey/exampleSurvey.score.js`).

The function should be called `scoreFunc` and should accept as an argument the dictionary of responses that your surveyJS survey returns. It should return a dictionary containing the aggregated result of the survey.

For example:

```js
// exampleSurvey.score.js

export default function scoreFunc(responses) {
    const minScore = 0;
    const maxScore = 10;

    const rawScore = parseInt(responses["nps_score"]);

    const result = {
        rawScore: rawScore,
        normScore: (rawScore - minScore) / (maxScore - minScore),
      };
    return result;
}
```

This result will be included in a dictionary with the raw responses, for example:

```js
record = {
  responses: {
    "nps_score": 1,
  },
  result: {
    rawScore: 6,
    normScore: 0.6,
  },
};
```

### Documentation

A `README.md` file should be present in the directory, indicating:

- Survey purpose
- Expected behavior
- Design rationale

Surveys should be documented with the source of the survey instrument itself, whether it be a publication from the literature or an internal survey development process. The documentation should cite other publications that have used the particular survey instrument.

For internally developed surveys, the documentation gives a summary of the purpose of the survey, how it was developed, and how it was validated. The documentation should be written in language that can be used verbatim e.g. in the supplement to a paper using the survey, to describe its use.

The survey folder should also contain a `references.bib` file containing bibtex citations for survey source materials.

### Packaging

Once these files are complete, you will need to export the survey from the library. To do so, run

```
npm run build
```

from the root of the project. These exports are handled automatically, and will return errors if they cannot be appropriately completed.

### Testing

A test file accompanies each survey to ensure that it is implemented as expected and that the score function works correctly. This file should be called `exampleSurvey/exampleSurvey.cy.jsx`.
This test file provides a [Cypress](https://docs.cypress.io/guides/overview/why-cypress) test definition that completes the form and checks that the callback function is called properly.

We strongly recommend using existing survey tests as examples in constructing your own. For example:

```js
// exampleSurvey.cy.jsx

import React from "react";
import { ExampleSurvey } from "../../src/index";
import sha from "../../surveys/exampleSurvey/sha.json";

const dummy = {
  set(response) {},
};

const loremIpsum = "lorem ipsum dolor sit amet";

describe("ExampleSurvey", () => {
  it("completes", () => {
    cy.spy(dummy, "set").as("callback");
    cy.mount(<ExampleSurvey onComplete={dummy.set} />);

    cy.get(`[data-name="nps_score"] input[value="1"]`)
      .next()
      .click({ force: true });

    cy.get(`[data-name="nps_score"] input[value="2"]`)
      .next()
      .click({ force: true });

    cy.get('[data-name="disappointed_experience"] textarea')
      .click()
      .type(loremIpsum);

    cy.screenshot("exampleSurvey/screenshot", { overwrite: true });

    cy.get("form") // submit surveyJS form
      .then(($form) => {
        cy.wrap($form.find('input[type="button"][value="Complete"]')).click();
      });

    cy.get(".sv-body").should("not.exist");

    cy.get("@callback").should("have.been.called");
    cy.get("@callback").then((spy) => {
      const spyCall = spy.getCall(-1).args[0];
      console.log(spyCall);
      expect(spyCall.result.normScore).to.eq(0.2);
      expect(spyCall.result.rawScore).to.eq(2);
      expect(spyCall.responses.disappointed_experience).to.have.string(
        loremIpsum
      );
      expect(spyCall.surveySha).to.eq(sha.survey);
      expect(spyCall.scoreSha).to.eq(sha.score);
    });
  });
});
```

To run the tests, use the command `npm run test` in the root directory of this repository. This will open the Cypress desktop interface, which you can use to test your survey as an independent component.

### Publishing

TODO: Make this automated?

The final change is to increment the version number of the package in `package.json`. For changes to an existing survey, increment the patch number (e.g. `1.1.1` becomes `1.1.2`). When a new survey is added, increment the minor version number (e.g. `1.1.1` becomes `1.2.1`). Major version numbers are reserved for changes in the structure of the library itself.

Submit your changes as a pull request to this repository. The repository will automatically run your tests, and when the PR is merged into the main branch, a new version of the package will be released on NPM for your surveying pleasure.

## Acknowledgments

This repository is modeled off of [@Watts-Lab/surveys](https://github.com/Watts-Lab/surveys/).