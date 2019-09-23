
# Labels for GitHub to read your action
LABEL "com.github.actions.name"="Close issues based on label"
LABEL "com.github.actions.description"="This is a GitHub Action that close issues based on the provided label"
# Here are all of the available icons: https://feathericons.com/
LABEL "com.github.actions.icon"="play"
# And all of the available colors: https://developer.github.com/actions/creating-github-actions/creating-a-docker-container/#label
LABEL "com.github.actions.color"="gray-dark"

FROM ruby:2.5

RUN bundle config --global frozen 1

WORKDIR /usr/src/app

COPY Gemfile Gemfile.lock ./
RUN bundle install

COPY . .

CMD ["ruby", "./run.rb"]
