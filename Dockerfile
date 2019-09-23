FROM andrius/alpine-ruby

# Labels for GitHub to read your action
LABEL "com.github.actions.name"="Close issues based on label"
LABEL "com.github.actions.description"="This is a GitHub Action that close issues based on the provided label"
# Here are all of the available icons: https://feathericons.com/
LABEL "com.github.actions.icon"="play"
# And all of the available colors: https://developer.github.com/actions/creating-github-actions/creating-a-docker-container/#label
LABEL "com.github.actions.color"="gray-dark"

ENV RUBY_PACKAGES bash curl-dev ruby-dev build-base git ruby ruby-io-console ruby-bundler ruby-json ruby-rdoc

# Update and install all of the required packages.
# At the end, remove the apk cache
RUN apk update && \
    apk upgrade && \
    apk add $RUBY_PACKAGES && \
    rm -rf /var/cache/apk/*

COPY entrypoint.sh /entrypoint.sh
COPY action.rb /action.rb

RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
