require 'spina/engine'
require 'spina/railtie'
require 'spina/plugin'
require 'spina/theme'
require 'spina/attr_json_spina_parts_model'
require 'font-awesome-rails'

module Spina

  include ActiveSupport::Configurable

  PARTS = []
  PLUGINS = []
  THEMES = []

  config_accessor :backend_path, :disable_frontend_routes, :storage,
    :max_page_depth, :locales, :embedded_image_size, :disable_decorator_load,
    :social_links

  self.backend_path = 'admin'

  self.disable_frontend_routes = false
  self.disable_decorator_load = false

  self.storage = :file

  self.max_page_depth = 5

  self.locales = [I18n.default_locale]

  self.social_links = [:facebook, :twitter, :instagram, :youtube, :linkedin, :google_plus, :pinterest]

  # Images that are embedded in the Trix editor are resized to fit
  # You can optimize this for your website and go for a smaller (or larger) size
  # Default: 2000x2000px
  self.embedded_image_size = "2000x2000>"

end
