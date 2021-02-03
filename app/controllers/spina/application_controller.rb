module Spina
  class ApplicationController < ActionController::Base

    protect_from_forgery with: :exception

    helper_method :current_theme, :current_spina_user, :current_account

    private

    def current_theme
      @current_theme ||= ::Spina::Theme.find_by_name(current_account.theme)
    end

    if Spina.config.current_user_method
      def current_spina_user
        send(Spina.config.current_user_method)
      end
    else
      def current_spina_user
        return @current_spina_user if defined?(@current_spina_user)

        @current_spina_user = Spina::User.find_by(id: session[:user_id]) if session[:user_id]
      end
    end

    def current_account
      @current_account ||= ::Spina::Account.first
    end
  end
end
