---
name: Create Survey
about: Checklist for creating a new survey in this reposiroty
title: "[Add] My New Survey"
labels: Survey
assignees: ""
---

Add a new survey to the repository according to the instructions in [the package README.md](https://github.com/comanlab/surveys#readme).

# Survey Title

"My New Survey" <- Replace it with the name of the actual survey, then remove.

## Survey Source

## Survey Overview

## Aggregation/scoring function

# Tasks

- [ ] Create a new folder in surveys w/ descriptive, easy-to-read name `myNewSurvey/`
- [ ] Create SurveyJS .json file (_e.g._ `myNewSurvey/myNewSurvey.json`)
  - [ ] Change the default completion page to a blank page (`"showCompletedPage": false`)
- [ ] Create a .bib file citing your references for the survey (_always:_ `myNewSurvey/references.bib`)
- [ ] Create file with function to aggregate survey data (_e.g._ `myNewSurvey.score.js`)
- [ ] Create a cypress test of the survey (e.g. `myNewSurvey.cy.jsx`)
  - [ ] Include a line to take a screenshot at the end of every page
- [ ] Create a readme markdown file to document (_always:_ `myNewSurvey/README.md`)
  - [ ] Include relevant screenshots
- [ ] Update the package minor version
- [ ] Rebuild the package using `npm run build` to update SHAs
- [ ] Create PR and link to this issue