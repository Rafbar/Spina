module Spina
  module Admin
    module AdminHelper
      def icon_spina(name)
        content_tag(:i, nil, class: "fa fa-#{name}")
      end

      def spina_nav_li(is_active, &block)
        tag.li(capture(&block), class: is_active ? 'active' : '', 'data-spina-nav': true)
      end
    end
  end
end
