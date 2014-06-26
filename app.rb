# Require the environment
require "bundler/setup"
require "sinatra"
require "haml"
require "sass"
require "compass"
require "kramdown"
require "sinatra/activerecord"
require "cgi"

# Connect to the DB
set :database_file, "config/database.yml"

# Require all models
Dir.glob('./{models}/*.rb').each {|file| require file}

before do
  ActiveRecord::Base.connection.verify!(3600)
end

after do
  ActiveRecord::Base.connection.close
end

# Configure App
configure do
  Compass.configuration do |config|
    config.project_path = File.dirname(__FILE__)
    config.sass_dir = "views"
  end

  set :haml, { :format => :html5 }
  set :sass, Compass.sass_engine_options
  set :scss, Compass.sass_engine_options
end

#Routes
get "/screen.css" do
  sass "sass/screen".to_sym
end

get "/" do
  @current_locale = (Entry::VALID_LOCALES.include?(params[:locale].try(:upcase)) ? params[:locale] : "EN").upcase
  @entry = Entry.where(locale: @current_locale).first || Entry.new(locale: @current_locale)
  @page_title = "Manage \"#{@current_locale}\""
  haml "home/index".to_sym
end

post "/save" do
  return unless params[:locale] && params[:content]
  entry = Entry.where(locale: params[:locale]).first

  if !entry
    entry = Entry.new(locale: params[:locale])
  end

  entry.content = params[:content].strip
  entry.save!
end

post "/preview" do
  @text = params[:content]
  @html = Kramdown::Document.new(@text).to_html
  haml "preview/index".to_sym, layout: false
end

get "/export.html" do
  entry = Entry.where(locale: params[:locale]).first
  return if entry.nil?

  content_type 'application/octet-stream'
  Kramdown::Document.new(entry.content).to_html
end
