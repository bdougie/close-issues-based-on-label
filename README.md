# Close issues based on a label
This is an Action that closes issues based on the provided label.

## Usage

To test this GitHub Action, replace the `LABEL` variable with one you want to check an close on a regular cadence.

```yml
on:
  schedule:
  - cron: 0 5 * * 3 
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
