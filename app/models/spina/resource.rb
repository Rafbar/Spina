module Spina
  class Resource < ApplicationRecord
    extend Mobility

    has_many :pages, dependent: :restrict_with_exception

    translates :slug, backend: :jsonb

    def pages
      case order_by
      when "title"
        super.joins(:translations).where(spina_page_translations: {locale: I18n.locale}).order("spina_page_translations.title")
      else
        super.order(created_at: :desc)
      end
    end

    def is_allowed?(action)
      locks = config['locks']
      return true if locks.blank?

      !locks.include?(action.to_s)
    end
  end
end
