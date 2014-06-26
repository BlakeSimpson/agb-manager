# AGB Manager

This project acts as a markdown preview and storage engine, with the original intent of managing "AGB's" (terms and conditions) documents over various languages.

The application allows the creating, editing and exporting of HTML documents for multiple languages. 

## Technologies

* Sinatra
* MySQL
* HAML
* SASS
* Markdown

## Setup

Use bundler to install the environment. If you do not yet have bundler, first install it.

`gem install bundler`

Then run the install.

`bundle install`

After the environment is setup, ensure the database is created.

`rake db:create`

If deploying in production mode, ensure that `config/database.yml` has a `production` environment setup. If missing use the `development` environment as a starting point.

If you would like to use any other database than MySQL, you will need to add the appropriate gem to the `Gemfile` and then run bundler again.

This is a Sinatra application so it is run as a Rack app.

In development, the server will run on `localhost:4567`

    ruby app.rb

In production, the server will run on `localhost:9292`

    rackup -D config.ru

(The `-D` option runs as a daemon)

