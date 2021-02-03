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

  config_accessor(:advanced)                { true }

  config_accessor(:backend_path)            { 'admin' }

  config_accessor(:change_order)            { true }

  config_accessor :current_user_method, :current_user_auth_path

  config_accessor(:disable_account_edit)    { false }

  config_accessor(:disable_decorator_load)  { false }

  config_accessor(:disable_frontend_routes) { false }

  config_accessor(:edit_title)              { true }

  # Images that are embedded in the Trix editor are resized to fit
  # You can optimize this for your website and go for a smaller (or larger) size
  # Default: 2000x2000px
  config_accessor(:embedded_image_size)     { '2000x2000>' }

  config_accessor(:storage)                 { :file }

  config_accessor(:max_page_depth)          { 5 }

  config_accessor(:locales)                 { [I18n.default_locale] }

  config_accessor(:new_page)                { true }

  config_accessor(:page_seo)                { true }

  config_accessor(:position_sort)           { false }

  config_accessor(:social_links)            { [:facebook, :twitter, :instagram, :youtube, :linkedin, :google_plus, :pinterest] }
end
