# Close issues based on a label
This is a GitHub Action that close issues based on the provided label.

## Usage

To test this GitHub Action, replaces the `LABEL` ENV with one you want to close.

```yml
on:
  schedule:
  - cron: 45 * * * 1
name: Weekly Issue Closure
jobs:
  cycle-weekly-close:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@master
    - name: weekly-issue-closure
      uses: bdougie/close-issues-based-on-label@master
      env:
        LABEL: bug
        GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```
