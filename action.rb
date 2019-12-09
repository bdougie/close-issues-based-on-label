require 'octokit'

repo = ENV["GITHUB_REPOSITORY"]
label = ENV["LABEL"]

client = Octokit::Client.new(:access_token => ENV["GITHUB_TOKEN"])
client.auto_paginate = true

open_issues = client.list_issues(repo, { :labels =>  label})

open_issues.each do |issue|
  client.close_issue(repo, issue.number)
  client.remove_label(repo, issue.number, label)
end
